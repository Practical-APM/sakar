import type { Hole, SeamPoint, Vec2 } from "@/types";

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

/** Soft recessed crease only — never a solid dark “wire”. */
export function drawSeamCrease(
  ctx: CanvasRenderingContext2D,
  seam: SeamPoint[],
  gap: number,
) {
  if (seam.length < 2) return;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(seam[0].x, seam[0].y);
  for (let i = 1; i < seam.length; i++) ctx.lineTo(seam[i].x, seam[i].y);
  ctx.strokeStyle = "rgba(60, 45, 25, 0.12)";
  ctx.lineWidth = Math.max(6, gap * 1.1);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(seam[0].x - gap * 0.35, seam[0].y);
  for (let i = 1; i < seam.length; i++) {
    ctx.lineTo(seam[i].x - gap * 0.35, seam[i].y);
  }
  ctx.strokeStyle = "rgba(255, 250, 240, 0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
}

export function drawGrommet(
  ctx: CanvasRenderingContext2D,
  hole: Hole,
  squeeze = 1,
) {
  const { x, y } = hole.position;
  const R = hole.radius * squeeze;

  ctx.save();

  drawSoftEllipse(
    ctx,
    x + 1.2,
    y + 2.4,
    R * 1.35,
    R * 0.5,
    "rgba(40, 28, 10, 0.32)",
  );

  const metal = ctx.createRadialGradient(
    x - R * 0.38,
    y - R * 0.42,
    R * 0.1,
    x,
    y,
    R + 2,
  );
  metal.addColorStop(0, "#FFF3C4");
  metal.addColorStop(0.28, "#E0BF55");
  metal.addColorStop(0.55, "#B8911E");
  metal.addColorStop(0.85, "#7A5E12");
  metal.addColorStop(1, "#4A380A");

  ctx.beginPath();
  ctx.arc(x, y, R + 1.8, 0, Math.PI * 2);
  ctx.fillStyle = metal;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, R - 0.8, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(50, 38, 8, 0.55)";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  const voidG = ctx.createRadialGradient(
    x,
    y,
    0,
    x,
    y,
    Math.max(2, R - 3.2),
  );
  voidG.addColorStop(0, "#1A1710");
  voidG.addColorStop(1, "#4A4538");
  ctx.beginPath();
  ctx.arc(x, y, Math.max(2, R - 3.2), 0, Math.PI * 2);
  ctx.fillStyle = voidG;
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(
    x - R * 0.35,
    y - R * 0.38,
    R * 0.26,
    R * 0.14,
    -0.5,
    0,
    Math.PI * 2,
  );
  ctx.fillStyle = "rgba(255, 248, 220, 0.65)";
  ctx.fill();

  ctx.restore();
}

const JUTE = {
  shadow: "#3D2E12",
  dark: "#6B4E1A",
  mid: "#A67C2D",
  light: "#D4B06A",
  highlight: "#F0E0B0",
};

/**
 * Twisted jute rope — three helical fiber strands, not a smooth wire.
 */
export function drawJuteRope(
  ctx: CanvasRenderingContext2D,
  points: Vec2[],
  width: number,
  slack = 0,
) {
  if (points.length < 2) return;

  // Precompute tangents + arc lengths
  const segs: {
    x: number;
    y: number;
    tx: number;
    ty: number;
    nx: number;
    ny: number;
    s: number;
  }[] = [];
  let s = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    let tx = next.x - prev.x;
    let ty = next.y - prev.y;
    const mag = Math.hypot(tx, ty) || 1;
    tx /= mag;
    ty /= mag;
    const nx = -ty;
    const ny = tx;
    if (i > 0) s += Math.hypot(p.x - prev.x, p.y - prev.y);
    const wobble = Math.sin(i * 0.35 + slack * 6) * slack * 3;
    segs.push({
      x: p.x + nx * wobble,
      y: p.y + ny * wobble,
      tx,
      ty,
      nx,
      ny,
      s,
    });
  }

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Soft contact shadow (no blur filter — cheaper)
  ctx.beginPath();
  ctx.moveTo(segs[0].x + 1.5, segs[0].y + 2.5);
  for (let i = 1; i < segs.length; i++) {
    ctx.lineTo(segs[i].x + 1.5, segs[i].y + 2.5);
  }
  ctx.strokeStyle = "rgba(40, 28, 10, 0.28)";
  ctx.lineWidth = width + 3;
  ctx.stroke();

  // Core body
  ctx.beginPath();
  ctx.moveTo(segs[0].x, segs[0].y);
  for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
  ctx.strokeStyle = JUTE.dark;
  ctx.lineWidth = width;
  ctx.stroke();

  // Three twisted fiber strands
  const strandColors = [JUTE.mid, JUTE.light, JUTE.shadow];
  const twist = 0.22; // radians per px
  const amp = width * 0.32;

  for (let strand = 0; strand < 3; strand++) {
    const phase0 = (strand * Math.PI * 2) / 3;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < segs.length; i++) {
      const g = segs[i];
      const phase = g.s * twist + phase0;
      const r = amp * (0.85 + 0.15 * Math.sin(g.s * 0.08 + strand));
      const ox = g.x + g.nx * Math.cos(phase) * r;
      const oy = g.y + g.ny * Math.cos(phase) * r;
      if (!started) {
        ctx.moveTo(ox, oy);
        started = true;
      } else {
        ctx.lineTo(ox, oy);
      }
    }
    ctx.strokeStyle = strandColors[strand];
    ctx.lineWidth = width * 0.38;
    ctx.globalAlpha = strand === 2 ? 0.55 : 0.85;
    ctx.stroke();
  }

  // Fiber flecks along the rope (jute roughness)
  ctx.globalAlpha = 0.5;
  const step = Math.max(2, Math.floor(segs.length / 80));
  for (let i = 0; i < segs.length; i += step) {
    const g = segs[i];
    const phase = g.s * twist;
    const fleck = ((i * 13) % 7) / 7;
    const ox = g.x + g.nx * Math.cos(phase + fleck) * amp * 0.9;
    const oy = g.y + g.ny * Math.cos(phase + fleck) * amp * 0.9;
    ctx.fillStyle = fleck > 0.5 ? JUTE.highlight : JUTE.shadow;
    ctx.beginPath();
    ctx.arc(ox, oy, width * 0.08, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Specular ridge on the lit side of the twist
  ctx.beginPath();
  let lit = false;
  for (let i = 0; i < segs.length; i++) {
    const g = segs[i];
    const phase = g.s * twist;
    if (Math.cos(phase) < 0.15) continue;
    const ox = g.x + g.nx * Math.cos(phase) * amp * 0.55;
    const oy = g.y + g.ny * Math.cos(phase) * amp * 0.55;
    if (!lit) {
      ctx.moveTo(ox, oy);
      lit = true;
    } else {
      ctx.lineTo(ox, oy);
    }
  }
  ctx.strokeStyle = "rgba(255, 240, 200, 0.35)";
  ctx.lineWidth = width * 0.12;
  ctx.stroke();

  ctx.restore();
}

export function drawLooseTip(
  ctx: CanvasRenderingContext2D,
  tip: Vec2,
  width: number,
  tangent?: Vec2,
) {
  ctx.save();
  drawSoftEllipse(
    ctx,
    tip.x + 1.5,
    tip.y + 2.5,
    width * 1.1,
    width * 0.55,
    "rgba(30, 20, 8, 0.35)",
  );

  // Frayed rope tip — short fiber whiskers
  const tx = tangent?.x ?? 0;
  const ty = tangent?.y ?? 1;
  const nx = -ty;
  const ny = tx;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(tip.x + nx * i * 1.2, tip.y + ny * i * 1.2);
    ctx.lineTo(
      tip.x + tx * (width * 0.9) + nx * i * 2.2,
      tip.y + ty * (width * 0.9) + ny * i * 2.2,
    );
    ctx.strokeStyle = i % 2 === 0 ? JUTE.light : JUTE.mid;
    ctx.lineWidth = 1.4;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  const g = ctx.createRadialGradient(
    tip.x - 2,
    tip.y - 2,
    1,
    tip.x,
    tip.y,
    width * 0.7,
  );
  g.addColorStop(0, JUTE.highlight);
  g.addColorStop(0.5, JUTE.mid);
  g.addColorStop(1, JUTE.dark);
  ctx.beginPath();
  ctx.arc(tip.x, tip.y, width * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.restore();
}

// Keep alias for older imports
export const drawCord = drawJuteRope;
