/** Mulberry32 seeded PRNG */
export function createRng(seed: number) {
  let t = seed >>> 0;
  return function next() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

export function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(bx - ax, by - ay);
}

/** Catmull-Rom to cubic Bezier sampling */
export function sampleCatmullRom(
  points: { x: number; y: number }[],
  samplesPerSegment = 16,
): { x: number; y: number }[] {
  if (points.length < 2) return [...points];
  const result: { x: number; y: number }[] = [];
  const pts = [
    points[0],
    ...points,
    points[points.length - 1],
  ];

  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2];
    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
      result.push({ x, y });
    }
  }
  result.push(points[points.length - 1]);
  return result;
}

export function pathLength(points: { x: number; y: number }[]) {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    len += dist(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
  }
  return len;
}

export function pointAtArcLength(
  points: { x: number; y: number }[],
  targetLen: number,
): { x: number; y: number; tangent: { x: number; y: number }; traveled: number } {
  if (points.length === 0) {
    return { x: 0, y: 0, tangent: { x: 0, y: 1 }, traveled: 0 };
  }
  if (targetLen <= 0) {
    const dx = points[1]?.x - points[0].x || 0;
    const dy = points[1]?.y - points[0].y || 1;
    const mag = Math.hypot(dx, dy) || 1;
    return {
      x: points[0].x,
      y: points[0].y,
      tangent: { x: dx / mag, y: dy / mag },
      traveled: 0,
    };
  }

  let traveled = 0;
  for (let i = 1; i < points.length; i++) {
    const seg = dist(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
    if (traveled + seg >= targetLen) {
      const t = seg === 0 ? 0 : (targetLen - traveled) / seg;
      const x = lerp(points[i - 1].x, points[i].x, t);
      const y = lerp(points[i - 1].y, points[i].y, t);
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      const mag = Math.hypot(dx, dy) || 1;
      return { x, y, tangent: { x: dx / mag, y: dy / mag }, traveled: targetLen };
    }
    traveled += seg;
  }
  const last = points[points.length - 1];
  const prev = points[points.length - 2] ?? last;
  const dx = last.x - prev.x;
  const dy = last.y - prev.y;
  const mag = Math.hypot(dx, dy) || 1;
  return {
    x: last.x,
    y: last.y,
    tangent: { x: dx / mag, y: dy / mag },
    traveled,
  };
}

export function pointsToSvgPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)}`;
  }
  return d;
}
