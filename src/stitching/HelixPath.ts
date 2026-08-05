import type { Hole, SeamPoint, Vec2 } from "@/types";
import { seamXAtY } from "./SeamGenerator";
import { dist, lerp } from "./math";

export interface HelixPoint extends Vec2 {
  /** Behind cloth — do not draw */
  occluded: boolean;
  /** -1 behind … +1 in front — for foreshortening */
  depth: number;
  s: number;
}

export interface HelixBuild {
  points: HelixPoint[];
  cumulativeLengths: number[];
  totalLength: number;
  holeArcLengths: number[];
  holes: Hole[];
  pairs: { y: number; leftIndex: number; rightIndex: number }[];
}

/**
 * True helix around the seam axis:
 *   P(s) = C(s) + N(s) * R * cos(θ)
 *   depth = sin(θ)  → occluded when behind cloth
 *
 * Grommets sit at lateral extremes (cos ≈ ±1).
 * This is NOT shoelace X-lacing.
 */
export function buildHelixStitch(options: {
  seam: SeamPoint[];
  height: number;
  radius: number;
  pitch: number;
  holeRadius: number;
  openOffset: number;
}): HelixBuild {
  const { seam, height, radius, pitch, holeRadius, openOffset } = options;
  if (seam.length < 2) {
    return {
      points: [],
      cumulativeLengths: [0],
      totalLength: 0,
      holeArcLengths: [],
      holes: [],
      pairs: [],
    };
  }

  const points: HelixPoint[] = [];
  const sampleStep = 4; // px along page Y
  let s = 0;

  for (let y = 0; y <= height; y += sampleStep) {
    const cx = seamXAtY(seam, y);
    // Approximate tangent from nearby samples
    const y1 = Math.max(0, y - 6);
    const y2 = Math.min(height, y + 6);
    const dx = seamXAtY(seam, y2) - seamXAtY(seam, y1);
    const dy = y2 - y1;
    const mag = Math.hypot(dx, dy) || 1;
    const tx = dx / mag;
    const ty = dy / mag;
    // Screen-plane normal (perpendicular to tangent)
    const nx = -ty;
    const ny = tx;

    const theta = (2 * Math.PI * s) / pitch;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const lateral = radius * cos;

    points.push({
      x: cx + nx * lateral,
      y: y + ny * lateral * 0.15, // slight follow of normal
      occluded: sin < -0.12,
      depth: sin,
      s,
    });

    s += sampleStep;
  }

  // Place hole pairs at θ ≈ 0 (right) and θ ≈ π (left) each half-turn
  const pairs: { y: number; leftIndex: number; rightIndex: number }[] = [];
  const holes: Hole[] = [];
  let holeIndex = 0;
  const halfTurn = pitch / 2;

  for (let turn = 0.35; turn * halfTurn < height - 40; turn += 1) {
    const sRight = turn * halfTurn;
    const sLeft = turn * halfTurn + halfTurn / 2;

    const yR = sRight;
    const yL = sLeft;
    if (yR > height - 30 || yL > height - 30) break;

    const cxR = seamXAtY(seam, yR);
    const cxL = seamXAtY(seam, yL);

    const right: Hole = {
      index: holeIndex++,
      side: "right",
      position: { x: cxR + openOffset, y: yR },
      radius: holeRadius,
    };
    const left: Hole = {
      index: holeIndex++,
      side: "left",
      position: { x: cxL - openOffset, y: yL },
      radius: holeRadius,
    };

    let leftIndex: number;
    let rightIndex: number;
    if (Math.floor(turn) % 2 === 0) {
      rightIndex = holes.length;
      holes.push(right);
      leftIndex = holes.length;
      holes.push(left);
    } else {
      leftIndex = holes.length;
      holes.push(left);
      rightIndex = holes.length;
      holes.push(right);
    }
    pairs.push({ y: (yR + yL) / 2, leftIndex, rightIndex });
  }

  // Snap helix samples near each hole so tip clearly enters the rivet
  for (const hole of holes) {
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < points.length; i++) {
      const d = dist(points[i].x, points[i].y, hole.position.x, hole.position.y);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    if (bestD < radius * 1.8) {
      points[best] = {
        ...points[best],
        x: hole.position.x,
        y: hole.position.y,
        occluded: false,
        depth: 0.85,
      };
    }
  }

  const cumulativeLengths: number[] = [0];
  let totalLength = 0;
  for (let i = 1; i < points.length; i++) {
    totalLength += dist(
      points[i - 1].x,
      points[i - 1].y,
      points[i].x,
      points[i].y,
    );
    cumulativeLengths.push(totalLength);
  }

  const holeArcLengths = holes.map((hole) => {
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < points.length; i++) {
      const d = dist(points[i].x, points[i].y, hole.position.x, hole.position.y);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    return cumulativeLengths[best] ?? 0;
  });

  return {
    points,
    cumulativeLengths,
    totalLength,
    holeArcLengths,
    holes,
    pairs,
  };
}

export function sliceHelixByLength(
  points: HelixPoint[],
  cumulativeLengths: number[],
  arcLength: number,
): HelixPoint[] {
  if (points.length === 0 || arcLength <= 0) return [];
  if (arcLength >= cumulativeLengths[cumulativeLengths.length - 1]) {
    return [...points];
  }

  const result: HelixPoint[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    if (cumulativeLengths[i] <= arcLength) {
      result.push(points[i]);
    } else {
      const prevLen = cumulativeLengths[i - 1];
      const segLen = cumulativeLengths[i] - prevLen;
      const t = segLen === 0 ? 0 : (arcLength - prevLen) / segLen;
      result.push({
        x: lerp(points[i - 1].x, points[i].x, t),
        y: lerp(points[i - 1].y, points[i].y, t),
        occluded: points[i].occluded && points[i - 1].occluded,
        depth: lerp(points[i - 1].depth, points[i].depth, t),
        s: lerp(points[i - 1].s, points[i].s, t),
      });
      break;
    }
  }
  return result;
}

/** Split into visible front runs for drawing (rear omitted). */
export function visibleRuns(points: HelixPoint[]): HelixPoint[][] {
  const runs: HelixPoint[][] = [];
  let current: HelixPoint[] = [];
  for (const p of points) {
    if (!p.occluded) {
      current.push(p);
    } else if (current.length) {
      runs.push(current);
      current = [];
    }
  }
  if (current.length) runs.push(current);
  return runs;
}

export type PairTightness = {
  y: number;
  t: number;
  open: number;
  closed: number;
  leftIndex: number;
  rightIndex: number;
};

/**
 * After a pair's second hole is passed, tension pulls rivets inward.
 */
export function computePairTightness(
  pairs: { y: number; leftIndex: number; rightIndex: number }[],
  holeArcLengths: number[],
  arcLength: number,
  openOffset: number,
  closedOffset: number,
): PairTightness[] {
  return pairs.map((pair) => {
    const lenL = holeArcLengths[pair.leftIndex] ?? Infinity;
    const lenR = holeArcLengths[pair.rightIndex] ?? Infinity;
    const both = Math.max(lenL, lenR);
    const t =
      arcLength < both ? 0 : Math.min(1, (arcLength - both) / 90);
    return {
      y: pair.y,
      t,
      open: openOffset,
      closed: closedOffset,
      leftIndex: pair.leftIndex,
      rightIndex: pair.rightIndex,
    };
  });
}

export function offsetForY(
  tightness: PairTightness[],
  y: number,
  openOffset: number,
): number {
  if (!tightness.length) return openOffset;
  // Influence from nearest pairs
  let wSum = 0;
  let oSum = 0;
  for (const p of tightness) {
    const d = Math.abs(p.y - y);
    const w = Math.max(0, 1 - d / 140);
    if (w <= 0) continue;
    const off = lerp(p.open, p.closed, p.t);
    wSum += w;
    oSum += off * w;
  }
  if (wSum < 1e-6) return openOffset;
  return oSum / wSum;
}
