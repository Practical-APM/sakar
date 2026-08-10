import type { Hole, SeamPoint, Vec2 } from "@/types";
import { seamXAtY } from "./SeamGenerator";
import { dist, lerp } from "./math";

export interface HelixPoint extends Vec2 {
  occluded: boolean;
  depth: number;
  s: number;
}

export type PairDef = {
  y: number;
  leftIndex: number;
  rightIndex: number;
};

export type PairTightness = {
  y: number;
  t: number;
  open: number;
  closed: number;
  leftIndex: number;
  rightIndex: number;
};

export function generatePairs(
  seam: SeamPoint[],
  height: number,
  spacing: number,
  holeRadius: number,
): { holes: Hole[]; pairs: PairDef[] } {
  const holes: Hole[] = [];
  const pairs: PairDef[] = [];
  let index = 0;

  for (let y = spacing * 1.1; y < height - spacing; y += spacing) {
    const sx = seamXAtY(seam, y);
    const leftIndex = holes.length;
    holes.push({
      index: index++,
      side: "left",
      position: { x: sx, y },
      radius: holeRadius,
    });
    const rightIndex = holes.length;
    holes.push({
      index: index++,
      side: "right",
      position: { x: sx, y },
      radius: holeRadius,
    });
    pairs.push({ y, leftIndex, rightIndex });
  }

  return { holes, pairs };
}

export function placeHoles(
  baseHoles: Hole[],
  seam: SeamPoint[],
  tightness: PairTightness[],
  openOffset: number,
): Hole[] {
  return baseHoles.map((h) => {
    const off = offsetForY(tightness, h.position.y, openOffset);
    const sx = seamXAtY(seam, h.position.y);
    return {
      ...h,
      position: {
        x: h.side === "left" ? sx - off : sx + off,
        y: h.position.y,
      },
    };
  });
}

export function offsetForY(
  tightness: PairTightness[],
  y: number,
  openOffset: number,
): number {
  if (!tightness.length) return openOffset;
  let wSum = 0;
  let oSum = 0;
  for (const p of tightness) {
    const d = Math.abs(p.y - y);
    const w = Math.max(0, 1 - d / 100);
    if (w <= 0) continue;
    const off = lerp(p.open, p.closed, p.t);
    wSum += w;
    oSum += off * w;
  }
  if (wSum < 1e-6) return openOffset;
  return oSum / wSum;
}

export function computePairTightness(
  pairs: PairDef[],
  holeArcLengths: number[],
  arcLength: number,
  openOffset: number,
  closedOffset: number,
): PairTightness[] {
  return pairs.map((pair) => {
    const lenA = holeArcLengths[pair.leftIndex] ?? Infinity;
    const lenB = holeArcLengths[pair.rightIndex] ?? Infinity;
    const first = Math.min(lenA, lenB);
    const both = Math.max(lenA, lenB);
    // Pull starts the instant the first rivet of the pair is laced,
    // finishes quickly after the second — tracks the tip, no lag
    let t = 0;
    if (arcLength >= both) {
      t = Math.min(1, 0.55 + (arcLength - both) / 28);
    } else if (arcLength > first) {
      t = ((arcLength - first) / Math.max(1, both - first)) * 0.55;
    }
    t = Math.min(1, Math.max(0, t));
    // Smoothstep for organic cinch
    const s = t * t * (3 - 2 * t);
    return {
      y: pair.y,
      t: s,
      open: openOffset,
      closed: closedOffset,
      leftIndex: pair.leftIndex,
      rightIndex: pair.rightIndex,
    };
  });
}

/**
 * Ultra-real lace path:
 * - Catenary sag across each pair (tighter = flatter)
 * - Cord dives into each eyelet (foreshortened entry)
 * - Alternate bridge bias for hand-laced X feel
 * - Rear wrap occluded between pairs
 */
export function buildPathThroughHoles(
  holes: Hole[],
  seam: SeamPoint[],
): {
  points: HelixPoint[];
  cumulativeLengths: number[];
  totalLength: number;
  holeArcLengths: number[];
} {
  const points: HelixPoint[] = [];
  const holeArcLengths: number[] = new Array(holes.length).fill(0);
  let s = 0;

  const push = (x: number, y: number, occluded: boolean, depth: number) => {
    if (points.length) {
      const last = points[points.length - 1];
      s += dist(last.x, last.y, x, y);
    }
    points.push({ x, y, occluded, depth, s });
  };

  if (!holes.length) {
    return { points, cumulativeLengths: [0], totalLength: 0, holeArcLengths };
  }

  const first = holes[0];
  // Loose tip hanging above first eyelet
  push(first.position.x - 8, Math.max(0, first.position.y - 52), false, 0.85);
  push(first.position.x - 4, first.position.y - 28, false, 0.9);

  for (let p = 0; p < holes.length; p += 2) {
    const left = holes[p];
    const right = holes[p + 1];
    if (!left || !right) break;

    const pairIndex = p / 2;
    const span = Math.abs(right.position.x - left.position.x);
    // Wider open gap → more sag; closed pairs nearly taut
    const openRef = 68;
    const taut = 1 - Math.min(1, Math.max(0, (span - 28) / openRef));
    const sag = lerp(11, 1.8, taut * taut);
    const xBias = (pairIndex % 2 === 0 ? 1 : -1) * lerp(3.5, 0.5, taut);

    // Approach left eyelet with a soft arc, then dive in
    {
      const from = points[points.length - 1];
      const steps = 9;
      for (let k = 1; k <= steps; k++) {
        const t = k / steps;
        const ease = t * t * (3 - 2 * t);
        // Dive: last 30% pull strongly toward hole center
        const dive = t > 0.7 ? (t - 0.7) / 0.3 : 0;
        const bow = Math.sin(t * Math.PI) * -4 * (1 - dive);
        const px = lerp(from.x, left.position.x, ease) + bow;
        const py = lerp(from.y, left.position.y, ease);
        push(px, py, false, 0.35 + Math.sin(t * Math.PI) * 0.55);
      }
    }
    push(left.position.x, left.position.y, false, 1);
    holeArcLengths[p] = s;

    // Visible front bridge — catenary + slight X bias
    {
      const steps = 16;
      for (let k = 1; k <= steps; k++) {
        const t = k / steps;
        const ease = t * t * (3 - 2 * t);
        // Parabolic catenary approx
        const cat = 4 * t * (1 - t);
        const mx = lerp(left.position.x, right.position.x, ease) + xBias * Math.sin(t * Math.PI);
        const my =
          lerp(left.position.y, right.position.y, ease) + sag * cat;
        // Depth peaks mid-span (toward camera)
        const depth = 0.35 + cat * 0.65;
        push(mx, my, false, depth);
      }
    }
    push(right.position.x, right.position.y, false, 1);
    holeArcLengths[p + 1] = s;

    const nextLeft = holes[p + 2];
    if (nextLeft) {
      // REAR helix wrap — visible behind (depth < 0), bows through the void
      const steps = 14;
      for (let k = 1; k <= steps; k++) {
        const t = k / steps;
        const ease = t * t * (3 - 2 * t);
        const my = lerp(right.position.y, nextLeft.position.y, ease);
        const midSeam = seamXAtY(seam, my);
        const mx = lerp(right.position.x, nextLeft.position.x, ease);
        // Helical rear: swing past seam center then toward next left
        const helix = Math.sin(t * Math.PI);
        const lateral = Math.sin(t * Math.PI * 2) * 5;
        const px = lerp(mx, midSeam, 0.85 * helix) + lateral * 0.35;
        // Slight S-curve in depth so wrap reads as 3D
        push(px, my, true, -0.35 - helix * 0.65);
      }
    } else {
      // Frayed tip dangling from last eyelet
      for (let k = 1; k <= 8; k++) {
        const t = k / 8;
        const sway = Math.sin(t * Math.PI) * 3;
        push(
          right.position.x + 6 * t + sway,
          right.position.y + 28 * t + t * t * 12,
          false,
          0.5,
        );
      }
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

  return { points, cumulativeLengths, totalLength, holeArcLengths };
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
        occluded: points[i - 1].occluded || points[i].occluded,
        depth: lerp(points[i - 1].depth, points[i].depth, t),
        s: lerp(points[i - 1].s, points[i].s, t),
      });
      break;
    }
  }
  return result;
}

export function visibleRuns(points: HelixPoint[]): HelixPoint[][] {
  return splitHelixRuns(points).front;
}

/** Split sliced helix into front (camera) and back (through void) runs */
export function splitHelixRuns(points: HelixPoint[]): {
  front: HelixPoint[][];
  back: HelixPoint[][];
} {
  const front: HelixPoint[][] = [];
  const back: HelixPoint[][] = [];
  let current: HelixPoint[] = [];
  let mode: "front" | "back" | null = null;

  const flush = () => {
    if (current.length < 2) {
      current = [];
      return;
    }
    if (mode === "back") back.push(current);
    else front.push(current);
    current = [];
  };

  for (const p of points) {
    const nextMode = p.occluded ? "back" : "front";
    if (mode && nextMode !== mode) flush();
    mode = nextMode;
    current.push(p);
  }
  flush();
  return { front, back };
}
