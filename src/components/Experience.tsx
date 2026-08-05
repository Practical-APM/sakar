"use client";

import { experience } from "@/data/experience";
import { FabricPatch } from "./FabricPatch";
import { IconArrowCircle } from "./Icons";
import { SectionLabel } from "./SectionLabel";

export function Experience({ stitchProgress = 0 }: { stitchProgress?: number }) {
  const local = Math.min(1, Math.max(0, (stitchProgress - 0.7) / 0.18));

  return (
    <section
      id="experience"
      className="section experience"
      aria-labelledby="experience-heading"
    >
      <SectionLabel index="04" label="EXPERIENCE" progress={local} />

      <div className="seam-layout">
        <div
          className="seam-layout__left"
          data-stitch-content
          data-stitch-id="experience-intro"
          data-side="left"
        >
          <h2 id="experience-heading" className="section-title">
            Experience
          </h2>
          <p className="section-lede">
            A stitched path through roles that shaped how I build.
          </p>
          <a href="#about" className="text-cta">
            View journey
            <IconArrowCircle className="text-accent" size={26} />
          </a>
        </div>

        <div className="seam-layout__corridor" aria-hidden />

        <div className="seam-layout__right">
          <FabricPatch
            className="experience__timeline"
            data-stitch-content
            data-stitch-id="experience-timeline"
            data-side="right"
            style={{ ["--settle" as string]: String(local) }}
          >
            <ol className="timeline">
              {experience.map((entry, i) => (
                <li
                  key={`${entry.title}-${entry.year}`}
                  className="timeline__item"
                >
                  <div className="timeline__marker">
                    <span className="timeline__dot" />
                    {i < experience.length - 1 && (
                      <span className="timeline__wire" />
                    )}
                  </div>
                  <div className="timeline__content">
                    <p className="timeline__company">{entry.company}</p>
                    <p className="timeline__title">{entry.title}</p>
                    <p className="timeline__period">{entry.period}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FabricPatch>
        </div>
      </div>
    </section>
  );
}
