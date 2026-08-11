"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** True when node is inside a finished Reveal (or no Reveal ancestor). */
function revealReady(node: HTMLElement) {
  const host = node.closest(".reveal");
  return !host || host.classList.contains("is-revealed");
}

/** True when the element sits in the readable band of the viewport. */
function inPlayBand(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  return rect.top < vh * 0.82 && rect.bottom > vh * 0.12 && rect.height > 0;
}

/**
 * Play-once gate: waits for scroll into view AND parent `.reveal.is-revealed`
 * so FX don't finish while the section is still opacity 0.
 */
function useScrollPlay<T extends HTMLElement>(delayMs = 120) {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || active) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(true);
      return;
    }

    let timer = 0;
    let armed = false;
    let io: IntersectionObserver | null = null;

    const stopListening = () => {
      io?.disconnect();
      io = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("crt:reveal", onReveal);
    };

    const arm = () => {
      if (armed) return;
      if (!revealReady(node) || !inPlayBand(node)) return;
      armed = true;
      stopListening();
      timer = window.setTimeout(() => setActive(true), delayMs);
    };

    const onReveal = (e: Event) => {
      const t = e.target;
      if (t instanceof Element && t.contains(node)) arm();
    };

    const onScroll = () => arm();

    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) arm();
      },
      { threshold: [0, 0.15, 0.35, 0.55], rootMargin: "0px 0px -12% 0px" },
    );

    io.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("crt:reveal", onReveal);
    arm();

    return () => {
      stopListening();
      window.clearTimeout(timer);
    };
  }, [active, delayMs]);

  return { ref, active };
}

function scrambledPreview(text: string) {
  const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%*";
  let out = "";
  for (const ch of text) {
    if (ch === " " || ch === "&") out += ch;
    else out += pool[(Math.random() * pool.length) | 0];
  }
  return out;
}

/** Classic terminal typewriter — types when scrolled into view. */
export function Typewriter({
  text,
  className = "",
  speed = 22,
  startDelay = 120,
  cursor = true,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
}) {
  const { ref, active } = useScrollPlay<HTMLSpanElement>(80);
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(text);
      setDone(true);
      return;
    }
    let i = 0;
    let timer = 0;
    const start = window.setTimeout(() => {
      const tick = () => {
        i += 1;
        setShown(text.slice(0, i));
        if (i < text.length) {
          const jitter = speed + (Math.random() * 14 - 4);
          timer = window.setTimeout(tick, Math.max(10, jitter));
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(timer);
    };
  }, [active, text, speed, startDelay]);

  return (
    <span ref={ref} className={`retro-type ${className}`.trim()} aria-label={text}>
      <span aria-hidden>{shown}</span>
      {cursor ? (
        <span
          className={`retro-type__cursor${done ? " is-blink" : " is-solid"}`}
          aria-hidden
        />
      ) : null}
    </span>
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/\\";

/** 90s “decrypt / matrix” scramble that resolves into real text. */
export function ScrambleText({
  text,
  className = "",
  duration = 900,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  duration?: number;
  as?: "span" | "h2" | "h3" | "p" | "strong";
}) {
  const { ref, active } = useScrollPlay<HTMLElement>(100);
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (active) return;
    setDisplay(scrambledPreview(text));
  }, [active, text]);

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(text);
      setDone(true);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const run = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(t * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || ch === "&") {
          out += ch;
          continue;
        }
        if (i < reveal) out += ch;
        else out += SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
      setDisplay(out);
      if (t < 1) frame = requestAnimationFrame(run);
      else {
        setDisplay(text);
        setDone(true);
      }
    };
    frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [active, text, duration]);

  return (
    <Tag
      ref={ref as never}
      className={`retro-scramble${done ? " is-done" : ""} ${className}`.trim()}
      aria-label={text}
    >
      <span aria-hidden>{display}</span>
    </Tag>
  );
}

/** RGB split / VHS glitch title — CSS driven, triggers on view. */
export function GlitchText({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}) {
  const { ref, active } = useScrollPlay<HTMLElement>(160);

  return (
    <Tag
      ref={ref as never}
      className={`retro-glitch${active ? " is-on" : ""} ${className}`.trim()}
      data-text={text}
    >
      {text}
    </Tag>
  );
}

/** Neon sign flicker — great for CONTACT / CONTINUE. */
export function NeonText({
  children,
  className = "",
  as: Tag = "span",
  color = "var(--pink)",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "h2" | "h3" | "p" | "strong";
  color?: string;
}) {
  const { ref, active } = useScrollPlay<HTMLElement>(180);

  return (
    <Tag
      ref={ref as never}
      className={`retro-neon${active ? " is-on" : ""} ${className}`.trim()}
      style={{ ["--neon"]: color } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Horizontal marquee ticker — only crawls after scroll-play. */
export function RetroMarquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const { ref, active } = useScrollPlay<HTMLDivElement>(200);
  const line = items.join("   ★   ");
  return (
    <div
      ref={ref}
      className={`retro-marquee${active ? " is-on" : ""} ${className}`.trim()}
      aria-hidden
    >
      <div className="retro-marquee__track">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  );
}

/** Zone section header: scramble number + glitch title. */
export function ZoneHeader({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <header className="zone-header">
      <ScrambleText
        text={`ZONE ${num}`}
        className="zone-header__num"
        duration={780}
        as="span"
      />
      <GlitchText text={title} className="zone-header__title" as="h2" />
    </header>
  );
}
