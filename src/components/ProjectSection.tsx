"use client";

import Link from "next/link";
import { covalynceProjects, otherProjects } from "@/data/projects";
import { IconArrowCircle, ProjectIcon } from "./Icons";
import { SectionLabel } from "./SectionLabel";

const featuredProjects = [...covalynceProjects, ...otherProjects].slice(0, 3);
const swatchProjects = [...otherProjects, ...covalynceProjects];

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
        <div className="seam-layout__left">
          <div
            className="work__intro"
            data-stitch-content
            data-stitch-id="work-intro"
            data-side="left"
          >
            <h2 id="work-heading" className="section-title">
              Selected Work
            </h2>
            <p className="section-lede">Live products.</p>
            <Link href="/work" className="text-cta">
              View all projects
              <IconArrowCircle className="text-accent" size={26} />
            </Link>
          </div>

          <p className="work__swatch-label">Also live</p>
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
                <ProjectIcon name={p.icon} className="text-accent" size={36} />
                <span>{p.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="seam-layout__corridor" aria-hidden />

        <div className="seam-layout__right work__list">
          {featuredProjects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="work__row"
              data-stitch-content
              data-stitch-id={`project-${project.slug}`}
              data-side="right"
            >
              <div className="work__copy">
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
              <ProjectIcon
                name={project.icon}
                className="work__icon text-accent"
                size={48}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
