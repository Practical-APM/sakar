import type { HelixPoint } from "./HelixPath";

/**
 * Natural raw jute — light sandy straw, matte (not dark kraft or gold metal).
 */

type Pt = { x: number; y: number };

const JUTE = {
  dark: "#c4b08a",
  mid: "#d4c49a",
  body: "#e2d4b4",
  light: "#efe4ce",
  pale: "#f5eedc",
  tip: "#d0be98",
} as const;

const PLY = [
  "#c4b08a",
  "#d4c49a",
  "#e2d4b4",
  "#efe4ce",
  "#c9b892",
  "#f5eedc",
  "#b8a67c",
  "#eadfc8",
];

function tubeSides(
  points: HelixPoint[],
  half: number,
): { left: Pt[]; right: Pt[]; ns: Pt[] } {
  const ns: Pt[] = [];
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(points.length - 1, i + 1)];
    const tx = b.x - a.x;
    const ty = b.y - a.y;
    const mag = Math.hypot(tx, ty) || 1;
    const nx = -ty / mag;
    const ny = tx / mag;
    ns.push({ x: nx, y: ny });
    const p = points[i];
    const wobble = 1 + Math.sin(p.s * 0.35) * 0.05;
    const fat = half * wobble * (1 + Math.max(0, p.depth) * 0.06);
    left.push({ x: p.x + nx * fat, y: p.y + ny * fat });
    right.push({ x: p.x - nx * fat, y: p.y - ny * fat });
  }
  return { left, right, ns };
}

function fillTube(
  ctx: CanvasRenderingContext2D,
  left: Pt[],
  right: Pt[],
  fill: string | CanvasGradient,
) {
  ctx.beginPath();
  ctx.moveTo(left[0].x, left[0].y);
  for (let i = 1; i < left.length; i++) ctx.lineTo(left[i].x, left[i].y);
  for (let i = right.length - 1; i >= 0; i--) {
    ctx.lineTo(right[i].x, right[i].y);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

export function drawCordRun(
  ctx: CanvasRenderingContext2D,
  points: HelixPoint[],
  width: number,
  quality: 0 | 1 | 2,
  slack = 0,
) {
  if (points.length < 2) return;
  const half = Math.max(1.6, width * 0.44);
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const { left, right, ns } = tubeSides(points, half);

  // Soft contact shadow — keep light so cord stays sandy, not black
  ctx.beginPath();
  ctx.moveTo(left[0].x + 0.8, left[0].y + 1.2);
  for (let i = 1; i < left.length; i++) {
    ctx.lineTo(left[i].x + 0.8, left[i].y + 1.2);
  }
  for (let i = right.length - 1; i >= 0; i--) {
    ctx.lineTo(right[i].x + 0.8, right[i].y + 1.2);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(80, 60, 30, 0.14)";
  ctx.fill();

  const mid = (points.length / 2) | 0;
  const body = ctx.createLinearGradient(
    points[0].x,
    points[0].y,
    points[mid].x,
    points[mid].y,
  );
  body.addColorStop(0, JUTE.pale);
  body.addColorStop(0.35, JUTE.light);
  body.addColorStop(0.7, JUTE.body);
  body.addColorStop(1, JUTE.mid);
  fillTube(ctx, left, right, body);

  ctx.beginPath();
  ctx.arc(points[0].x, points[0].y, half * 0.85, 0, Math.PI * 2);
  ctx.arc(
    points[points.length - 1].x,
    points[points.length - 1].y,
    half * 0.85,
    0,
    Math.PI * 2,
  );
  ctx.fillStyle = JUTE.body;
  ctx.fill();

  // Matte ridge — muted, no metallic sheen
  ctx.beginPath();
  ctx.moveTo(points[0].x + half * 0.08, points[0].y + half * 0.1);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x + half * 0.08, points[i].y + half * 0.1);
  }
  ctx.strokeStyle = "rgba(140, 120, 80, 0.28)";
  ctx.lineWidth = width * 0.28;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(points[0].x - half * 0.1, points[0].y - half * 0.08);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x - half * 0.1, points[i].y - half * 0.08);
  }
  ctx.strokeStyle = "rgba(255, 248, 230, 0.35)";
  ctx.lineWidth = width * 0.12;
  ctx.stroke();

  const strands = quality === 0 ? 2 : quality === 1 ? 4 : 5;
  const step = quality === 0 ? 2 : 1;
  const twist = 0.48 + slack * 0.12;
  for (let strand = 0; strand < strands; strand++) {
    const phase0 = (strand / strands) * Math.PI * 2;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < points.length; i += step) {
      const p = points[i];
      const n = ns[i];
      const phase = p.s * twist + phase0;
      const c = Math.cos(phase);
      if (c < -0.15) {
        started = false;
        continue;
      }
      const amp = half * (0.5 + 0.32 * c);
      const x = p.x + n.x * amp;
      const y = p.y + n.y * amp;
      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = PLY[(strand + (points[0].s | 0)) % PLY.length];
    ctx.globalAlpha = 0.4 + (strand % 3) * 0.06;
    ctx.lineWidth = Math.max(0.55, width * (0.09 + (strand % 3) * 0.025));
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  if (quality >= 1) {
    const twist2 = -0.22 + slack * 0.05;
    for (let strand = 0; strand < 2; strand++) {
      const phase0 = (strand / 2) * Math.PI * 2 + 0.4;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < points.length; i += 2) {
        const p = points[i];
        const n = ns[i];
        const c = Math.cos(p.s * twist2 + phase0);
        if (c < 0) {
          started = false;
          continue;
        }
        const amp = half * 0.32 * c;
        const x = p.x + n.x * amp;
        const y = p.y + n.y * amp;
        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = PLY[(strand + 2) % PLY.length];
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = width * 0.07;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  ctx.beginPath();
  ctx.moveTo(left[0].x, left[0].y);
  for (let i = 1; i < left.length; i++) ctx.lineTo(left[i].x, left[i].y);
  for (let i = right.length - 1; i >= 0; i--) {
    ctx.lineTo(right[i].x, right[i].y);
  }
  ctx.closePath();
  ctx.strokeStyle = "rgba(150, 130, 90, 0.18)";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.restore();
}

export function drawCordRuns(
  ctx: CanvasRenderingContext2D,
  runs: HelixPoint[][],
  width: number,
  quality: 0 | 1 | 2,
  slack = 0,
) {
  for (const run of runs) {
    if (run.length >= 2) drawCordRun(ctx, run, width, quality, slack);
  }
}

export function drawBehindCordRuns(
  ctx: CanvasRenderingContext2D,
  runs: HelixPoint[][],
  width: number,
  quality: 0 | 1 | 2 = 1,
) {
  if (!runs.length) return;
  const w = Math.max(1.8, width * 0.65);
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (const points of runs) {
    if (points.length < 2) continue;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = "rgba(60, 45, 25, 0.28)";
    ctx.lineWidth = w + 1.4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = JUTE.mid;
    ctx.lineWidth = w;
    ctx.stroke();

    if (quality >= 1) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = JUTE.light;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = w * 0.35;
      ctx.stroke();
      ctx.globalAlpha = 0.55;
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}
