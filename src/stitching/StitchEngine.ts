import type { ContentRect, Hole, SeamPoint, Vec2 } from "@/types";
import { DEBUG_STITCHING, HOLES } from "./constants";
import {
  buildPathThroughHoles,
  computePairTightness,
  generatePairs,
  offsetForY,
  placeHoles,
  sliceHelixByLength,
  splitHelixRuns,
  type HelixPoint,
  type PairDef,
  type PairTightness,
} from "./HelixPath";
import { generateSeam, getCorridorRadius } from "./SeamGenerator";
import { ThreadPhysics } from "./ThreadPhysics";

export interface StitchSnapshot {
  seam: SeamPoint[];
  holes: Hole[];
  visiblePath: Vec2[];
  visibleRuns: HelixPoint[][];
  /** Rear helix segments (through the void) — drawn behind */
  backRuns: HelixPoint[][];
  tip: HelixPoint | null;
  progress: number;
  completedHoleCount: number;
  seamGap: number;
  gapProfile: { y: number; gap: number }[];
  pairTightness: PairTightness[];
  corridorRadius: number;
  debug: boolean;
  totalLength: number;
  slack: number;
  velocity: number;
}

function spacing(vw: number) {
  if (vw < 640) return 38;
  if (vw < 1024) return 44;
  return 50;
}

function openOffset(vw: number) {
  if (vw < 640) return 22;
  if (vw < 1024) return 28;
  return 32;
}

function holeRadius(vw: number) {
  if (vw < 640) return HOLES.radiusMobile;
  if (vw < 1024) return HOLES.radiusTablet;
  return HOLES.radiusDesktop;
}

/**
 * Live pull-in every frame (no quantized tension lag).
 * Open-path arc lengths are cached once for stable progress → tightness.
 */
export class StitchEngine {
  private physics = new ThreadPhysics();
  private seam: SeamPoint[] = [];
  private baseHoles: Hole[] = [];
  private pairs: PairDef[] = [];
  private width = 0;
  private height = 0;
  private lastTime = 0;
  private openOff = 42;
  private closedOff = 13;

  private openArcLengths: number[] = [];
  private openTotalLength = 1;

  rebuild(options: {
    width: number;
    height: number;
    contentRects?: ContentRect[];
  }) {
    this.width = options.width;
    this.height = options.height;

    this.seam = generateSeam({
      height: this.height,
      viewportWidth: this.width,
      contentRects: options.contentRects ?? [],
    });

    this.openOff = openOffset(this.width);
    this.closedOff = Math.max(14, this.openOff * 0.38);

    const gen = generatePairs(
      this.seam,
      this.height,
      spacing(this.width),
      holeRadius(this.width),
    );
    this.baseHoles = gen.holes;
    this.pairs = gen.pairs;

    const openHoles = placeHoles(this.baseHoles, this.seam, [], this.openOff);
    const openBuilt = buildPathThroughHoles(openHoles, this.seam);
    this.openArcLengths = openBuilt.holeArcLengths;
    this.openTotalLength = Math.max(1, openBuilt.totalLength);
    this.lastTime = 0;
  }

  setScrollProgress(progress: number) {
    this.physics.setTarget(progress);
  }

  private snapshotAt(progress: number): StitchSnapshot {
    const arcGuess = progress * this.openTotalLength;
    const pairTightness = computePairTightness(
      this.pairs,
      this.openArcLengths,
      arcGuess,
      this.openOff,
      this.closedOff,
    );

    // Live rivet positions every frame — cinch tracks the tip immediately
    const holes = placeHoles(
      this.baseHoles,
      this.seam,
      pairTightness,
      this.openOff,
    );
    const built = buildPathThroughHoles(holes, this.seam);
    const arcLength = progress * built.totalLength;

    const sliced = sliceHelixByLength(
      built.points,
      built.cumulativeLengths,
      arcLength,
    );
    const { front, back } = splitHelixRuns(sliced);
    const tip = sliced.length ? sliced[sliced.length - 1] : null;

    let completedHoleCount = 0;
    for (const len of built.holeArcLengths) {
      if (len <= arcLength) completedHoleCount += 1;
      else break;
    }

    const gapProfile: { y: number; gap: number }[] = [];
    const step = Math.max(24, Math.floor(this.height / 90));
    for (let y = 0; y < this.height; y += step) {
      const off = offsetForY(pairTightness, y, this.openOff);
      gapProfile.push({ y, gap: off * 2 * 0.95 });
    }
    const offEnd = offsetForY(pairTightness, this.height, this.openOff);
    gapProfile.push({ y: this.height, gap: offEnd * 2 * 0.95 });
    const seamGap =
      gapProfile.reduce((a, p) => a + p.gap, 0) /
      Math.max(1, gapProfile.length);

    return {
      seam: this.seam,
      holes,
      visiblePath: [],
      visibleRuns: front,
      backRuns: back,
      tip,
      progress,
      completedHoleCount,
      seamGap,
      gapProfile,
      pairTightness,
      corridorRadius: getCorridorRadius(this.width),
      debug: DEBUG_STITCHING,
      totalLength: built.totalLength,
      slack: this.physics.getSlack(),
      velocity: this.physics.velocity,
    };
  }

  peek(): StitchSnapshot {
    return this.snapshotAt(this.physics.current);
  }

  tick(now: number): StitchSnapshot {
    if (!this.lastTime) this.lastTime = now;
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    return this.snapshotAt(this.physics.step(dt));
  }

  getHoleCount() {
    return this.baseHoles.length;
  }
}
