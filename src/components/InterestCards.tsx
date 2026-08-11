"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { interests, type InterestId } from "@/data/experience";

const ART: Record<
  InterestId,
  { src: string; width: number; height: number }
> = {
  reading: {
    src: "/interests/book.svg",
    width: 168,
    height: 126,
  },
  liverpool: {
    src: "/interests/liverpool.png",
    width: 150,
    height: 150,
  },
  music: {
    src: "/interests/headphones.svg",
    width: 168,
    height: 126,
  },
};

function InterestArt({ id }: { id: InterestId }) {
  const art = ART[id];
  return (
    <div className={`interest-art interest-art--${id}`} aria-hidden>
      <img
        src={art.src}
        alt=""
        width={art.width}
        height={art.height}
        className="interest-art__img"
        decoding="async"
      />
      {id === "music" && (
        <div className="interest-art__notes">
          <span>♪</span>
          <span>♫</span>
          <span>♪</span>
        </div>
      )}
      {id === "reading" && (
        <div className="interest-art__sparks">
          <i />
          <i />
          <i />
        </div>
      )}
      {id === "liverpool" && <div className="interest-art__pulse" />}
    </div>
  );
}

/** Three interest cards with scroll-staggered entrances + hover particle animations. */
export function InterestCards({ onSelect }: { onSelect?: () => void }) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>(".interest-card"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <div className="interest-rail" ref={railRef}>
      <p className="interest-rail__label">INTERESTS</p>
      <ul className="interest-grid">
        {interests.map((item, i) => (
          <li
            key={item.id}
            className={`interest-card interest-card--${item.id}`}
            style={
              {
                ["--interest-accent"]: item.accent,
                ["--interest-delay"]: `${i * 140}ms`,
              } as CSSProperties
            }
            onClick={() => onSelect?.()}
          >
            <div className="interest-card__stage">
              <InterestArt id={item.id} />
            </div>
            <div className="interest-card__copy">
              <h3>{item.title}</h3>
              {item.detail ? <p>{item.detail}</p> : null}
            </div>
            <span className="interest-card__scan" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
