import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

const sections = [
  "Context",
  "Problem",
  "Constraints",
  "What I noticed",
  "Hypothesis",
  "Decision",
  "What we built",
  "Trade-offs",
  "Outcome",
  "What I learned",
] as const;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.name} — Sakar Baxi`,
    description: project.thesis,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="case-page">
      <Link href="/work" className="back-link">
        ← All projects
      </Link>
      <p className="eyebrow">{project.role} · {project.year}</p>
      <h1>{project.name}</h1>
      <p className="case-meta">{project.thesis}</p>
      <p style={{ marginBottom: "2rem", color: "var(--ink-secondary)" }}>
        {project.description}
      </p>
      <ul className="work__tags" style={{ marginBottom: "2.5rem" }}>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      {sections.map((heading) => (
        <div key={heading} className="case-block">
          <h2>{heading}</h2>
          <p>
            Placeholder narrative for <em>{project.name}</em> — {heading.toLowerCase()}.
            Real case-study content will replace this section.
          </p>
        </div>
      ))}
    </main>
  );
}
