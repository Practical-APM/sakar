"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "off" | "line" | "expand" | "flash" | "noise" | "fade" | "done";

/**
 * CRT TV cold start: black → bright line → tube expand → B&W snow → fade to page.
 */
export function PowerOn({
  onNoise,
  onDone,
}: {
  /** Fire when snow starts — mount the page underneath. */
  onNoise?: () => void;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("off");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const done = useRef(onDone);
  const noiseCb = useRef(onNoise);
  done.current = onDone;
  noiseCb.current = onNoise;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      noiseCb.current?.();
      done.current();
      return;
    }

    const timers = [
      window.setTimeout(() => setPhase("line"), 200),
      window.setTimeout(() => setPhase("expand"), 780),
      window.setTimeout(() => setPhase("flash"), 1280),
      window.setTimeout(() => {
        setPhase("noise");
        noiseCb.current?.();
      }, 1500),
      window.setTimeout(() => setPhase("fade"), 3000),
      window.setTimeout(() => {
        setPhase("done");
        done.current();
      }, 3900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "noise" && phase !== "fade") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let nw = 0;
    let nh = 0;
    const buffer = document.createElement("canvas");
    const bctx = buffer.getContext("2d", { alpha: false });
    if (!bctx) return;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nw = Math.max(160, Math.floor(w / 4));
      nh = Math.max(90, Math.floor(h / 4));
      buffer.width = nw;
      buffer.height = nh;
    };

    const tick = () => {
      const img = bctx.createImageData(nw, nh);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() > 0.48 ? 245 : 12;
        const jitter = (Math.random() * 30) | 0;
        const c = Math.min(
          255,
          Math.max(0, v + (Math.random() > 0.5 ? jitter : -jitter)),
        );
        data[i] = c;
        data[i + 1] = c;
        data[i + 2] = c;
        data[i + 3] = 255;
      }
      bctx.putImageData(img, 0, 0);

      if (Math.random() > 0.65) {
        const ty = (Math.random() * nh) | 0;
        const th = 1 + ((Math.random() * 5) | 0);
        const shift = ((Math.random() - 0.5) * 28) | 0;
        const slice = bctx.getImageData(0, ty, nw, th);
        bctx.clearRect(0, ty, nw, th);
        bctx.putImageData(slice, shift, ty);
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(buffer, 0, 0, w, h);

      const bandY = ((performance.now() * 0.22) % (h + 80)) - 40;
      const band = ctx.createLinearGradient(0, bandY, 0, bandY + 40);
      band.addColorStop(0, "transparent");
      band.addColorStop(0.5, "rgba(255,255,255,0.2)");
      band.addColorStop(1, "transparent");
      ctx.fillStyle = band;
      ctx.fillRect(0, bandY, w, 40);

      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className={`power-on power-on--${phase}`} aria-hidden>
      <div className="power-on__tube">
        <div className="power-on__line" />
      </div>
      {(phase === "noise" || phase === "fade") && (
        <canvas ref={canvasRef} className="power-on__static" />
      )}
      {phase === "noise" && <p className="power-on__caption">NO SIGNAL</p>}
    </div>
  );
}
