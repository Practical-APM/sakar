"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { AdaptiveQuality } from "@/stitching/AdaptiveQuality";
import {
  drawBehindRope,
  drawClothSplit,
  drawGrommet,
  drawJuteRope,
  drawLooseTip,
} from "@/stitching/CanvasRenderer";
import { collectContentRects } from "@/stitching/CollisionSystem";
import { THREAD } from "@/stitching/constants";
import { clearGrommetCache } from "@/stitching/GrommetAtlas";
import { StitchEngine } from "@/stitching/StitchEngine";
import { contentSettleOffset } from "@/stitching/ClothPhysics";
import { ClothBackground, type ClothBackgroundHandle } from "./ClothBackground";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type StitchLayerProps = {
  children: ReactNode;
  onProgress?: (progress: number) => void;
  handoffProgress?: number;
};

const VIEW_PAD = 100;

export function StitchLayer({
  children,
  onProgress,
  handoffProgress = 0,
}: StitchLayerProps) {
  const reduced = useReducedMotion();
  const engineRef = useRef<StitchEngine | null>(null);
  const qualityRef = useRef(new AdaptiveQuality());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const clothRef = useRef<ClothBackgroundHandle>(null);
  const fpsRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef(handoffProgress);
  const reducedRef = useRef(reduced);
  const onProgressRef = useRef(onProgress);
  const lastEmittedProgress = useRef(-1);
  const debugEnabled = useRef(false);
  const pageSize = useRef({ w: 0, h: 0 });
  const dprRef = useRef(1);
  const settleNodes = useRef<HTMLElement[]>([]);
  const settleYs = useRef<number[]>([]);
  const lastSettleLaceY = useRef(Number.NaN);

  const refreshSettleNodes = useCallback(() => {
    if (!contentRef.current) return;
    const nodes = Array.from(
      contentRef.current.querySelectorAll<HTMLElement>("[data-stitch-content]"),
    );
    settleNodes.current = nodes;
    const scrollY = window.scrollY || 0;
    // Measure resting positions (ignore current pull transforms)
    settleYs.current = nodes.map((el) => {
      const px = el.style.getPropertyValue("--pull-x");
      const py = el.style.getPropertyValue("--pull-y");
      const pr = el.style.getPropertyValue("--pull-r");
      el.style.setProperty("--pull-x", "0px");
      el.style.setProperty("--pull-y", "0px");
      el.style.setProperty("--pull-r", "0deg");
      const r = el.getBoundingClientRect();
      const y = r.top + scrollY + r.height * 0.4;
      if (px) el.style.setProperty("--pull-x", px);
      else el.style.removeProperty("--pull-x");
      if (py) el.style.setProperty("--pull-y", py);
      else el.style.removeProperty("--pull-y");
      if (pr) el.style.setProperty("--pull-r", pr);
      else el.style.removeProperty("--pull-r");
      return y;
    });
    lastSettleLaceY.current = Number.NaN;
  }, []);

  const applySettle = useCallback(
    (progress: number, laceY: number) => {
      if (!settleNodes.current.length) refreshSettleNodes();
      settleNodes.current.forEach((el, i) => {
        const side =
          (el.dataset.side as "left" | "right" | undefined) ??
          (i % 2 === 0 ? "left" : "right");
        const { x, y, rotate } = contentSettleOffset(
          progress,
          side,
          i,
          settleYs.current[i],
          laceY,
        );
        el.style.setProperty("--pull-x", `${x.toFixed(1)}px`);
        el.style.setProperty("--pull-y", `${y.toFixed(1)}px`);
        el.style.setProperty("--pull-r", `${rotate.toFixed(2)}deg`);
      });
    },
    [refreshSettleNodes],
  );
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

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const level = qualityRef.current.level;
    // Drop pixel density under load — biggest free FPS win
    const dprCap = level === 0 ? 1 : level === 1 ? 1.25 : 1.5;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    dprRef.current = dpr;
    const bw = Math.floor(w * dpr);
    const bh = Math.floor(h * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctxRef.current = canvas.getContext("2d", {
        alpha: true,
        desynchronized: true,
      });
      if (ctxRef.current) {
        ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }
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
    clearGrommetCache();
    sizeCanvas();
    refreshSettleNodes();
    const snap = engineRef.current.peek();
    clothRef.current?.syncSeam(snap.seam, window.scrollY || 0);
  }, [sizeCanvas, refreshSettleNodes]);

  useEffect(() => {
    rebuild();
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuild, 140);
    };
    window.addEventListener("resize", onResize);
    // Content mounts after loading screen — refresh settle targets
    const t1 = window.setTimeout(rebuild, 350);
    const t2 = window.setTimeout(refreshSettleNodes, 800);
    const t3 = window.setTimeout(refreshSettleNodes, 1600);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(resizeTimer);
    };
  }, [rebuild, refreshSettleNodes]);

  useEffect(() => {
    let raf = 0;
    let frame = 0;
    let lastScrollY = -1;
    let needsDraw = true;

    const markDirty = () => {
      needsDraw = true;
    };
    window.addEventListener("scroll", markDirty, { passive: true });

    const loop = (now: number) => {
      const engine = engineRef.current;
      const canvas = canvasRef.current;
      if (!ctxRef.current && canvas) {
        ctxRef.current = canvas.getContext("2d", {
          alpha: true,
          desynchronized: true,
        });
      }
      const ctx = ctxRef.current;

      if (engine && ctx && canvas) {
        const level = qualityRef.current.observe(now);
        const skipPaint = level === 0 && frame % 2 === 1;
        frame += 1;

        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        const scrollY = window.scrollY || 0;
        const scrollT = Math.min(1, Math.max(0, scrollY / maxScroll));

        const handoffT = handoffRef.current * 0.1;
        const target = reducedRef.current
          ? 1
          : Math.min(1, THREAD.initialProgress + handoffT + scrollT * 0.92);
        engine.setScrollProgress(target);
        const snap = engine.tick(now);

        const moving =
          Math.abs(snap.velocity) > 0.0005 ||
          Math.abs(scrollY - lastScrollY) > 0.25;
        if (moving) needsDraw = true;
        lastScrollY = scrollY;

        // Keep the two cloth sheets clipped to the living seam
        clothRef.current?.followSeam(snap.seam, scrollY);

        // How far down the page the lace has actually reached
        let laceY = 0;
        for (const run of snap.visibleRuns) {
          for (const p of run) if (p.y > laceY) laceY = p.y;
        }
        for (const run of snap.backRuns) {
          for (const p of run) if (p.y > laceY) laceY = p.y;
        }
        if (snap.tip && snap.tip.y > laceY) laceY = snap.tip.y;
        for (let i = 0; i < snap.completedHoleCount; i++) {
          const h = snap.holes[i];
          if (h && h.position.y > laceY) laceY = h.position.y;
        }
        if (laceY <= 0) {
          laceY = snap.progress * Math.max(pageSize.current.h, 1);
        }

        // Always drive settle while scrolling / stitching; cheap CSS vars
        if (
          Number.isNaN(lastSettleLaceY.current) ||
          Math.abs(laceY - lastSettleLaceY.current) > 0.25 ||
          moving
        ) {
          lastSettleLaceY.current = laceY;
          applySettle(snap.progress, laceY);
        }

        if (needsDraw && !skipPaint) {
          needsDraw = Math.abs(snap.velocity) > 0.0008;

          sizeCanvas();
          const dpr = dprRef.current;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

          const viewW = window.innerWidth;
          const viewH = window.innerHeight;
          ctx.clearRect(0, 0, viewW, viewH);

          ctx.save();
          ctx.translate(0, -scrollY);

          const viewTop = scrollY - VIEW_PAD;
          const viewBottom = scrollY + viewH + VIEW_PAD;

          drawClothSplit(
            ctx,
            snap.seam,
            snap.seamGap,
            pageSize.current.h,
            snap.gapProfile,
            level,
            viewTop,
            viewBottom,
          );

          const backRuns = snap.backRuns.filter((run) =>
            run.some((p) => p.y >= viewTop && p.y <= viewBottom),
          );
          drawBehindRope(ctx, backRuns, THREAD.strokeWidth, level);

          for (const hole of snap.holes) {
            const y = hole.position.y;
            if (y < viewTop || y > viewBottom) continue;
            drawGrommet(ctx, hole, 1, level);
          }

          const frontRuns = snap.visibleRuns.filter((run) =>
            run.some((p) => p.y >= viewTop && p.y <= viewBottom),
          );

          drawJuteRope(
            ctx,
            frontRuns,
            THREAD.strokeWidth,
            snap.slack,
            level,
          );

          if (
            snap.tip &&
            !snap.tip.occluded &&
            snap.tip.y >= viewTop &&
            snap.tip.y <= viewBottom
          ) {
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

          for (let i = 0; i < snap.completedHoleCount; i++) {
            const hole = snap.holes[i];
            if (!hole) continue;
            if (hole.position.y < viewTop || hole.position.y > viewBottom) {
              continue;
            }
            drawGrommet(ctx, hole, 0.96, level);
          }

          ctx.restore();

          if (debugEnabled.current && fpsRef.current) {
            fpsRef.current.textContent = `q${level} · ${(snap.progress * 100).toFixed(0)}%`;
            fpsRef.current.style.display = "block";
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
          Math.abs(snap.progress - lastEmittedProgress.current) > 0.02
        ) {
          lastEmittedProgress.current = snap.progress;
          onProgressRef.current(snap.progress);
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", markDirty);
    };
  }, [sizeCanvas, applySettle]);

  return (
    <div ref={rootRef} className="stitch-root">
      <ClothBackground ref={clothRef} />
      <canvas ref={canvasRef} className="stitch-canvas" aria-hidden />
      <div ref={fpsRef} className="stitch-debug-hud" aria-hidden />
      <div ref={contentRef} className="stitch-content">
        {children}
      </div>
    </div>
  );
}
