"use client";

import { useEffect, useRef } from "react";
import { usePointerField } from "@/hooks/usePointerField";

const LINEN_SRC = "/textures/linen-light.jpg";

/**
 * Photographic linen via CSS (instant) + light pointer glow.
 * No per-pixel grain generation — that was freezing load.
 */
export function ClothBackground() {
  const lightRef = useRef<HTMLCanvasElement>(null);
  const pointer = usePointerField();
  const pointerRef = useRef(pointer);

  useEffect(() => {
    pointerRef.current = pointer;
  }, [pointer]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--linen-url",
      `url(${LINEN_SRC})`,
    );
  }, []);

  useEffect(() => {
    const canvas = lightRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = (now: number) => {
      // Cap light layer ~30fps
      if (now - last < 32) {
        raf = requestAnimationFrame(paint);
        return;
      }
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const px = pointerRef.current.x * w;
      const py = pointerRef.current.y * h;
      const warm = ctx.createRadialGradient(px, py, 0, px, py, 360);
      warm.addColorStop(0, "rgba(255, 248, 230, 0.18)");
      warm.addColorStop(0.5, "rgba(255, 245, 220, 0.05)");
      warm.addColorStop(1, "rgba(255, 245, 220, 0)");
      ctx.fillStyle = warm;
      ctx.fillRect(0, 0, w, h);
      raf = requestAnimationFrame(paint);
    };

    resize();
    raf = requestAnimationFrame(paint);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="cloth-photo" aria-hidden />
      <div className="cloth-grain" aria-hidden />
      <canvas ref={lightRef} className="cloth-canvas cloth-canvas--light" aria-hidden />
    </>
  );
}
