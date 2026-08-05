import type { ContentRect, Hole, SeamPoint, Vec2 } from "@/types";
import { DEBUG_STITCHING } from "./constants";
import { flattenStitchOrder, generateHoles } from "./HoleGenerator";
import {
  buildClothPolygons,
  generateSeam,
  getCorridorRadius,
} from "./SeamGenerator";
import { ThreadPhysics } from "./ThreadPhysics";
import {
  buildThreadPath,
  slicePathByLength,
  type ThreadSegment,
} from "./ThreadPath";
import { pointsToSvgPath } from "./math";

export interface StitchSnapshot {
  seam: SeamPoint[];
  holes: Hole[];
  grommetPairs: ReturnType<typeof generateHoles>;
  visiblePath: Vec2[];
  visiblePathD: string;
  tip: Vec2 | null;
  progress: number;
  completedHoleCount: number;
  seamGap: number;
  cloth: ReturnType<typeof buildClothPolygons>;
  corridorRadius: number;
  debug: boolean;
  segments: ThreadSegment[];
  totalLength: number;
  slack: number;
  velocity: number;
}

export class StitchEngine {
  private physics = new ThreadPhysics();
  private seam: SeamPoint[] = [];
  private holes: Hole[] = [];
  private grommetPairs: ReturnType<typeof generateHoles> = [];
  private fullPath: Vec2[] = [];
  private cumulativeLengths: number[] = [];
  private holeArcLengths: number[] = [];
  private segments: ThreadSegment[] = [];
  private totalLength = 0;
  private width = 0;
  private height = 0;
  private lastTime = 0;
  private contentRects: ContentRect[] = [];

  rebuild(options: {
    width: number;
    height: number;
    contentRects?: ContentRect[];
  }) {
    this.width = options.width;
    this.height = options.height;
    this.contentRects = options.contentRects ?? [];

    this.seam = generateSeam({
      height: this.height,
      viewportWidth: this.width,
      contentRects: this.contentRects,
    });

    this.grommetPairs = generateHoles(this.seam, this.height, this.width);
    this.holes = flattenStitchOrder(this.grommetPairs);

    const start: Vec2 = {
      x: this.seam[0]?.x ?? this.width * 0.5,
      y: 8,
    };

    const built = buildThreadPath(this.holes, start);
    this.fullPath = built.fullPath;
    this.cumulativeLengths = built.cumulativeLengths;
    this.holeArcLengths = built.holeArcLengths;
    this.segments = built.segments;
    this.totalLength = built.totalLength;
  }

  setScrollProgress(progress: number) {
    this.physics.setTarget(progress);
  }

  private snapshotAt(progress: number): StitchSnapshot {
    const arcLength = progress * this.totalLength;
    const visiblePath = slicePathByLength(
      this.fullPath,
      this.cumulativeLengths,
      arcLength,
    );

    const tip =
      visiblePath.length > 0 ? visiblePath[visiblePath.length - 1] : null;

    let completedHoleCount = 0;
    for (const len of this.holeArcLengths) {
      if (len <= arcLength) completedHoleCount += 1;
      else break;
    }

    const maxGap = 38;
    const minGap = 2.5;
    const seamGap = maxGap - (maxGap - minGap) * Math.min(1, progress * 1.05);

    const cloth = buildClothPolygons(
      this.seam,
      this.width,
      this.height,
      seamGap,
    );

    return {
      seam: this.seam,
      holes: this.holes,
      grommetPairs: this.grommetPairs,
      visiblePath,
      visiblePathD: pointsToSvgPath(visiblePath),
      tip,
      progress,
      completedHoleCount,
      seamGap,
      cloth,
      corridorRadius: getCorridorRadius(this.width),
      debug: DEBUG_STITCHING,
      segments: this.segments,
      totalLength: this.totalLength,
      slack: this.physics.getSlack(),
      velocity: this.physics.velocity,
    };
  }

  /** Geometry without advancing physics (for rebuild / grommet draw). */
  peek(): StitchSnapshot {
    return this.snapshotAt(this.physics.current);
  }

  tick(now: number): StitchSnapshot {
    if (!this.lastTime) this.lastTime = now;
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    const progress = this.physics.step(dt);
    return this.snapshotAt(progress);
  }

  getHoleCount() {
    return this.holes.length;
  }
}
