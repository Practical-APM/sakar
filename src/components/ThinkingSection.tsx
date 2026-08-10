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

      <div className="seam-layout">
        <div
          className="seam-layout__left"
          data-stitch-content
          data-stitch-id="thinking-intro"
          data-side="left"
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

        <div className="seam-layout__corridor" aria-hidden />

        <div className="seam-layout__right">
          <ul className="thinking__list">
            {principles.map((p) => (
              <li key={p.id}>
                <FabricPatch
                  className="thinking__item"
                  data-stitch-content
                  data-stitch-id={`principle-${p.id}`}
                  data-side="right"
                >
                  <PrincipleIcon name={p.icon} className="text-accent" size={28} />
                  <p>{p.text}</p>
                </FabricPatch>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
