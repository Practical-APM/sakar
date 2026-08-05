import type { ContentRect, SeamPoint } from "@/types";
import { SEAM } from "./constants";
import { clamp, createRng, sampleCatmullRom } from "./math";

function corridorWidth(viewportWidth: number) {
  if (viewportWidth < 640) return SEAM.corridorMobile;
  if (viewportWidth < 1024) return SEAM.corridorTablet;
  return SEAM.corridorDesktop;
}

function isSafe(
  candidateX: number,
  y: number,
  corridorRadius: number,
  contentRects: ContentRect[],
) {
  return !contentRects.some(
    (rect) =>
      y >= rect.top &&
      y <= rect.bottom &&
      candidateX + corridorRadius > rect.left &&
      candidateX - corridorRadius < rect.right,
  );
}

function findSafeX(
  preferredX: number,
  y: number,
  viewportWidth: number,
  corridorRadius: number,
  contentRects: ContentRect[],
  rng: () => number,
): number {
  const minX = viewportWidth * SEAM.clampMin;
  const maxX = viewportWidth * SEAM.clampMax;
  const x = clamp(preferredX, minX, maxX);
  if (isSafe(x, y, corridorRadius, contentRects)) return x;

  const step = 12;
  for (let offset = step; offset < viewportWidth * 0.3; offset += step) {
    const left = clamp(preferredX - offset, minX, maxX);
    if (isSafe(left, y, corridorRadius, contentRects)) return left;
    const right = clamp(preferredX + offset, minX, maxX);
    if (isSafe(right, y, corridorRadius, contentRects)) return right;
  }

  // Soft fallback toward center with tiny jitter
  return clamp(
    viewportWidth * 0.5 + (rng() - 0.5) * 20,
    minX,
    maxX,
  );
}

export function generateSeam(options: {
  height: number;
  viewportWidth: number;
  contentRects?: ContentRect[];
  seed?: number;
}): SeamPoint[] {
  const {
    height,
    viewportWidth,
    contentRects = [],
    seed = SEAM.seed,
  } = options;

  const rng = createRng(seed);
  const corridorRadius = corridorWidth(viewportWidth) / 2;
  const spacing = SEAM.controlPointSpacing;
  const controls: SeamPoint[] = [];

  let x = viewportWidth * 0.48;
  for (let y = 0; y <= height + spacing; y += spacing) {
    const jitter =
      (rng() * 2 - 1) * viewportWidth * SEAM.horizontalJitter;
    const preferred = x + jitter;
    x = findSafeX(
      preferred,
      y,
      viewportWidth,
      corridorRadius,
      contentRects,
      rng,
    );
    // Smooth toward previous to avoid sudden jumps
    if (controls.length > 0) {
      const prev = controls[controls.length - 1];
      x = prev.x * 0.35 + x * 0.65;
      x = clamp(x, viewportWidth * SEAM.clampMin, viewportWidth * SEAM.clampMax);
    }
    controls.push({ x, y });
  }

  return sampleCatmullRom(controls, 20);
}

export function seamXAtY(seam: SeamPoint[], y: number): number {
  if (seam.length === 0) return 0;
  if (y <= seam[0].y) return seam[0].x;
  if (y >= seam[seam.length - 1].y) return seam[seam.length - 1].x;

  for (let i = 1; i < seam.length; i++) {
    if (y <= seam[i].y) {
      const t =
        (y - seam[i - 1].y) / Math.max(1e-6, seam[i].y - seam[i - 1].y);
      return seam[i - 1].x + (seam[i].x - seam[i - 1].x) * t;
    }
  }
  return seam[seam.length - 1].x;
}

export function getCorridorRadius(viewportWidth: number) {
  return corridorWidth(viewportWidth) / 2;
}

export function buildClothPolygons(
  seam: SeamPoint[],
  width: number,
  height: number,
  gap: number,
) {
  const leftPts: SeamPoint[] = [{ x: 0, y: 0 }];
  const rightPts: SeamPoint[] = [{ x: width, y: 0 }];

  for (const p of seam) {
    leftPts.push({ x: p.x - gap, y: p.y });
    rightPts.push({ x: p.x + gap, y: p.y });
  }

  leftPts.push({ x: 0, y: height });
  rightPts.push({ x: width, y: height });

  // Close left polygon counterclockwise along bottom then up left edge
  const leftPath = [
    ...leftPts,
    { x: 0, y: height },
    { x: 0, y: 0 },
  ];

  // Right polygon: follow right edge of seam top→bottom, then around
  const rightPath = [
    { x: width, y: 0 },
    ...rightPts.slice(1),
    { x: width, y: height },
    { x: width, y: 0 },
  ];

  return { leftPath, rightPath, leftEdge: leftPts.slice(1, -1), rightEdge: rightPts.slice(1, -1) };
}
