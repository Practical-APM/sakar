"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { AdaptiveQuality } from "@/stitching/AdaptiveQuality";
import {
  drawClothHalves,
  drawCord,
  drawGrommet,
  drawLooseTip,
} from "@/stitching/CanvasRenderer";
import { collectContentRects } from "@/stitching/CollisionSystem";
import { THREAD } from "@/stitching/constants";
import { StitchEngine } from "@/stitching/StitchEngine";
import { contentSettleOffset } from "@/stitching/ClothPhysics";
import { ClothBackground } from "./ClothBackground";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollPhysics } from "@/hooks/useScrollPhysics";

const LINEN_SRC = "/textures/linen-light.jpg";

type StitchLayerProps = {
  children: ReactNode;
  onProgress?: (progress: number) => void;
};

export function StitchLayer({ children, onProgress }: StitchLayerProps) {
  const reduced = useReducedMotion();
  const scrollProgress = useScrollPhysics();
  const engineRef = useRef<StitchEngine | null>(null);
  const qualityRef = useRef(new AdaptiveQuality());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const fpsRef = useRef<HTMLDivElement>(null);
  const linenRef = useRef<HTMLImageElement | null>(null);
  const patternCache = useRef<{ current: CanvasPattern | null }>({
    current: null,
  });
  const scrollProgressRef = useRef(scrollProgress);
  const reducedRef = useRef(reduced);
  const onProgressRef = useRef(onProgress);
  const lastEmittedProgress = useRef(-1);
  const debugEnabled = useRef(false);
  const pageSize = useRef({ w: 0, h: 0 });

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    debugEnabled.current =
      new URLSearchParams(window.location.search).get("debug") === "1";
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = LINEN_SRC;
    img.onload = () => {
      linenRef.current = img;
      patternCache.current.current = null;
    };
  }, []);

  const rebuild = useCallback(() => {
    const h = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    const w = window.innerWidth;
    pageSize.current = { w, h };

    if (!engineRef.current) engineRef.current = new StitchEngine();
    const rects = collectContentRects(contentRef.current ?? document);
    engineRef.current.rebuild({ width: w, height: h, contentRects: rects });

    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      patternCache.current.current = null;
    }
  }, []);

  useEffect(() => {
    rebuild();
    const onResize = () => rebuild();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => rebuild());
    if (contentRef.current) ro.observe(contentRef.current);
    const t = window.setTimeout(rebuild, 500);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, [rebuild]);

  useEffect(() => {
    let raf = 0;
    let frame = 0;

    const loop = (now: number) => {
      const engine = engineRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (engine && ctx && canvas) {
        const level = qualityRef.current.observe(now);
        const skip = level === 0 && frame % 2 === 1;
        frame += 1;

        const target = reducedRef.current
          ? 1
          : THREAD.initialProgress +
            scrollProgressRef.current * (1 - THREAD.initialProgress);
        engine.setScrollProgress(target);
        const snap = engine.tick(now);

        if (!skip) {
          const { w, h } = pageSize.current;
          ctx.clearRect(0, 0, w, h);

          const focusY = window.scrollY + window.innerHeight * 0.42;
          const tipY = snap.tip?.y ?? null;

          // Physical cloth split — photographic halves + void gap
          drawClothHalves(
            ctx,
            snap.seam,
            snap.seamGap,
            w,
            h,
            linenRef.current,
            patternCache.current,
          );

          // Grommets under cord; squeeze near tip
          for (const hole of snap.holes) {
            let squeeze = 1;
            if (tipY != null) {
              const d = Math.abs(hole.position.y - tipY);
              if (d < 50) {
                // Eyelet compresses as cord enters
                squeeze = 0.88 + (d / 50) * 0.12;
              }
            }
            if (hole.index < snap.completedHoleCount) {
              // Settled: slightly taut
              squeeze = Math.min(squeeze, 0.96);
            }
            drawGrommet(ctx, hole, focusY, squeeze);
          }

          if (snap.visiblePath.length > 1) {
            drawCord(
              ctx,
              snap.visiblePath,
              THREAD.strokeWidth,
              focusY,
              snap.slack,
            );
          }

          if (snap.tip) {
            drawLooseTip(ctx, snap.tip, THREAD.strokeWidth);
          }

          // Flanges over cord where already laced
          for (let i = 0; i < snap.completedHoleCount; i++) {
            const hole = snap.holes[i];
            if (hole) drawGrommet(ctx, hole, focusY, 0.96);
          }

          // Content settle — no layout reads; spring from stitch progress
          if (contentRef.current) {
            const nodes = contentRef.current.querySelectorAll(
              "[data-stitch-content]",
            );
            nodes.forEach((node, i) => {
              const el = node as HTMLElement;
              const sideAttr = el.dataset.side as "left" | "right" | undefined;
              const side =
                sideAttr ?? (i % 2 === 0 ? "left" : "right");
              const { x, rotate } = contentSettleOffset(
                snap.progress,
                side,
                i,
              );
              el.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0) rotate(${rotate.toFixed(3)}deg)`;
            });
          }

          if (debugEnabled.current) {
            ctx.strokeStyle = "magenta";
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            if (snap.seam.length) {
              ctx.moveTo(snap.seam[0].x, snap.seam[0].y);
              for (let i = 1; i < snap.seam.length; i++) {
                ctx.lineTo(snap.seam[i].x, snap.seam[i].y);
              }
            }
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        if (rootRef.current) {
          rootRef.current.style.setProperty(
            "--stitch-progress",
            String(snap.progress),
          );
          rootRef.current.style.setProperty(
            "--seam-gap",
            `${snap.seamGap.toFixed(1)}px`,
          );
        }

        if (fpsRef.current && debugEnabled.current) {
          fpsRef.current.textContent = `Q${qualityRef.current.level} · ${(snap.progress * 100).toFixed(0)}% · gap ${snap.seamGap.toFixed(0)} · slack ${snap.slack.toFixed(2)}`;
        }

        if (
          onProgressRef.current &&
          Math.abs(snap.progress - lastEmittedProgress.current) > 0.01
        ) {
          lastEmittedProgress.current = snap.progress;
          onProgressRef.current(snap.progress);
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={rootRef} className="stitch-root">
      <ClothBackground />
      <canvas ref={canvasRef} className="stitch-canvas" aria-hidden />
      <div ref={fpsRef} className="stitch-debug-hud" aria-hidden />
      <div ref={contentRef} className="stitch-content">
        {children}
      </div>
    </div>
  );
}
