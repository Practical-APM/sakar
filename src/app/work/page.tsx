import Link from "next/link";
import { PixelStars } from "@/components/PixelStars";
import { covalynceProjects, otherProjects } from "@/data/projects";

export const metadata = {
  title: "Projects — PRODUCT QUEST",
  description: "Live products from Sakar Baxi.",
};

const LANES = [
  { label: "COVALYNCE", projects: covalynceProjects },
  { label: "OTHER PRODUCTS", projects: otherProjects },
] as const;

export default function WorkIndexPage() {
  return (
    <div className="crt">
      <div className="crt__bezel" aria-hidden>
        <div className="crt__glass" />
      </div>
      <PixelStars />
      <main className="case-page">
        <Link href="/" className="back-link nes-btn is-primary">
          ← Home
        </Link>
        <h1>PROJECTS</h1>
        <p className="case-meta">Live products, grouped by origin.</p>
        {LANES.map((lane) => (
          <section key={lane.label} style={{ marginTop: "1.5rem" }}>
            <p className="work-index__cat">{lane.label}</p>
            <ul className="work-index">
              {lane.projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="nes-container is-dark work-index__card"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "0.75rem",
                        alignItems: "center",
                      }}
                    >
                      <strong className="work-index__name">
                        {p.name.toUpperCase()}
                      </strong>
                      {p.url && <span className="work-index__live">LIVE</span>}
                    </div>
                    <p className="work-index__thesis">{p.thesis}</p>
                    <p className="work-index__meta">{p.role}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
