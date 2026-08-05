"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { AdaptiveQuality } from "@/stitching/AdaptiveQuality";
import {
  drawClothSplit,
  drawGrommet,
  drawJuteRope,
  drawLooseTip,
} from "@/stitching/CanvasRenderer";
import { collectContentRects } from "@/stitching/CollisionSystem";
import { THREAD } from "@/stitching/constants";
import { StitchEngine } from "@/stitching/StitchEngine";
import { contentSettleOffset } from "@/stitching/ClothPhysics";
import { ClothBackground } from "./ClothBackground";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollPhysics } from "@/hooks/useScrollPhysics";

type StitchLayerProps = {
  children: ReactNode;
  onProgress?: (progress: number) => void;
  /** 0–1 from spool handoff so page rope continues the loading thread */
  handoffProgress?: number;
};

export function StitchLayer({
  children,
  onProgress,
  handoffProgress = 0,
}: StitchLayerProps) {
  const reduced = useReducedMotion();
  const scrollProgress = useScrollPhysics();
  const engineRef = useRef<StitchEngine | null>(null);
  const qualityRef = useRef(new AdaptiveQuality());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const fpsRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const handoffRef = useRef(handoffProgress);
  const reducedRef = useRef(reduced);
  const onProgressRef = useRef(onProgress);
  const lastEmittedProgress = useRef(-1);
  const debugEnabled = useRef(false);
  const pageSize = useRef({ w: 0, h: 0 });

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    handoffRef.current = handoffProgress;
  }, [handoffProgress]);

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

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  useEffect(() => {
    rebuild();
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuild, 120);
    };
    window.addEventListener("resize", onResize);
    const t = window.setTimeout(rebuild, 400);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
      window.clearTimeout(resizeTimer);
    };
  }, [rebuild]);

  useEffect(() => {
    let raf = 0;
    let frame = 0;
    let lastSettle = -1;

    const loop = (now: number) => {
      const engine = engineRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { alpha: true });

      if (engine && ctx && canvas) {
        const level = qualityRef.current.observe(now);
        const skip = level === 0 && frame % 2 === 1;
        frame += 1;

        // Combine spool handoff + scroll into stitch progress
        const scrollT = scrollProgressRef.current * 0.9;
        const handoffT = handoffRef.current * 0.08;
        const target = reducedRef.current
          ? 1
          : Math.min(1, 0.015 + handoffT + scrollT);
        engine.setScrollProgress(target);
        const snap = engine.tick(now);

        if (!skip) {
          const { w, h } = pageSize.current;
          ctx.clearRect(0, 0, w, h);

          drawClothSplit(
            ctx,
            snap.seam,
            snap.seamGap,
            h,
            snap.gapProfile,
          );

          // Rivets under rope (with local pull-in already in positions)
          for (const hole of snap.holes) {
            let squeeze = 1;
            if (snap.tip) {
              const d = Math.hypot(
                hole.position.x - snap.tip.x,
                hole.position.y - snap.tip.y,
              );
              if (d < 40) squeeze = 0.9 + (d / 40) * 0.1;
            }
            drawGrommet(ctx, hole, squeeze);
          }

          drawJuteRope(
            ctx,
            snap.visibleRuns,
            THREAD.strokeWidth,
            snap.slack,
          );

          if (snap.tip && !snap.tip.occluded) {
            const runs = snap.visibleRuns;
            const lastRun = runs[runs.length - 1];
            let tangent = { x: 0, y: 1 };
            if (lastRun && lastRun.length >= 2) {
              const a = lastRun[lastRun.length - 2];
              const b = lastRun[lastRun.length - 1];
              const mag = Math.hypot(b.x - a.x, b.y - a.y) || 1;
              tangent = { x: (b.x - a.x) / mag, y: (b.y - a.y) / mag };
            }
            drawLooseTip(ctx, snap.tip, THREAD.strokeWidth, tangent);
          }

          // Rivets over rope where already laced (flange on top of cord)
          for (let i = 0; i < snap.completedHoleCount; i++) {
            const hole = snap.holes[i];
            if (hole) drawGrommet(ctx, hole, 0.96);
          }

          if (
            contentRef.current &&
            Math.abs(snap.progress - lastSettle) > 0.02
          ) {
            lastSettle = snap.progress;
            contentRef.current
              .querySelectorAll("[data-stitch-content]")
              .forEach((node, i) => {
                const el = node as HTMLElement;
                const side =
                  (el.dataset.side as "left" | "right" | undefined) ??
                  (i % 2 === 0 ? "left" : "right");
                const { x, rotate } = contentSettleOffset(
                  snap.progress,
                  side,
                  i,
                );
                el.style.transform = `translate3d(${x.toFixed(1)}px,0,0) rotate(${rotate.toFixed(2)}deg)`;
              });
          }
        }

        if (rootRef.current) {
          rootRef.current.style.setProperty(
            "--stitch-progress",
            String(snap.progress),
          );
        }

        if (
          onProgressRef.current &&
          Math.abs(snap.progress - lastEmittedProgress.current) > 0.015
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
