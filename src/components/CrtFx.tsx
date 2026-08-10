"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight CRT overlay — bloom + scan + sparse noise.
 * Frame-skips on small screens to stay near 60fps.
 */
export function CrtFx({ active = true }: { active?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let mx = 0.5;
    let my = 0.5;
    let frame = 0;
    let glitchUntil = 0;
    let nextGlitch = performance.now() + 3200;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 720px)").matches;
    if (reduce) return;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.25);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / Math.max(w, 1);
      my = e.clientY / Math.max(h, 1);
    };

    const tick = (t: number) => {
      frame += 1;
      const skip = mobile ? 2 : 1;
      if (frame % skip !== 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const bloom = ctx.createRadialGradient(
        mx * w,
        my * h,
        0,
        mx * w,
        my * h,
        Math.max(w, h) * 0.4,
      );
      bloom.addColorStop(0, "rgba(80, 255, 140, 0.06)");
      bloom.addColorStop(0.5, "rgba(40, 180, 255, 0.025)");
      bloom.addColorStop(1, "transparent");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);

      const y = ((t * 0.08) % (h + 120)) - 60;
      const bar = ctx.createLinearGradient(0, y, 0, y + 40);
      bar.addColorStop(0, "transparent");
      bar.addColorStop(0.5, "rgba(180, 255, 200, 0.055)");
      bar.addColorStop(1, "transparent");
      ctx.fillStyle = bar;
      ctx.fillRect(0, y, w, 40);

      const noiseCount = mobile ? 28 : 55;
      for (let i = 0; i < noiseCount; i++) {
        ctx.fillStyle = `rgba(200,255,210,${Math.random() * 0.05})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 2, 1);
      }

      if (t > nextGlitch) {
        glitchUntil = t + 70;
        nextGlitch = t + 2800 + Math.random() * 4200;
      }
      if (t < glitchUntil) {
        const by = Math.random() * h;
        ctx.fillStyle = "rgba(120,220,255,0.08)";
        ctx.fillRect(0, by, w, 6 + Math.random() * 10);
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [active]);

  return <canvas ref={ref} className="crt-fx" aria-hidden />;
}
