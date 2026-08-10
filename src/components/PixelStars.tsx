"use client";

import { useEffect, useRef } from "react";

/** Parallax starfield with shooting stars. */
export function PixelStars() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let mx = 0.5;
    let my = 0.5;
    type Star = { x: number; y: number; s: number; p: number; z: number };
    type Shot = { x: number; y: number; vx: number; vy: number; life: number };
    const stars: Star[] = [];
    const shots: Shot[] = [];
    let nextShot = performance.now() + 1800;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars.length = 0;
      const count = Math.floor((w * h) / 7000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          s: Math.random() > 0.82 ? 3 : 2,
          p: Math.random() * Math.PI * 2,
          z: 0.35 + Math.random() * 0.9,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / w - 0.5;
      my = e.clientY / h - 0.5;
    };

    const colors = ["#fcfcfc", "#92cc41", "#209cee", "#f7d51d", "#f06292"];

    const tick = (t: number) => {
      ctx.fillStyle = "#070712";
      ctx.fillRect(0, 0, w, h);

      // Soft nebula blobs
      for (let i = 0; i < 3; i++) {
        const nx = w * (0.2 + i * 0.3) + Math.sin(t * 0.0002 + i) * 40;
        const ny = h * (0.3 + (i % 2) * 0.25) + Math.cos(t * 0.00015 + i) * 30;
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, 180);
        g.addColorStop(0, i === 1 ? "rgba(32,156,238,0.08)" : "rgba(146,204,65,0.06)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(nx - 180, ny - 180, 360, 360);
      }

      const ox = mx * 28;
      const oy = my * 20;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.002 + star.p));
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = colors[i % colors.length];
        const sx = star.x + ox * star.z;
        const sy = star.y + oy * star.z;
        ctx.fillRect(sx, sy, star.s, star.s);
        star.y += (0.08 + star.z * 0.12) * (0.6 + (i % 3) * 0.2);
        if (star.y > h + 4) {
          star.y = -4;
          star.x = Math.random() * w;
        }
      }

      if (t > nextShot) {
        shots.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.4,
          vx: 4 + Math.random() * 5,
          vy: 1.5 + Math.random() * 2,
          life: 1,
        });
        nextShot = t + 1600 + Math.random() * 3200;
      }

      for (let i = shots.length - 1; i >= 0; i--) {
        const s = shots[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.016;
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.strokeStyle = "#f7d51d";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4);
        ctx.stroke();
        if (s.life <= 0) shots.splice(i, 1);
      }

      ctx.globalAlpha = 1;
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
  }, []);

  return <canvas ref={ref} className="pixel-stars" aria-hidden />;
}
