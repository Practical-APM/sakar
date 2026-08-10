"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { seamXAtY } from "@/stitching/SeamGenerator";
import type { SeamPoint } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Optimized plate (~1400px / ~420KB) */
const LINEN_SRC = "/textures/linen-hero.jpg";

export type ClothBackgroundHandle = {
  /** Force-sync left/right sheet clips to the live seam (viewport space). */
  syncSeam: (seam: SeamPoint[], scrollY: number) => void;
  /** Throttled follow — safe from the stitch rAF loop. */
  followSeam: (seam: SeamPoint[], scrollY: number) => void;
};

function buildSheetClips(
  seam: SeamPoint[],
  scrollY: number,
  viewW: number,
  viewH: number,
  /** Leave a hairline for the canvas void between sheets */
  inset = 1.25,
) {
  const n = 36;
  const leftEdge: string[] = [];
  const rightEdge: string[] = [];
  for (let i = 0; i <= n; i++) {
    const y = (i / n) * viewH;
    const sx = seamXAtY(seam, scrollY + y);
    leftEdge.push(`${(sx - inset).toFixed(1)}px ${y.toFixed(1)}px`);
    rightEdge.push(`${(sx + inset).toFixed(1)}px ${y.toFixed(1)}px`);
  }
  const left = `polygon(0px 0px, ${leftEdge.join(", ")}, 0px ${viewH.toFixed(1)}px)`;
  const right = `polygon(${rightEdge.join(", ")}, ${viewW.toFixed(1)}px ${viewH.toFixed(1)}px, ${viewW.toFixed(1)}px 0px)`;
  return { left, right };
}

/**
 * Two living linen sheets split by the seam — independent creases,
 * breath, and drift so the tear reads as two cloth pieces, not paper.
 */
export const ClothBackground = forwardRef<ClothBackgroundHandle>(
  function ClothBackground(_props, ref) {
    const reduced = useReducedMotion();
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const leftWeaveRef = useRef<HTMLDivElement>(null);
    const rightWeaveRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const pointerRef = useRef({ x: 0.5, y: 0.35 });
    const targetPointer = useRef({ x: 0.5, y: 0.35 });
    const rafRef = useRef(0);
    const lastScrollBucket = useRef(-999);

    useEffect(() => {
      document.documentElement.style.setProperty(
        "--linen-url",
        `url(${LINEN_SRC})`,
      );
    }, []);

    const applyClips = useCallback((seam: SeamPoint[], scrollY: number) => {
      if (!seam.length || !leftRef.current || !rightRef.current) return;
      const viewW = window.innerWidth;
      const viewH = window.innerHeight;
      const { left, right } = buildSheetClips(seam, scrollY, viewW, viewH);
      leftRef.current.style.clipPath = left;
      rightRef.current.style.clipPath = right;
    }, []);

    const followSeam = useCallback(
      (seam: SeamPoint[], scrollY: number) => {
        const bucket = (scrollY / 1.5) | 0;
        if (bucket === lastScrollBucket.current) return;
        lastScrollBucket.current = bucket;
        applyClips(seam, scrollY);
      },
      [applyClips],
    );

    useImperativeHandle(ref, () => ({
      syncSeam: (seam, scrollY) => {
        lastScrollBucket.current = -999;
        applyClips(seam, scrollY);
      },
      followSeam,
    }));

    // Independent breath + pointer lean per sheet
    useEffect(() => {
      if (reduced) return;

      const onMove = (e: PointerEvent) => {
        targetPointer.current = {
          x: e.clientX / Math.max(1, window.innerWidth),
          y: e.clientY / Math.max(1, window.innerHeight),
        };
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const tick = (now: number) => {
        const p = pointerRef.current;
        const t = targetPointer.current;
        p.x += (t.x - p.x) * 0.06;
        p.y += (t.y - p.y) * 0.06;

        const tSec = now * 0.001;
        // Different frequencies so the two sheets never move in sync
        const lBreath = Math.sin(tSec * 0.55) * 0.5 + Math.sin(tSec * 0.23) * 0.5;
        const rBreath = Math.sin(tSec * 0.41 + 1.2) * 0.5 + Math.sin(tSec * 0.17 + 0.4) * 0.5;

        const lx = (p.x - 0.5) * -10 + lBreath * 5;
        const ly = (p.y - 0.5) * 6 + lBreath * 3.5;
        const lRot = (p.x - 0.5) * -1.6 + lBreath * 0.55;
        const lSkew = (p.y - 0.5) * 0.35 + lBreath * 0.2;

        const rx = (p.x - 0.5) * 14 + rBreath * -6;
        const ry = (p.y - 0.5) * -5 + rBreath * 4;
        const rRot = (p.x - 0.5) * 2.0 + rBreath * -0.65;
        const rSkew = (p.y - 0.5) * -0.4 + rBreath * 0.25;

        if (leftWeaveRef.current) {
          leftWeaveRef.current.style.transform = `translate3d(${lx.toFixed(2)}px, ${ly.toFixed(2)}px, 0) rotate(${lRot.toFixed(3)}deg) skewX(${lSkew.toFixed(3)}deg)`;
        }
        if (rightWeaveRef.current) {
          rightWeaveRef.current.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0) rotate(${rRot.toFixed(3)}deg) skewX(${rSkew.toFixed(3)}deg)`;
        }

        const root = rootRef.current;
        if (root) {
          root.style.setProperty("--cloth-mx", p.x.toFixed(4));
          root.style.setProperty("--cloth-my", p.y.toFixed(4));
          root.style.setProperty("--cloth-left-breath", lBreath.toFixed(4));
          root.style.setProperty("--cloth-right-breath", rBreath.toFixed(4));
        }

        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);

      return () => {
        window.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(rafRef.current);
      };
    }, [reduced]);

    return (
      <div
        ref={rootRef}
        className={`cloth-stage${reduced ? " cloth-stage--static" : ""}`}
        aria-hidden
      >
        <div ref={leftRef} className="cloth-sheet cloth-sheet--left">
          <div ref={leftWeaveRef} className="cloth-sheet__weave" />
          <div className="cloth-sheet__creases" />
          <div className="cloth-sheet__lip" />
        </div>
        <div ref={rightRef} className="cloth-sheet cloth-sheet--right">
          <div ref={rightWeaveRef} className="cloth-sheet__weave" />
          <div className="cloth-sheet__creases" />
          <div className="cloth-sheet__lip" />
        </div>
        <div className="cloth-lighting" />
        <div className="cloth-grain" />
      </div>
    );
  },
);
