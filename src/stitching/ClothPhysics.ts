/**
 * Content starts skewed / offset and settles into place
 * as the stitch tip reaches each block.
 */
export function clothTensionScale(progress: number, localY: number, pageHeight: number) {
  const tipY = progress * pageHeight;
  const dist = Math.abs(localY - tipY);
  const influence = Math.max(0, 1 - dist / 280);
  return 1 - influence * 0.015 * progress;
}

/** Smoothstep 0→1 as laceY crosses [start, end]. */
function smoothstep(start: number, end: number, v: number) {
  const t = Math.min(1, Math.max(0, (v - start) / Math.max(1, end - start)));
  return t * t * (3 - 2 * t);
}

/**
 * Cards sit crooked until the lace reaches them, then pull flush.
 * Slight per-index stagger so a stack settles like a cascade of patches.
 */
export function contentSettleOffset(
  _progress: number,
  side: "left" | "right",
  index: number,
  elementY?: number,
  laceY?: number,
) {
  const stagger = (index % 6) * 28;
  let settled = 0;
  if (
    elementY != null &&
    laceY != null &&
    Number.isFinite(elementY) &&
    Number.isFinite(laceY)
  ) {
    // Begin pull-in before lace arrives; lock flush shortly after
    settled = smoothstep(elementY - 360 + stagger, elementY + 50 + stagger * 0.35, laceY);
  } else {
    settled = Math.min(1, Math.max(0, _progress));
  }

  // Soft overshoot into place (ease past 1 then settle) via cubic bias
  const s = settled * settled * (3 - 2 * settled);
  const unsettled = 1 - s;
  const sign = side === "left" ? -1 : 1;
  const rot = unsettled * (5.5 + (index % 5) * 1.35) * sign;
  const x = unsettled * (36 + (index % 4) * 10) * sign;
  const y = unsettled * (12 + (index % 3) * 5);
  return { x, y, rotate: rot, settled: s };
}
