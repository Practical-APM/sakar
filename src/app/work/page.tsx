import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Selected Work — Sakar Baxi",
  description: "Projects and the problems behind them.",
};

export default function WorkIndexPage() {
  return (
    <main className="case-page">
      <Link href="/" className="back-link">
        ← Back home
      </Link>
      <h1>Selected Work</h1>
      <p className="case-meta">
        Placeholder case studies — real details coming soon.
      </p>
      <ul style={{ display: "grid", gap: "1rem" }}>
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="fabric-patch" style={{ display: "block", padding: "1.25rem" }}>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem" }}>
                {p.name}
              </strong>
              <p style={{ margin: "0.4rem 0 0", color: "var(--ink-secondary)", fontSize: "0.9rem" }}>
                {p.thesis}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
