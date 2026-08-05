"use client";

import { principles } from "@/data/principles";
import { FabricPatch } from "./FabricPatch";
import { IconArrowCircle, PrincipleIcon } from "./Icons";
import { SectionLabel } from "./SectionLabel";

export function ThinkingSection({
  stitchProgress = 0,
}: {
  stitchProgress?: number;
}) {
  const local = Math.min(1, Math.max(0, (stitchProgress - 0.55) / 0.15));

  return (
    <section
      id="thinking"
      className="section thinking"
      aria-labelledby="thinking-heading"
    >
      <SectionLabel index="03" label="THINKING" progress={local} />

      <div className="thinking__grid">
        <div
          className="thinking__intro"
          data-stitch-content
          data-stitch-id="thinking-intro"
        >
          <h2 id="thinking-heading" className="section-title">
            How I Think
          </h2>
          <p className="section-lede">
            Principles that guide how I shape products and teams.
          </p>
          <a href="#about" className="text-cta">
            Read more
            <IconArrowCircle className="text-accent" size={26} />
          </a>
        </div>

        <div className="thinking__swatches">
          {principles.map((p, i) => (
            <FabricPatch
              key={p.id}
              className="thinking__swatch"
              data-stitch-content
              data-stitch-id={`principle-${p.id}`}
              style={{
                ["--settle" as string]: String(Math.min(1, local * 1.5 - i * 0.1)),
              }}
            >
              <PrincipleIcon name={p.icon} className="text-accent" size={34} />
              <p>{p.text}</p>
            </FabricPatch>
          ))}
        </div>
      </div>
    </section>
  );
}
