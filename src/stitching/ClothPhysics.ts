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
 * `laceY` should be the lowest Y the thread has actually reached.
 */
export function contentSettleOffset(
  _progress: number,
  side: "left" | "right",
  index: number,
  elementY?: number,
  laceY?: number,
) {
  let settled = 0;
  if (
    elementY != null &&
    laceY != null &&
    Number.isFinite(elementY) &&
    Number.isFinite(laceY)
  ) {
    // Begin pull-in ~380px before lace arrives; lock flush ~60px after
    settled = smoothstep(elementY - 380, elementY + 60, laceY);
  } else {
    settled = Math.min(1, Math.max(0, _progress));
  }

  const unsettled = 1 - settled;
  const sign = side === "left" ? -1 : 1;
  const rot = unsettled * (7.5 + (index % 5) * 1.6) * sign;
  const x = unsettled * (48 + (index % 4) * 12) * sign;
  const y = unsettled * (16 + (index % 3) * 6);
  return { x, y, rotate: rot, settled };
}
