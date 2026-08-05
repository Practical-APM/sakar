/**
 * Adaptive quality ladder for the stitch renderer.
 * Drops detail when rolling FPS falls below threshold.
 */
export class AdaptiveQuality {
  private samples: number[] = [];
  private last = 0;
  level: 0 | 1 | 2 = 2; // 2 high, 1 mid, 0 low

  observe(now: number) {
    if (!this.last) {
      this.last = now;
      return this.level;
    }
    const dt = now - this.last;
    this.last = now;
    if (dt <= 0) return this.level;
    const fps = 1000 / dt;
    this.samples.push(fps);
    if (this.samples.length > 45) this.samples.shift();

    if (this.samples.length < 20) return this.level;

    const avg =
      this.samples.reduce((a, b) => a + b, 0) / this.samples.length;

    if (avg < 52 && this.level > 0) {
      this.level = (this.level - 1) as 0 | 1 | 2;
      this.samples = [];
    } else if (avg > 58 && this.level < 2) {
      this.level = (this.level + 1) as 0 | 1 | 2;
      this.samples = [];
    }

    return this.level;
  }

  get threadSubdivision() {
    return [4, 6, 8][this.level];
  }

  get shadowEnabled() {
    return this.level >= 1;
  }
}
