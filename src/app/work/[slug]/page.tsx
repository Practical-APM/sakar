import Link from "next/link";
import { notFound } from "next/navigation";
import { PixelStars } from "@/components/PixelStars";
import { getProject, projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.name.toUpperCase()} — PRODUCT QUEST`,
    description: project.thesis,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="crt">
      <div className="crt__bezel" aria-hidden>
        <div className="crt__glass" />
      </div>
      <PixelStars />
      <main className="case-page">
        <Link href="/work" className="back-link nes-btn is-primary">
          ← Projects
        </Link>
        <p className="case-meta">{project.role}</p>
        <h1>{project.name.toUpperCase()}</h1>
        <p className="case-meta">{project.thesis}</p>
        <p>{project.description}</p>

        {project.url && (
          <p style={{ margin: "1rem 0" }}>
            <a
              href={project.url}
              className="nes-btn is-success"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open live site
            </a>
          </p>
        )}
      </main>
    </div>
  );
}
