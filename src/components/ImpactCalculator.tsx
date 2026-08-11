"use client";

export const TECH_STACK = [
  {
    category: "AI & ML ARCHITECTURE",
    accent: "#92cc41",
    items: [
      { name: "LLM APIs & Prompt Specs", level: "Production" },
      { name: "RAG & Vector Retrieval", level: "Production" },
      { name: "Context Window Tuning", level: "Advanced" },
      { name: "Agent Loop Mechanics", level: "Production" },
    ],
  },
  {
    category: "API & INTEGRATIONS",
    accent: "#209cee",
    items: [
      { name: "RESTful & Webhooks", level: "Expert" },
      { name: "HRMS Systems (90+ Endpoints)", level: "Expert" },
      { name: "JSON & OpenAPI Specs", level: "Production" },
      { name: "Postman & Auth Flow Delivery", level: "Advanced" },
    ],
  },
  {
    category: "ANALYTICS & TELEMETRY",
    accent: "#f7d51d",
    items: [
      { name: "User Retention Telemetry", level: "Expert" },
      { name: "Conversion Funnel Analysis", level: "Production" },
      { name: "SQL & Querying", level: "Proficient" },
      { name: "Mixpanel / Amplitude", level: "Advanced" },
    ],
  },
  {
    category: "PRODUCT EXECUTION",
    accent: "#f06292",
    items: [
      { name: "Agile & Sprint Ownership", level: "Expert" },
      { name: "JIRA & Notion Flow", level: "Expert" },
      { name: "PRD & Wireframing", level: "Production" },
      { name: "Cross-Functional Dev Lead", level: "Expert" },
    ],
  },
];

/** AI PM Tooling & Tech Matrix — no calculator, just the domain evidence grid. */
export function ImpactCalculator({ onSelect: _onSelect }: { onSelect?: () => void }) {
  return (
    <div className="tech-matrix-wrap">
      <h4 className="tech-matrix__title">⚡ AI PM TOOLING & TECH MATRIX</h4>
      <div className="tech-matrix-grid">
        {TECH_STACK.map((group) => (
          <div
            key={group.category}
            className="tech-matrix-card"
            style={{ ["--group-accent" as string]: group.accent }}
          >
            <div className="tech-matrix-card__head">
              <span className="tech-matrix-card__icon">✦</span>
              <h5>{group.category}</h5>
            </div>
            <ul className="tech-matrix-card__list">
              {group.items.map((item) => (
                <li key={item.name} className="tech-matrix-item">
                  <span>{item.name}</span>
                  <em className="tech-matrix-level">{item.level}</em>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
