"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { experience } from "@/data/experience";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Visual timeline with scroll-scrubbed rail + GPU-friendly card reveals. */
export function ExperienceTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = root.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const total = rect.height + view;
      const traveled = view - rect.top;
      const p = Math.min(1, Math.max(0, traveled / total));
      setProgress(p);
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>("[data-xp-card]");
    if (reduced) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className="xp-stage"
      style={{ ["--xp-progress"]: progress.toFixed(4) } as CSSProperties}
    >
      <div className="xp-stage__deco" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <ol className="xp-timeline">
        {experience.map((entry, idx) => {
          const active = idx === 0;
          return (
            <li
              key={`${entry.company}-${entry.year}`}
              className={`xp-node${active ? " is-active" : ""}`}
              style={
                {
                  ["--xp-accent"]: entry.accent ?? "#92cc41",
                  ["--xp-i"]: idx,
                } as CSSProperties
              }
            >
              <div className="xp-node__rail" aria-hidden>
                <span className="xp-node__dot" />
                <span className="xp-node__year">{entry.year}</span>
              </div>

              <article className="xp-card" data-xp-card>
                <div className="xp-card__pixels" aria-hidden>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <header className="xp-card__head">
                  <div
                    className="xp-card__crest"
                    aria-hidden
                    style={{ background: entry.accent }}
                  >
                    <span className="xp-card__crest-glow" />
                    {entry.monogram ?? entry.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="xp-card__meta">
                    <div className="xp-card__title-row">
                      <h3 className="xp-card__company">{entry.company}</h3>
                      <span
                        className={`xp-card__badge${active ? " is-now" : ""}`}
                      >
                        {active ? "NOW" : "CLEAR"}
                      </span>
                    </div>
                    <p className="xp-card__role">{entry.title}</p>
                    <p className="xp-card__period">
                      {entry.period}
                      {entry.location ? ` · ${entry.location}` : ""}
                    </p>
                  </div>
                </header>

                {entry.focus && <p className="xp-card__focus">{entry.focus}</p>}

                {entry.stats && entry.stats.length > 0 && (
                  <div className="xp-stats" role="list">
                    {entry.stats.map((stat) => (
                      <div key={stat.label} className="xp-stat" role="listitem">
                        <span className="xp-stat__value">{stat.value}</span>
                        <span className="xp-stat__label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {entry.highlights && entry.highlights.length > 0 && (
                  <ul className="xp-lines">
                    {entry.highlights.map((h) => (
                      <li key={h}>
                        <span className="xp-lines__mark" aria-hidden>
                          ▸
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
