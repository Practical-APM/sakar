import { THREAD } from "./constants";
import { clamp } from "./math";

export class ThreadPhysics {
  current = 0;
  velocity = 0;
  target = 0;

  constructor(
    private springK = THREAD.springK,
    private dampingC = THREAD.dampingC,
  ) {}

  setTarget(t: number) {
    this.target = clamp(t, 0, 1);
  }

  /** Advance simulation; dt in seconds */
  step(dt: number) {
    const clampedDt = Math.min(dt, 1 / 30);
    const force =
      this.springK * (this.target - this.current) -
      this.dampingC * this.velocity;
    this.velocity += force * clampedDt;
    this.current += this.velocity * clampedDt;
    this.current = clamp(this.current, 0, 1);

    if (
      Math.abs(this.target - this.current) < 0.0005 &&
      Math.abs(this.velocity) < 0.001
    ) {
      this.current = this.target;
      this.velocity = 0;
    }

    return this.current;
  }

  /** Absolute slack energy from recent motion */
  getSlack() {
    return Math.min(1, Math.abs(this.velocity) * 2.2);
  }

  reset(value = 0) {
    this.current = value;
    this.velocity = 0;
    this.target = value;
  }
}
