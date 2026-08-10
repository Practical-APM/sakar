"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import type { Project } from "@/types";

/** 3D-tilting cartridge with magnetic glow. */
export function Cartridge({
  project,
  color,
  index,
  onSelect,
  delay = 0,
}: {
  project: Project;
  color: string;
  index: number;
  onSelect: () => void;
  delay?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 14).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 16).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <a
      ref={ref}
      href={project.url ?? `/work/${project.slug}`}
      className={`cartridge cartridge--tilt${project.url ? " is-live" : ""}`}
      style={{
        ["--cart-color" as string]: color,
        ["--insert-delay" as string]: `${delay}ms`,
      }}
      onClick={onSelect}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...(project.url
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <span className="cartridge__shine" aria-hidden />
      <div className="cartridge__label">
        <span className="cartridge__stage">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="cartridge__name">{project.name.toUpperCase()}</h3>
        <p className="cartridge__thesis">{project.thesis}</p>
      </div>
      <p className="cartridge__meta">{project.role}</p>
    </a>
  );
}

export function useScreenTilt(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const root = document.documentElement;
    let mx = 0.5;
    let my = 0.5;
    let cx = 0.5;
    let cy = 0.5;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };

    const tick = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      root.style.setProperty("--px", cx.toFixed(4));
      root.style.setProperty("--py", cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);
}
