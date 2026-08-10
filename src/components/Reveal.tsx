"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Scroll-triggered reveal — transform/opacity only for 60fps. */
export function Reveal({
  children,
  className = "",
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  /** rise = default lift-in; punch = bigger pop for hero zones */
  variant?: "rise" | "punch";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.classList.add("is-revealed");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-revealed");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
