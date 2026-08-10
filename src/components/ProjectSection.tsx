"use client";

import Link from "next/link";
import { featuredProjects, swatchProjects } from "@/data/projects";
import { FabricPatch } from "./FabricPatch";
import { IconArrowCircle, ProjectIcon } from "./Icons";
import { SectionLabel } from "./SectionLabel";

export function ProjectSection({
  stitchProgress = 0,
}: {
  stitchProgress?: number;
}) {
  const local = Math.min(1, Math.max(0, (stitchProgress - 0.25) / 0.3));

  return (
    <section id="work" className="section work" aria-labelledby="work-heading">
      <SectionLabel index="02" label="WORK" progress={local} />

      <div className="seam-layout">
        <div
          className="seam-layout__left"
          data-stitch-content
          data-stitch-id="work-intro"
          data-side="left"
        >
          <h2 id="work-heading" className="section-title">
            Selected Work
          </h2>
          <p className="section-lede">
            A few things I&apos;ve built and the problems behind them.
          </p>
          <Link href="/work" className="text-cta">
            View all projects
            <IconArrowCircle className="text-accent" size={26} />
          </Link>

          <div className="work__swatches">
            {swatchProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="work__swatch fabric-patch"
                data-stitch-content
                data-stitch-id={`swatch-${p.slug}`}
                data-side="left"
              >
                <ProjectIcon name={p.icon} className="text-accent" size={24} />
                <span>{p.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="seam-layout__corridor" aria-hidden />

        <div className="seam-layout__right work__list">
          {featuredProjects.map((project, i) => (
            <article
              key={project.slug}
              className="work__row"
              data-stitch-content
              data-stitch-id={`project-${project.slug}`}
              data-side="right"
            >
              <FabricPatch
                className="work__card"
                as="a"
                href={`/work/${project.slug}`}
              >
                <div className="work__card-body">
                  <span className="work__index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="work__name">{project.name}</h3>
                  <p className="work__desc">{project.description}</p>
                  <ul className="work__tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="work__card-icon" aria-hidden>
                  <ProjectIcon
                    name={project.icon}
                    className="text-accent"
                    size={40}
                  />
                </div>
              </FabricPatch>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
