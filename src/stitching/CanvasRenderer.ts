import type { HelixPoint } from "./HelixPath";
import { drawBehindCordRuns, drawCordRuns } from "./CordBrush";
import { drawGrommetStamp } from "./GrommetAtlas";
import { seamXAtY } from "./SeamGenerator";
import type { Hole, SeamPoint, Vec2 } from "@/types";

function gapAt(
  profile: { y: number; gap: number }[],
  y: number,
  fallback: number,
) {
  if (!profile.length) return fallback;
  let best = profile[0];
  let bestD = Math.abs(best.y - y);
  for (const p of profile) {
    const d = Math.abs(p.y - y);
    if (d < bestD) {
      best = p;
      bestD = d;
    }
  }
  return best.gap;
}

/**
 * Deep void + frayed cloth lips with soft AO.
 * Culled to viewport; irregular edge reads as torn linen.
 */
export function drawClothSplit(
  ctx: CanvasRenderingContext2D,
  seam: SeamPoint[],
  avgGap: number,
  height: number,
  gapProfile: { y: number; gap: number }[] = [],
  quality: 0 | 1 | 2 = 2,
  viewTop = 0,
  viewBottom = height,
) {
  if (seam.length < 2) return;
  ctx.save();

  const y0 = Math.max(0, viewTop);
  const y1 = Math.min(height, viewBottom);

  const fray = (y: number, side: number) => {
    // Cheap deterministic irregularity — torn linen edge
    return (
      Math.sin(y * 0.13 + side) * 1.4 +
      Math.sin(y * 0.37 + side * 2.1) * 0.9 +
      Math.sin(y * 0.91 + side * 0.7) * 0.45
    );
  };

  const samples: { y: number; xl: number; xr: number }[] = [];
  const step = quality === 0 ? 20 : quality === 1 ? 12 : 7;
  for (let y = y0; y <= y1; y += step) {
    const sx = seamXAtY(seam, y);
    const g = gapAt(gapProfile, y, avgGap) / 2;
    const f =
      quality >= 1 ? fray(y, 1) : 0;
    samples.push({
      y,
      xl: sx - g + (quality >= 1 ? fray(y, -1) * 0.35 : 0),
      xr: sx + g + f * 0.35,
    });
  }
  {
    const sx = seamXAtY(seam, y1);
    const g = gapAt(gapProfile, y1, avgGap) / 2;
    const last = samples[samples.length - 1];
    if (!last || Math.abs(last.y - y1) > 1) {
      samples.push({
        y: y1,
        xl: sx - g,
        xr: sx + g,
      });
    }
  }

  if (samples.length < 2) {
    ctx.restore();
    return;
  }

  // Void fill
  ctx.beginPath();
  ctx.moveTo(samples[0].xl, samples[0].y);
  for (let i = 1; i < samples.length; i++) {
    ctx.lineTo(samples[i].xl, samples[i].y);
  }
  for (let i = samples.length - 1; i >= 0; i--) {
    ctx.lineTo(samples[i].xr, samples[i].y);
  }
  ctx.closePath();
  ctx.fillStyle = "#030201";
  ctx.fill();

  // Inner void vignette (reads as depth into darkness)
  if (quality >= 1) {
    ctx.save();
    ctx.clip();
    for (let i = 0; i < samples.length; i += 2) {
      const s = samples[i];
      const mid = (s.xl + s.xr) / 2;
      const g = ctx.createRadialGradient(mid, s.y, 0, mid, s.y, 28);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.35)");
      ctx.fillStyle = g;
      ctx.fillRect(s.xl - 4, s.y - 8, s.xr - s.xl + 8, 16);
    }
    ctx.restore();
  }

  // Cloth AO + pale lip
  if (quality >= 1) {
    for (const side of ["l", "r"] as const) {
      ctx.beginPath();
      for (let i = 0; i < samples.length; i++) {
        const x = side === "l" ? samples[i].xl : samples[i].xr;
        if (i === 0) ctx.moveTo(x, samples[i].y);
        else ctx.lineTo(x, samples[i].y);
      }
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.lineWidth = quality === 2 ? 16 : 11;
      ctx.lineCap = "round";
      ctx.stroke();

      // Secondary softer fold
      ctx.beginPath();
      for (let i = 0; i < samples.length; i++) {
        const x =
          side === "l" ? samples[i].xl - 5 : samples[i].xr + 5;
        if (i === 0) ctx.moveTo(x, samples[i].y);
        else ctx.lineTo(x, samples[i].y);
      }
      ctx.strokeStyle = "rgba(40,30,18,0.12)";
      ctx.lineWidth = 8;
      ctx.stroke();

      // Catch-light on cloth lip
      ctx.beginPath();
      for (let i = 0; i < samples.length; i++) {
        const x =
          side === "l" ? samples[i].xl - 2.5 : samples[i].xr + 2.5;
        if (i === 0) ctx.moveTo(x, samples[i].y);
        else ctx.lineTo(x, samples[i].y);
      }
      ctx.strokeStyle = "rgba(255,248,235,0.22)";
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }

    // Micro fiber whiskers along the tear (high quality)
    if (quality >= 2) {
      for (let i = 0; i < samples.length; i += 3) {
        const s = samples[i];
        for (const side of [-1, 1] as const) {
          const base = side < 0 ? s.xl : s.xr;
          const n = ((i * 17 + side) % 10) / 10;
          ctx.beginPath();
          ctx.moveTo(base, s.y);
          ctx.lineTo(base + side * (2 + n * 3), s.y + (n - 0.5) * 2);
          ctx.strokeStyle = "rgba(210,195,165,0.35)";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  } else {
    for (const side of ["l", "r"] as const) {
      ctx.beginPath();
      for (let i = 0; i < samples.length; i++) {
        const x = side === "l" ? samples[i].xl : samples[i].xr;
        if (i === 0) ctx.moveTo(x, samples[i].y);
        else ctx.lineTo(x, samples[i].y);
      }
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 8;
      ctx.stroke();
    }
  }

  ctx.restore();
}

export function drawGrommet(
  ctx: CanvasRenderingContext2D,
  hole: Hole,
  squeeze = 1,
  quality: 0 | 1 | 2 = 2,
) {
  drawGrommetStamp(
    ctx,
    hole.position.x,
    hole.position.y,
    hole.radius,
    quality,
    squeeze,
  );
}

export function drawJuteRun(
  ctx: CanvasRenderingContext2D,
  points: HelixPoint[],
  width: number,
  slack = 0,
  quality: 0 | 1 | 2 = 2,
) {
  drawCordRuns(ctx, [points], width, quality, slack);
}

export function drawJuteRope(
  ctx: CanvasRenderingContext2D,
  runs: HelixPoint[][],
  width: number,
  slack = 0,
  quality: 0 | 1 | 2 = 2,
) {
  drawCordRuns(ctx, runs, width, quality, slack);
}

export function drawBehindRope(
  ctx: CanvasRenderingContext2D,
  runs: HelixPoint[][],
  width: number,
  quality: 0 | 1 | 2 = 1,
) {
  drawBehindCordRuns(ctx, runs, width, quality);
}

export function drawLooseTip(
  ctx: CanvasRenderingContext2D,
  tip: Vec2,
  width: number,
  tangent?: Vec2,
) {
  ctx.save();
  const tx = tangent?.x ?? 0;
  const ty = tangent?.y ?? 1;
  const nx = -ty;
  const ny = tx;

  ctx.beginPath();
  ctx.arc(tip.x + 0.8, tip.y + 1.2, width * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.fill();

  const fibers = [
    "#c4b08a",
    "#d4c49a",
    "#e2d4b4",
    "#efe4ce",
    "#c9b892",
    "#f5eedc",
  ];
  for (let i = -5; i <= 5; i++) {
    const spread = i * 0.65;
    const len = width * (1.1 + (Math.abs(i) % 3) * 0.25);
    ctx.beginPath();
    ctx.moveTo(tip.x + nx * spread, tip.y + ny * spread);
    ctx.lineTo(
      tip.x + tx * len + nx * spread * 1.8,
      tip.y + ty * len + ny * spread * 1.8,
    );
    ctx.strokeStyle = fibers[Math.abs(i) % fibers.length];
    ctx.lineWidth = 0.85 + (Math.abs(i) % 2) * 0.25;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(tip.x, tip.y, width * 0.38, 0, Math.PI * 2);
  const tipGrad = ctx.createRadialGradient(
    tip.x - 1,
    tip.y - 1,
    0,
    tip.x,
    tip.y,
    width * 0.38,
  );
  tipGrad.addColorStop(0, "#f5eedc");
  tipGrad.addColorStop(0.5, "#e2d4b4");
  tipGrad.addColorStop(1, "#c4b08a");
  ctx.fillStyle = tipGrad;
  ctx.fill();
  ctx.restore();
}

export const drawCord = drawJuteRope;
