import type { ContentRect, Hole, SeamPoint, Vec2 } from "@/types";
import { DEBUG_STITCHING, HOLES } from "./constants";
import {
  buildHelixStitch,
  computePairTightness,
  offsetForY,
  sliceHelixByLength,
  visibleRuns,
  type HelixPoint,
  type PairTightness,
} from "./HelixPath";
import {
  buildClothPolygons,
  generateSeam,
  getCorridorRadius,
  seamXAtY,
} from "./SeamGenerator";
import { ThreadPhysics } from "./ThreadPhysics";

export interface StitchSnapshot {
  seam: SeamPoint[];
  holes: Hole[];
  visiblePath: Vec2[];
  visibleRuns: HelixPoint[][];
  tip: HelixPoint | null;
  progress: number;
  completedHoleCount: number;
  /** Global average gap for void width */
  seamGap: number;
  /** Local gap samples along seam for variable void */
  gapProfile: { y: number; gap: number }[];
  pairTightness: PairTightness[];
  corridorRadius: number;
  debug: boolean;
  totalLength: number;
  slack: number;
  velocity: number;
  cloth: ReturnType<typeof buildClothPolygons>;
}

function openOffset(vw: number) {
  if (vw < 640) return 20;
  if (vw < 1024) return 28;
  return HOLES.offsetFromSeam;
}

function helixRadius(vw: number) {
  if (vw < 640) return 22;
  if (vw < 1024) return 36;
  return 52;
}

function helixPitch(vw: number) {
  if (vw < 640) return 48;
  if (vw < 1024) return 58;
  return 68;
}

function holeRadius(vw: number) {
  if (vw < 640) return HOLES.radiusMobile;
  if (vw < 1024) return HOLES.radiusTablet;
  return HOLES.radiusDesktop;
}

export class StitchEngine {
  private physics = new ThreadPhysics();
  private seam: SeamPoint[] = [];
  private helixPoints: HelixPoint[] = [];
  private cumulativeLengths: number[] = [];
  private holeArcLengths: number[] = [];
  private holes: Hole[] = [];
  private pairs: ReturnType<typeof buildHelixStitch>["pairs"] = [];
  private totalLength = 0;
  private width = 0;
  private height = 0;
  private lastTime = 0;
  private openOff = 36;
  private closedOff = 14;

  rebuild(options: {
    width: number;
    height: number;
    contentRects?: ContentRect[];
  }) {
    this.width = options.width;
    this.height = options.height;
    const rects = options.contentRects ?? [];

    this.seam = generateSeam({
      height: this.height,
      viewportWidth: this.width,
      contentRects: rects,
    });

    this.openOff = openOffset(this.width);
    this.closedOff = Math.max(10, this.openOff * 0.38);

    const built = buildHelixStitch({
      seam: this.seam,
      height: this.height,
      radius: helixRadius(this.width),
      pitch: helixPitch(this.width),
      holeRadius: holeRadius(this.width),
      openOffset: this.openOff,
    });

    this.helixPoints = built.points;
    this.cumulativeLengths = built.cumulativeLengths;
    this.holeArcLengths = built.holeArcLengths;
    this.holes = built.holes;
    this.pairs = built.pairs;
    this.totalLength = built.totalLength;
  }

  setScrollProgress(progress: number) {
    this.physics.setTarget(progress);
  }

  private snapshotAt(progress: number): StitchSnapshot {
    const arcLength = progress * this.totalLength;
    const sliced = sliceHelixByLength(
      this.helixPoints,
      this.cumulativeLengths,
      arcLength,
    );
    const runs = visibleRuns(sliced);
    const tip = sliced.length ? sliced[sliced.length - 1] : null;

    let completedHoleCount = 0;
    for (const len of this.holeArcLengths) {
      if (len <= arcLength) completedHoleCount += 1;
      else break;
    }

    const pairTightness = computePairTightness(
      this.pairs,
      this.holeArcLengths,
      arcLength,
      this.openOff,
      this.closedOff,
    );

    // Rebuild hole positions with local pull-in
    const holes: Hole[] = this.holes.map((h) => {
      const off = offsetForY(pairTightness, h.position.y, this.openOff);
      const sx = seamXAtY(this.seam, h.position.y);
      return {
        ...h,
        position: {
          x: h.side === "left" ? sx - off : sx + off,
          y: h.position.y,
        },
      };
    });

    // Variable gap along seam from local tightness
    const gapProfile: { y: number; gap: number }[] = [];
    const maxGap = this.openOff * 1.15;
    const minGap = this.closedOff * 0.85;
    for (let y = 0; y < this.height; y += 24) {
      const off = offsetForY(pairTightness, y, this.openOff);
      const t = (this.openOff - off) / Math.max(1e-6, this.openOff - this.closedOff);
      gapProfile.push({
        y,
        gap: maxGap - (maxGap - minGap) * Math.min(1, Math.max(0, t)),
      });
    }

    const avgGap =
      gapProfile.reduce((a, p) => a + p.gap, 0) /
      Math.max(1, gapProfile.length);

    const cloth = buildClothPolygons(
      this.seam,
      this.width,
      this.height,
      avgGap,
    );

    const visiblePath = sliced
      .filter((p) => !p.occluded)
      .map((p) => ({ x: p.x, y: p.y }));

    return {
      seam: this.seam,
      holes,
      visiblePath,
      visibleRuns: runs,
      tip,
      progress,
      completedHoleCount,
      seamGap: avgGap,
      gapProfile,
      pairTightness,
      corridorRadius: getCorridorRadius(this.width),
      debug: DEBUG_STITCHING,
      totalLength: this.totalLength,
      slack: this.physics.getSlack(),
      velocity: this.physics.velocity,
      cloth,
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
    return this.holes.length;
  }

  getPhysicsProgress() {
    return this.physics.current;
  }
}
