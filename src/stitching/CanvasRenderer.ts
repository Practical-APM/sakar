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

function seamPath(
  ctx: CanvasRenderingContext2D,
  seam: SeamPoint[],
  xOffset: number,
) {
  ctx.moveTo(seam[0].x + xOffset, seam[0].y);
  for (let i = 1; i < seam.length; i++) {
    ctx.lineTo(seam[i].x + xOffset, seam[i].y);
  }
}

/**
 * Two physical cloth halves filled with photographic linen.
 * Gap between edges closes as stitching progresses.
 */
export function drawClothHalves(
  ctx: CanvasRenderingContext2D,
  seam: SeamPoint[],
  gap: number,
  width: number,
  height: number,
  linen: CanvasImageSource | null,
  patternCache?: { current: CanvasPattern | null },
) {
  if (seam.length < 2) return;

  const halfGap = gap / 2;

  let pattern: CanvasPattern | null = null;
  if (linen) {
    if (patternCache?.current) {
      pattern = patternCache.current;
    } else {
      pattern = ctx.createPattern(linen, "repeat");
      if (patternCache) patternCache.current = pattern;
    }
  }

  const paintHalf = (side: "left" | "right") => {
    ctx.save();
    ctx.beginPath();
    if (side === "left") {
      ctx.moveTo(0, 0);
      ctx.lineTo(seam[0].x - halfGap, 0);
      ctx.lineTo(seam[0].x - halfGap, seam[0].y);
      for (let i = 1; i < seam.length; i++) {
        ctx.lineTo(seam[i].x - halfGap, seam[i].y);
      }
      const last = seam[seam.length - 1];
      ctx.lineTo(last.x - halfGap, height);
      ctx.lineTo(0, height);
      ctx.closePath();
    } else {
      ctx.moveTo(width, 0);
      ctx.lineTo(seam[0].x + halfGap, 0);
      ctx.lineTo(seam[0].x + halfGap, seam[0].y);
      for (let i = 1; i < seam.length; i++) {
        ctx.lineTo(seam[i].x + halfGap, seam[i].y);
      }
      const last = seam[seam.length - 1];
      ctx.lineTo(last.x + halfGap, height);
      ctx.lineTo(width, height);
      ctx.closePath();
    }
    ctx.clip();

    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.globalAlpha = side === "left" ? 1 : 0.97;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      // Warm wash so photo matches cream palette
      ctx.fillStyle =
        side === "left"
          ? "rgba(248, 244, 236, 0.18)"
          : "rgba(238, 233, 223, 0.14)";
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.fillStyle = "#EEE9DF";
      ctx.fillRect(0, 0, width, height);
    }

    // Soft drop into the void along the tear
    ctx.beginPath();
    seamPath(ctx, seam, side === "left" ? -halfGap : halfGap);
    ctx.strokeStyle =
      side === "left" ? "rgba(30, 22, 10, 0.35)" : "rgba(30, 22, 10, 0.28)";
    ctx.lineWidth = 14;
    ctx.filter = "blur(5px)";
    ctx.stroke();
    ctx.filter = "none";

    ctx.beginPath();
    seamPath(ctx, seam, side === "left" ? -halfGap : halfGap);
    ctx.strokeStyle = "rgba(255, 250, 240, 0.45)";
    ctx.lineWidth = 1.6;
    ctx.stroke();

    ctx.restore();
  };

  // Void between the halves
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(seam[0].x - halfGap, 0);
  ctx.lineTo(seam[0].x - halfGap, seam[0].y);
  for (let i = 1; i < seam.length; i++) {
    ctx.lineTo(seam[i].x - halfGap, seam[i].y);
  }
  const last = seam[seam.length - 1];
  ctx.lineTo(last.x - halfGap, height);
  ctx.lineTo(last.x + halfGap, height);
  for (let i = seam.length - 1; i >= 0; i--) {
    ctx.lineTo(seam[i].x + halfGap, seam[i].y);
  }
  ctx.lineTo(seam[0].x + halfGap, 0);
  ctx.closePath();
  ctx.fillStyle = "rgba(18, 14, 8, 0.72)";
  ctx.fill();
  ctx.restore();

  paintHalf("left");
  paintHalf("right");
}

export function drawGrommet(
  ctx: CanvasRenderingContext2D,
  hole: Hole,
  focusY: number,
  squeeze = 1,
) {
  const { x, y } = hole.position;
  const R = hole.radius * squeeze;
  const dist = Math.abs(y - focusY);
  const blur = Math.min(2.4, Math.max(0, (dist - 240) / 200));

  ctx.save();
  if (blur > 0.05) ctx.filter = `blur(${blur.toFixed(2)}px)`;

  drawSoftEllipse(
    ctx,
    x + 1.4,
    y + 2.8,
    R * 1.45,
    R * 0.58,
    "rgba(35, 24, 8, 0.4)",
  );

  const metal = ctx.createRadialGradient(
    x - R * 0.4,
    y - R * 0.45,
    R * 0.08,
    x,
    y,
    R + 2.5,
  );
  metal.addColorStop(0, "#FFF6D4");
  metal.addColorStop(0.2, "#F0D060");
  metal.addColorStop(0.45, "#C9A227");
  metal.addColorStop(0.75, "#8A6A14");
  metal.addColorStop(1, "#3D2E08");

  ctx.beginPath();
  ctx.arc(x, y, R + 2.2, 0, Math.PI * 2);
  ctx.fillStyle = metal;
  ctx.fill();

  // Embossed outer rim
  ctx.beginPath();
  ctx.arc(x, y, R + 0.6, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 230, 150, 0.35)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, R - 1.2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(40, 30, 8, 0.65)";
  ctx.lineWidth = 1.8;
  ctx.stroke();

  const voidG = ctx.createRadialGradient(
    x,
    y,
    0,
    x,
    y,
    Math.max(2.2, R - 3.6),
  );
  voidG.addColorStop(0, "#15120C");
  voidG.addColorStop(0.65, "#2A2418");
  voidG.addColorStop(1, "#4A4030");
  ctx.beginPath();
  ctx.arc(x, y, Math.max(2.2, R - 3.6), 0, Math.PI * 2);
  ctx.fillStyle = voidG;
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(
    x - R * 0.4,
    y - R * 0.42,
    R * 0.3,
    R * 0.15,
    -0.55,
    0,
    Math.PI * 2,
  );
  ctx.fillStyle = "rgba(255, 250, 230, 0.75)";
  ctx.fill();

  ctx.restore();
}

/** Cord with slack wobble from velocity */
export function drawCord(
  ctx: CanvasRenderingContext2D,
  points: Vec2[],
  width: number,
  focusY: number,
  slack = 0,
) {
  if (points.length < 2) return;

  const wobble = points.map((p, i) => {
    const n = Math.sin(i * 0.4 + slack * 8) * slack * 4;
    return { x: p.x + n, y: p.y };
  });

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(wobble[0].x + 2, wobble[0].y + 3);
  for (let i = 1; i < wobble.length; i++) {
    ctx.lineTo(wobble[i].x + 2, wobble[i].y + 3);
  }
  ctx.strokeStyle = "rgba(30, 20, 8, 0.35)";
  ctx.lineWidth = width + 4;
  ctx.filter = "blur(3px)";
  ctx.stroke();
  ctx.filter = "none";

  ctx.beginPath();
  ctx.moveTo(wobble[0].x, wobble[0].y);
  for (let i = 1; i < wobble.length; i++) ctx.lineTo(wobble[i].x, wobble[i].y);
  ctx.strokeStyle = "#4A380C";
  ctx.lineWidth = width + 2.4;
  ctx.stroke();

  const midY = wobble[Math.floor(wobble.length / 2)]?.y ?? 0;
  const blur = Math.min(1.6, Math.max(0, (Math.abs(midY - focusY) - 300) / 220));
  if (blur > 0.05) ctx.filter = `blur(${blur.toFixed(2)}px)`;

  ctx.beginPath();
  ctx.moveTo(wobble[0].x, wobble[0].y);
  for (let i = 1; i < wobble.length; i++) ctx.lineTo(wobble[i].x, wobble[i].y);
  ctx.strokeStyle = "#C9A227";
  ctx.lineWidth = width;
  ctx.stroke();

  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  ctx.moveTo(wobble[0].x - 1.4, wobble[0].y);
  for (let i = 1; i < wobble.length; i++) {
    ctx.lineTo(wobble[i].x + Math.sin(i * 0.6) * 1.6, wobble[i].y);
  }
  ctx.strokeStyle = "#F5E0A0";
  ctx.lineWidth = width * 0.32;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(wobble[0].x + 1.2, wobble[0].y);
  for (let i = 1; i < wobble.length; i++) {
    ctx.lineTo(wobble[i].x + Math.cos(i * 0.55) * 1.3, wobble[i].y);
  }
  ctx.strokeStyle = "#7A5C10";
  ctx.lineWidth = width * 0.25;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.filter = "none";

  ctx.beginPath();
  ctx.moveTo(wobble[0].x - width * 0.18, wobble[0].y);
  for (let i = 1; i < wobble.length; i++) {
    ctx.lineTo(wobble[i].x - width * 0.18, wobble[i].y);
  }
  ctx.strokeStyle = "rgba(255, 246, 210, 0.6)";
  ctx.lineWidth = Math.max(1.4, width * 0.2);
  ctx.stroke();

  ctx.restore();
}

export function drawLooseTip(
  ctx: CanvasRenderingContext2D,
  tip: Vec2,
  width: number,
) {
  ctx.save();
  drawSoftEllipse(
    ctx,
    tip.x + 1.5,
    tip.y + 2.5,
    width * 1.2,
    width * 0.6,
    "rgba(30, 20, 8, 0.4)",
  );

  const g = ctx.createRadialGradient(
    tip.x - 2.5,
    tip.y - 2.5,
    1,
    tip.x,
    tip.y,
    width * 0.9,
  );
  g.addColorStop(0, "#FFF4C8");
  g.addColorStop(0.4, "#D4B038");
  g.addColorStop(1, "#5A440C");

  ctx.beginPath();
  ctx.arc(tip.x, tip.y, width * 0.78, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(tip.x - 1.8, tip.y - 1.8, width * 0.24, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 252, 235, 0.8)";
  ctx.fill();
  ctx.restore();
}

/** Local gap compression near the stitch tip */
export function localGapAt(
  baseGap: number,
  seamY: number,
  tipY: number | null,
  progress: number,
) {
  if (tipY == null) return baseGap;
  const d = Math.abs(seamY - tipY);
  const influence = Math.max(0, 1 - d / 160);
  const closed = 2;
  return baseGap * (1 - influence * 0.55 * Math.min(1, progress * 1.2)) +
    closed * influence * 0.3;
}
