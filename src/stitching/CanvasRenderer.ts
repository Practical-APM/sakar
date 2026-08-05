import type { Hole, SeamPoint, Vec2 } from "@/types";
import type { HelixPoint } from "./HelixPath";

function drawSoftEllipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rx: number,
  ry: number,
  color: string,
) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function gapAt(
  profile: { y: number; gap: number }[],
  y: number,
  fallback: number,
) {
  if (!profile.length) return fallback;
  let best = profile[0];
  let bestD = Math.abs(profile[0].y - y);
  for (const p of profile) {
    const d = Math.abs(p.y - y);
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  return best.gap;
}

/** Black void between cloth halves — width follows local stitch tension */
export function drawClothSplit(
  ctx: CanvasRenderingContext2D,
  seam: SeamPoint[],
  avgGap: number,
  height: number,
  gapProfile: { y: number; gap: number }[] = [],
) {
  if (seam.length < 2) return;

  ctx.save();
  ctx.beginPath();
  // Left edge of void
  const half0 = gapAt(gapProfile, seam[0].y, avgGap) / 2;
  ctx.moveTo(seam[0].x - half0, 0);
  ctx.lineTo(seam[0].x - half0, seam[0].y);
  for (let i = 1; i < seam.length; i++) {
    const h = gapAt(gapProfile, seam[i].y, avgGap) / 2;
    ctx.lineTo(seam[i].x - h, seam[i].y);
  }
  const last = seam[seam.length - 1];
  const halfLast = gapAt(gapProfile, last.y, avgGap) / 2;
  ctx.lineTo(last.x - halfLast, height);
  ctx.lineTo(last.x + halfLast, height);
  for (let i = seam.length - 1; i >= 0; i--) {
    const h = gapAt(gapProfile, seam[i].y, avgGap) / 2;
    ctx.lineTo(seam[i].x + h, seam[i].y);
  }
  ctx.lineTo(seam[0].x + half0, 0);
  ctx.closePath();
  ctx.fillStyle = "#050403";
  ctx.fill();

  // Fold lips
  for (const side of [-1, 1] as const) {
    ctx.beginPath();
    ctx.moveTo(seam[0].x + side * half0, seam[0].y);
    for (let i = 1; i < seam.length; i++) {
      const h = gapAt(gapProfile, seam[i].y, avgGap) / 2;
      ctx.lineTo(seam[i].x + side * h, seam[i].y);
    }
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 14;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(seam[0].x + side * (half0 + 1.5), seam[0].y);
    for (let i = 1; i < seam.length; i++) {
      const h = gapAt(gapProfile, seam[i].y, avgGap) / 2;
      ctx.lineTo(seam[i].x + side * (h + 1.5), seam[i].y);
    }
    ctx.strokeStyle = "rgba(255,250,240,0.18)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Tension creases
  for (let k = 0; k < 8; k++) {
    const idx = Math.floor((seam.length * (k + 1)) / 10);
    const p = seam[idx];
    if (!p) continue;
    const prev = seam[Math.max(0, idx - 1)];
    const next = seam[Math.min(seam.length - 1, idx + 1)];
    let tx = next.x - prev.x;
    let ty = next.y - prev.y;
    const mag = Math.hypot(tx, ty) || 1;
    tx /= mag;
    ty /= mag;
    const nx = -ty;
    const side = k % 2 === 0 ? -1 : 1;
    const h = gapAt(gapProfile, p.y, avgGap) / 2;
    const len = 36 + (k % 3) * 24;
    ctx.beginPath();
    ctx.moveTo(p.x + nx * side * (h + 3), p.y);
    ctx.quadraticCurveTo(
      p.x + nx * side * (h + len * 0.4) + tx * 10,
      p.y + ty * 16,
      p.x + nx * side * (h + len),
      p.y + ty * (6 + k * 2),
    );
    ctx.strokeStyle = `rgba(35, 26, 14, ${0.05 + (k % 3) * 0.02})`;
    ctx.lineWidth = 9;
    ctx.stroke();
  }

  ctx.restore();
}

/** Photoreal brass rivet / eyelet */
export function drawGrommet(
  ctx: CanvasRenderingContext2D,
  hole: Hole,
  squeeze = 1,
) {
  const { x, y } = hole.position;
  const R = hole.radius * squeeze;

  ctx.save();

  // Contact shadow into void/cloth
  drawSoftEllipse(ctx, x + 1.5, y + 3, R * 1.5, R * 0.55, "rgba(0,0,0,0.55)");

  // Outer flange — brushed metal rings
  const flange = ctx.createRadialGradient(
    x - R * 0.4,
    y - R * 0.45,
    R * 0.05,
    x,
    y,
    R + 3,
  );
  flange.addColorStop(0, "#F2E2A8");
  flange.addColorStop(0.18, "#D4B24A");
  flange.addColorStop(0.42, "#A88820");
  flange.addColorStop(0.7, "#6E5610");
  flange.addColorStop(1, "#2E2408");

  ctx.beginPath();
  ctx.ellipse(x, y + 0.4, R + 2.4, R + 1.9, 0, 0, Math.PI * 2);
  ctx.fillStyle = flange;
  ctx.fill();

  // Machined ring groove
  ctx.beginPath();
  ctx.arc(x, y, R + 0.3, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(20, 14, 4, 0.55)";
  ctx.lineWidth = 2.2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, R - 0.2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 230, 160, 0.25)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Barrel wall (cylinder into cloth)
  const barrel = ctx.createRadialGradient(x, y, R * 0.35, x, y, R - 1.5);
  barrel.addColorStop(0, "#1a150c");
  barrel.addColorStop(0.55, "#3d3420");
  barrel.addColorStop(1, "#8a7428");
  ctx.beginPath();
  ctx.arc(x, y, Math.max(2.5, R - 1.6), 0, Math.PI * 2);
  ctx.fillStyle = barrel;
  ctx.fill();

  // True hole — black void showing through
  ctx.beginPath();
  ctx.arc(x, y, Math.max(1.8, R - 3.6), 0, Math.PI * 2);
  ctx.fillStyle = "#030201";
  ctx.fill();

  // Tiny anisotropic glint (brushed, not cartoon)
  ctx.beginPath();
  ctx.ellipse(
    x - R * 0.4,
    y - R * 0.42,
    R * 0.35,
    R * 0.1,
    -0.6,
    0,
    Math.PI * 2,
  );
  ctx.fillStyle = "rgba(255, 245, 210, 0.35)";
  ctx.fill();

  ctx.restore();
}

const JUTE = {
  deepest: "#241808",
  dark: "#4A3514",
  mid: "#7A5C22",
  fiber: "#9A7830",
  pale: "#B89A58",
};

/** Draw one visible helix run as matte jute */
export function drawJuteRun(
  ctx: CanvasRenderingContext2D,
  points: HelixPoint[],
  width: number,
  slack = 0,
) {
  if (points.length < 2) return;

  const segs = points.map((p, i) => {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    let tx = next.x - prev.x;
    let ty = next.y - prev.y;
    const mag = Math.hypot(tx, ty) || 1;
    tx /= mag;
    ty /= mag;
    const nx = -ty;
    const ny = tx;
    const wobble = Math.sin(i * 0.4 + slack * 5) * slack * 2;
    // Foreshortening: front (depth>0) slightly thicker
    const scale = 0.82 + 0.22 * Math.max(0, p.depth);
    return {
      x: p.x + nx * wobble,
      y: p.y + ny * wobble,
      nx,
      ny,
      s: p.s,
      w: width * scale,
    };
  });

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(segs[0].x + 2, segs[0].y + 3);
  for (let i = 1; i < segs.length; i++) {
    ctx.lineTo(segs[i].x + 2, segs[i].y + 3);
  }
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth = width + 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(segs[0].x, segs[0].y);
  for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
  ctx.strokeStyle = JUTE.dark;
  ctx.lineWidth = width;
  ctx.stroke();

  const colors = [JUTE.fiber, JUTE.mid, JUTE.deepest];
  const twist = 0.2;
  for (let strand = 0; strand < 3; strand++) {
    const phase0 = (strand * Math.PI * 2) / 3;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < segs.length; i++) {
      const g = segs[i];
      const phase = g.s * twist + phase0;
      const amp = g.w * 0.32;
      const ox = g.x + g.nx * Math.cos(phase) * amp;
      const oy = g.y + g.ny * Math.cos(phase) * amp;
      if (!started) {
        ctx.moveTo(ox, oy);
        started = true;
      } else ctx.lineTo(ox, oy);
    }
    ctx.strokeStyle = colors[strand];
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = width * 0.3;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const step = Math.max(3, Math.floor(segs.length / 50));
  for (let i = 0; i < segs.length; i += step) {
    const g = segs[i];
    const phase = g.s * twist;
    const amp = g.w * 0.3;
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = (i * 5) % 2 === 0 ? JUTE.pale : JUTE.deepest;
    ctx.beginPath();
    ctx.arc(
      g.x + g.nx * Math.cos(phase) * amp,
      g.y + g.ny * Math.cos(phase) * amp,
      width * 0.06,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

export function drawJuteRope(
  ctx: CanvasRenderingContext2D,
  runs: HelixPoint[][],
  width: number,
  slack = 0,
) {
  for (const run of runs) {
    if (run.length >= 2) drawJuteRun(ctx, run, width, slack);
  }
}

export function drawLooseTip(
  ctx: CanvasRenderingContext2D,
  tip: Vec2,
  width: number,
  tangent?: Vec2,
) {
  ctx.save();
  drawSoftEllipse(ctx, tip.x + 1.5, tip.y + 2.5, width, width * 0.5, "rgba(0,0,0,0.45)");
  const tx = tangent?.x ?? 0;
  const ty = tangent?.y ?? 1;
  const nx = -ty;
  const ny = tx;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(tip.x + nx * i * 1.1, tip.y + ny * i * 1.1);
    ctx.lineTo(
      tip.x + tx * width * 1.15 + nx * i * 2.5,
      tip.y + ty * width * 1.15 + ny * i * 2.5,
    );
    ctx.strokeStyle = i % 2 === 0 ? JUTE.fiber : JUTE.dark;
    ctx.lineWidth = 1.2;
    ctx.lineCap = "round";
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(tip.x, tip.y, width * 0.45, 0, Math.PI * 2);
  ctx.fillStyle = JUTE.mid;
  ctx.fill();
  ctx.restore();
}

export const drawCord = drawJuteRope;
