"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { usePointerField } from "@/hooks/usePointerField";

const LINEN_SRC = "/textures/linen-light.jpg";

/**
 * Under-cloth void (shows through the open seam) + living light + film grain.
 * The visible fabric halves are painted on the stitch canvas.
 */
export function ClothBackground() {
  const lightRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
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
    document.documentElement.dataset.clothTheme = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const img = ctx.createImageData(Math.floor(w), Math.floor(h));
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const n = (Math.random() * 255) | 0;
        data[i] = n;
        data[i + 1] = n;
        data[i + 2] = n;
        data[i + 3] = 16;
      }
      ctx.putImageData(img, 0, 0);
    };

    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, []);

  useEffect(() => {
    const canvas = lightRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const px = pointerRef.current.x * w;
      const py = pointerRef.current.y * h;

      const warm = ctx.createRadialGradient(px, py, 0, px, py, 440);
      warm.addColorStop(0, "rgba(255, 248, 230, 0.22)");
      warm.addColorStop(0.45, "rgba(255, 245, 220, 0.06)");
      warm.addColorStop(1, "rgba(255, 245, 220, 0)");
      ctx.fillStyle = warm;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(paint);
    };

    resize();
    paint();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="cloth-void" aria-hidden />
      <canvas ref={lightRef} className="cloth-canvas cloth-canvas--light" aria-hidden />
      <canvas ref={grainRef} className="cloth-canvas cloth-canvas--grain" aria-hidden />
    </>
  );
}
