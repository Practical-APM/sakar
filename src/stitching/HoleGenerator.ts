import type { Hole, HolePair, SeamPoint } from "@/types";
import { HOLES } from "./constants";
import { seamXAtY } from "./SeamGenerator";

function holeSpacing(viewportWidth: number) {
  if (viewportWidth < 640) return HOLES.spacingMobile;
  if (viewportWidth < 1024) return HOLES.spacingTablet;
  return HOLES.spacingDesktop;
}

function holeRadius(viewportWidth: number) {
  if (viewportWidth < 640) return HOLES.radiusMobile;
  if (viewportWidth < 1024) return HOLES.radiusTablet;
  return HOLES.radiusDesktop;
}

function offsetFromSeam(viewportWidth: number) {
  if (viewportWidth < 640) return 22;
  if (viewportWidth < 1024) return 30;
  return HOLES.offsetFromSeam;
}

export function generateHoles(
  seam: SeamPoint[],
  height: number,
  viewportWidth: number,
): HolePair[] {
  const spacing = holeSpacing(viewportWidth);
  const radius = holeRadius(viewportWidth);
  const offset = offsetFromSeam(viewportWidth);
  const pairs: HolePair[] = [];
  let index = 0;

  for (let y = spacing * 1.5; y < height - spacing; y += spacing) {
    const sx = seamXAtY(seam, y);
    const left: Hole = {
      index,
      side: "left",
      position: { x: sx - offset, y },
      radius,
    };
    index += 1;
    const right: Hole = {
      index,
      side: "right",
      position: { x: sx + offset, y },
      radius,
    };
    index += 1;
    pairs.push({ y, left, right });
  }

  return pairs;
}

/** Ordered stitch sequence: alternate L→R→L→R weaving down the seam */
export function flattenStitchOrder(pairs: HolePair[]): Hole[] {
  const holes: Hole[] = [];
  pairs.forEach((pair, i) => {
    if (i % 2 === 0) {
      holes.push(pair.left, pair.right);
    } else {
      holes.push(pair.right, pair.left);
    }
  });
  return holes;
}
