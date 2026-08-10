"use client";

/** Tiny walking hero sprite (CSS pixel art). */
export function PixelHero({ walking = false }: { walking?: boolean }) {
  return (
    <div
      className={`pixel-hero${walking ? " is-walking" : ""}`}
      aria-hidden
    >
      <div className="pixel-hero__sprite" />
      <div className="pixel-hero__shadow" />
    </div>
  );
}
