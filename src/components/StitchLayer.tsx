"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { AdaptiveQuality } from "@/stitching/AdaptiveQuality";
import {
  drawGrommet,
  drawJuteRope,
  drawLooseTip,
  drawSeamCrease,
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
  const scrollProgressRef = useRef(0);
  const reducedRef = useRef(reduced);
  const onProgressRef = useRef(onProgress);
  const lastEmittedProgress = useRef(-1);
  const debugEnabled = useRef(false);
  const pageSize = useRef({ w: 0, h: 0 });
  const grommetsDirty = useRef(true);
  const grommetLayer = useRef<HTMLCanvasElement | null>(null);

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

    // Offscreen grommet cache (static until rebuild)
    if (!grommetLayer.current) {
      grommetLayer.current = document.createElement("canvas");
    }
    const layer = grommetLayer.current;
    layer.width = Math.floor(w * dpr);
    layer.height = Math.floor(h * dpr);
    const lctx = layer.getContext("2d");
    if (lctx) {
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.clearRect(0, 0, w, h);
      const snap = engineRef.current.peek();
      for (const hole of snap.holes) {
        drawGrommet(lctx, hole, 1);
      }
    }
    grommetsDirty.current = false;
  }, []);

  useEffect(() => {
    rebuild();
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuild, 120);
    };
    window.addEventListener("resize", onResize);
    // One settle rebuild after layout/fonts — not continuous RO thrash
    const t = window.setTimeout(rebuild, 350);
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

        // Scroll drives stitch — start near empty so animation is obvious
        const target = reducedRef.current
          ? 1
          : scrollProgressRef.current * 0.92 + 0.02;
        engine.setScrollProgress(target);
        const snap = engine.tick(now);

        if (!skip) {
          const { w, h } = pageSize.current;
          ctx.clearRect(0, 0, w, h);

          drawSeamCrease(ctx, snap.seam, snap.seamGap);

          // Cached grommets under rope
          if (grommetLayer.current) {
            ctx.drawImage(grommetLayer.current, 0, 0, w, h);
          }

          if (snap.visiblePath.length > 1) {
            drawJuteRope(
              ctx,
              snap.visiblePath,
              THREAD.strokeWidth,
              snap.slack,
            );
          }

          if (snap.tip) {
            const path = snap.visiblePath;
            const a = path[path.length - 2];
            const b = path[path.length - 1];
            const tangent =
              a && b
                ? {
                    x: b.x - a.x,
                    y: b.y - a.y,
                  }
                : { x: 0, y: 1 };
            const mag = Math.hypot(tangent.x, tangent.y) || 1;
            drawLooseTip(ctx, snap.tip, THREAD.strokeWidth, {
              x: tangent.x / mag,
              y: tangent.y / mag,
            });
          }

          // Re-draw completed grommets on top of rope (metal over lace)
          for (let i = 0; i < snap.completedHoleCount; i++) {
            const hole = snap.holes[i];
            if (hole) drawGrommet(ctx, hole, 0.97);
          }

          // Settle content ~10fps — enough for feel, cheap
          if (
            contentRef.current &&
            Math.abs(snap.progress - lastSettle) > 0.02
          ) {
            lastSettle = snap.progress;
            const nodes = contentRef.current.querySelectorAll(
              "[data-stitch-content]",
            );
            nodes.forEach((node, i) => {
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

        if (fpsRef.current && debugEnabled.current) {
          fpsRef.current.textContent = `Q${qualityRef.current.level} ${(snap.progress * 100).toFixed(0)}% path ${snap.visiblePath.length}`;
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
