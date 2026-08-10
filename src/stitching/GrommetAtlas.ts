/**
 * Simple punched holes — black voids in the cloth, no brass hardware.
 */

type Stamp = {
  canvas: HTMLCanvasElement;
  cssSize: number;
};

const cache = new Map<string, Stamp>();

function key(radius: number, quality: 0 | 1 | 2) {
  const r = Math.round(radius * 4) / 4;
  return `${r}:hole:${quality}`;
}

function paintHole(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  R: number,
  quality: 0 | 1 | 2,
) {
  // Soft contact / sink into cloth
  ctx.beginPath();
  ctx.ellipse(cx + 0.4, cy + R * 0.45, R * 1.35, R * 0.4, 0, 0, Math.PI * 2);
  const sh = ctx.createRadialGradient(cx, cy, 0, cx, cy + R * 0.2, R * 1.6);
  sh.addColorStop(0, "rgba(0,0,0,0.28)");
  sh.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = sh;
  ctx.fill();

  // Cloth rim compression
  if (quality >= 1) {
    ctx.beginPath();
    ctx.arc(cx, cy, R + 1.4, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(40, 30, 18, 0.22)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, R + 0.6, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 250, 240, 0.2)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Inner bevel (cloth thickness into the punch)
  const bevel = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.25, 0, cx, cy, R);
  bevel.addColorStop(0, "#2a2218");
  bevel.addColorStop(0.55, "#12100c");
  bevel.addColorStop(1, "#050403");
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = bevel;
  ctx.fill();

  // Pure black hole
  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(1.2, R * 0.72), 0, Math.PI * 2);
  ctx.fillStyle = "#030201";
  ctx.fill();
}

function dprCap() {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, 2);
}

export function getGrommetStamp(radius: number, quality: 0 | 1 | 2 = 2): Stamp {
  const k = key(radius, quality);
  const hit = cache.get(k);
  if (hit) return hit;

  const R = Math.round(radius * 4) / 4;
  const pad = 10;
  const cssSize = Math.ceil(R * 2 + pad * 2 + 4);
  const dpr = dprCap();
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(cssSize * dpr);
  canvas.height = Math.ceil(cssSize * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paintHole(ctx, cssSize / 2, cssSize / 2, R, quality);

  const stamp: Stamp = { canvas, cssSize };
  cache.set(k, stamp);
  return stamp;
}

export function drawGrommetStamp(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  quality: 0 | 1 | 2 = 2,
  scale = 1,
) {
  const stamp = getGrommetStamp(radius, quality);
  const dw = stamp.cssSize * scale;
  const dh = stamp.cssSize * scale;
  ctx.drawImage(stamp.canvas, x - dw / 2, y - dh / 2, dw, dh);
}

export function clearGrommetCache() {
  cache.clear();
}
