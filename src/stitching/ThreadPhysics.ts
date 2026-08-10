import { THREAD } from "./constants";
import { clamp } from "./math";

/**
 * Snappy critically-damped follow — tracks scroll closely
 * without the heavy spring lag that feels like stutter.
 */
export class ThreadPhysics {
  current = 0;
  velocity = 0;
  target = 0;

  constructor(
    /** Higher = snappier follow — pull-in stays glued to the tip */
    private follow = 28,
    private springK = THREAD.springK,
    private dampingC = THREAD.dampingC,
  ) {
    void this.springK;
    void this.dampingC;
  }

  setTarget(t: number) {
    this.target = clamp(t, 0, 1);
  }

  /** Advance simulation; dt in seconds */
  step(dt: number) {
    const clampedDt = Math.min(dt, 1 / 30);
    // Exponential ease toward target — buttery, no oscillation
    const a = 1 - Math.exp(-this.follow * clampedDt);
    const prev = this.current;
    this.current += (this.target - this.current) * a;
    this.current = clamp(this.current, 0, 1);
    this.velocity = clampedDt > 0 ? (this.current - prev) / clampedDt : 0;

    if (Math.abs(this.target - this.current) < 0.0004) {
      this.current = this.target;
      this.velocity = 0;
    }

    return this.current;
  }

  getSlack() {
    return Math.min(1, Math.abs(this.velocity) * 1.6);
  }

  reset(value = 0) {
    this.current = value;
    this.velocity = 0;
    this.target = value;
  }
}
