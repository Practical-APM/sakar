"use client";

import { FabricPatch } from "./FabricPatch";
import { IconStarBurst } from "./Icons";
import { SectionLabel } from "./SectionLabel";

export function Hero({ stitchProgress = 0 }: { stitchProgress?: number }) {
  return (
    <section id="intro" className="section hero" aria-labelledby="hero-heading">
      <SectionLabel
        index="01"
        label="INTRO"
        progress={Math.min(1, stitchProgress / 0.12)}
      />

      <div className="seam-layout hero__layout">
        <div
          className="seam-layout__left hero__copy"
          data-stitch-content
          data-stitch-id="hero-copy"
          data-side="left"
        >
          <p className="eyebrow">Product Thinker</p>
          <h1 id="hero-heading" className="hero__title">
            I stitch problems, systems and people into{" "}
            <em className="accent-italic">meaningful</em> products.
          </h1>
          <p className="hero__bio">
            I find clarity in complexity and build products that create impact.
          </p>
          <p className="hero__signature" aria-hidden>
            Sakar Baxi
          </p>
          <a href="#work" className="scroll-cta">
            <span className="scroll-cta__dot" />
            Scroll to stitch
          </a>
        </div>

        <div className="seam-layout__corridor" aria-hidden />

        <div className="seam-layout__right hero__aside">
          <FabricPatch
            className="hero__patch"
            data-stitch-content
            data-stitch-id="hero-patch"
            data-side="right"
          >
            <IconStarBurst className="text-accent" size={36} />
            <p className="hero__patch-text">
              Turning scattered pieces into seamless experiences.
            </p>
          </FabricPatch>
        </div>
      </div>
    </section>
  );
}
