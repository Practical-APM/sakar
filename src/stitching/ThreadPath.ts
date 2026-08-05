import type { Hole, Vec2 } from "@/types";
import { dist, lerp } from "./math";

export interface ThreadSegment {
  points: Vec2[];
  /** true when thread is behind cloth (should not render) */
  occluded: boolean;
  holeIndex: number;
}

/**
 * Build a continuous weave path through ordered holes.
 * Between holes: visible arc on the "front".
 * Through a hole: short occluded segment (hidden behind cloth).
 */
export function buildThreadPath(holes: Hole[], start: Vec2): {
  fullPath: Vec2[];
  segments: ThreadSegment[];
  cumulativeLengths: number[];
  holeArcLengths: number[];
  totalLength: number;
} {
  const segments: ThreadSegment[] = [];
  const fullPath: Vec2[] = [];
  const cumulativeLengths: number[] = [0];
  const holeArcLengths: number[] = [];
  let totalLength = 0;

  let cursor = { ...start };

  const pushVisible = (from: Vec2, to: Vec2, holeIndex: number) => {
    const mid: Vec2 = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2,
    };
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const mag = Math.hypot(dx, dy) || 1;
    const nx = -dy / mag;
    const ny = dx / mag;
    const bow = Math.min(42, mag * 0.28);
    const control: Vec2 = {
      x: mid.x + nx * bow,
      y: mid.y + ny * bow * 0.35,
    };

    const pts: Vec2[] = [];
    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const ax = lerp(from.x, control.x, t);
      const ay = lerp(from.y, control.y, t);
      const bx = lerp(control.x, to.x, t);
      const by = lerp(control.y, to.y, t);
      pts.push({ x: lerp(ax, bx, t), y: lerp(ay, by, t) });
    }

    segments.push({ points: pts, occluded: false, holeIndex });
    for (let i = 0; i < pts.length; i++) {
      if (fullPath.length > 0) {
        const prev = fullPath[fullPath.length - 1];
        totalLength += dist(prev.x, prev.y, pts[i].x, pts[i].y);
        cumulativeLengths.push(totalLength);
      }
      fullPath.push(pts[i]);
    }
  };

  const pushOccluded = (at: Vec2, holeIndex: number) => {
    const pts = [
      { x: at.x, y: at.y - 0.5 },
      { x: at.x, y: at.y + 0.5 },
    ];
    segments.push({ points: pts, occluded: true, holeIndex });
    for (const p of pts) {
      if (fullPath.length > 0) {
        const prev = fullPath[fullPath.length - 1];
        totalLength += dist(prev.x, prev.y, p.x, p.y);
        cumulativeLengths.push(totalLength);
      }
      fullPath.push(p);
    }
  };

  holes.forEach((hole, i) => {
    pushVisible(cursor, hole.position, i);
    holeArcLengths.push(totalLength);
    pushOccluded(hole.position, i);
    cursor = { ...hole.position };
  });

  return { fullPath, segments, cumulativeLengths, holeArcLengths, totalLength };
}

export function slicePathByLength(
  fullPath: Vec2[],
  cumulativeLengths: number[],
  arcLength: number,
): Vec2[] {
  if (fullPath.length === 0 || arcLength <= 0) return [];
  if (arcLength >= cumulativeLengths[cumulativeLengths.length - 1]) {
    return [...fullPath];
  }

  const result: Vec2[] = [fullPath[0]];
  for (let i = 1; i < fullPath.length; i++) {
    if (cumulativeLengths[i] <= arcLength) {
      result.push(fullPath[i]);
    } else {
      const prevLen = cumulativeLengths[i - 1];
      const segLen = cumulativeLengths[i] - prevLen;
      const t = segLen === 0 ? 0 : (arcLength - prevLen) / segLen;
      result.push({
        x: lerp(fullPath[i - 1].x, fullPath[i].x, t),
        y: lerp(fullPath[i - 1].y, fullPath[i].y, t),
      });
      break;
    }
  }
  return result;
}
