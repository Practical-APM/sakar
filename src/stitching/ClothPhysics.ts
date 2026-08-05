export function clothTensionScale(progress: number, localY: number, pageHeight: number) {
  // Local tension peaks near the stitch tip region
  const tipY = progress * pageHeight;
  const dist = Math.abs(localY - tipY);
  const influence = Math.max(0, 1 - dist / 280);
  return 1 - influence * 0.015 * progress;
}

export function contentSettleOffset(
  progress: number,
  side: "left" | "right",
  index: number,
) {
  const unsettled = 1 - Math.min(1, progress * 1.15);
  const sign = side === "left" ? -1 : 1;
  const rot = unsettled * (1.6 + (index % 3) * 0.55) * sign;
  const x = unsettled * (10 + (index % 2) * 6) * sign;
  return { x, rotate: rot };
}
