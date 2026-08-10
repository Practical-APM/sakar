"use client";

import { useEffect, useRef } from "react";

/** Burst of pixel sparks from a point (PRESS START). */
export function SparkBurst({
  trigger,
  x,
  y,
}: {
  trigger: number;
  x: number;
  y: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!trigger) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = ["#f7d51d", "#92cc41", "#209cee", "#f06292", "#e76e55"];
    const parts = Array.from({ length: 48 }, () => {
      const a = Math.random() * Math.PI * 2;
      const sp = 2 + Math.random() * 7;
      return {
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        life: 1,
        c: colors[(Math.random() * colors.length) | 0],
        s: 2 + ((Math.random() * 3) | 0),
      };
    });

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      let alive = false;
      for (const p of parts) {
        if (p.life <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.life -= 0.018;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      ctx.globalAlpha = 1;
      if (alive) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, x, y]);

  return <canvas ref={ref} className="spark-burst" aria-hidden />;
}
