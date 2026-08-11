"use client";

import { useState, type CSSProperties } from "react";
import { ScrambleText } from "./RetroText";

export interface PhilosophyPillar {
  id: string;
  code: string;
  title: string;
  tagline: string;
  accent: string;
  icon: string;
  coreThesis: string;
  projectProof: {
    name: string;
    tag: string;
    impact: string;
  }[];
}

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    id: "frictionless-ai",
    code: "PLR-01",
    title: "UTILITY-FIRST AI",
    tagline: "High-Friction Automation Over Chatbot Novelty",
    accent: "#92cc41",
    icon: "⚡",
    coreThesis:
      "AI is only as good as the friction it eliminates. Rather than wrapping models in gimmick UIs, I focus on embedded intelligence that automates complex enterprise workflows and cuts turnaround times.",
    projectProof: [
      {
        name: "Tartan / HDFC",
        tag: "Salary Journey",
        impact: "60% Faster TAT & 90+ HRMS Integrations",
      },
      {
        name: "Knuud",
        tag: "AI Knowledge",
        impact: "Instant context synthesis for complex specs",
      },
    ],
  },
  {
    id: "closed-loop",
    code: "PLR-02",
    title: "CLOSED-LOOP TELEMETRY",
    tagline: "Contextual Feedback Drives Continuous Product Evolution",
    accent: "#209cee",
    icon: "✦",
    coreThesis:
      "Great products are responsive ecosystems. By building real-time telemetry and user feedback loops into the core architecture, we let user signals dynamically inform next-best actions.",
    projectProof: [
      {
        name: "Echo (Covalynce)",
        tag: "B&IYA Suite",
        impact: "Integrated live feedback signals & telemetry",
      },
      {
        name: "Beacon (Covalynce)",
        tag: "Signal Detection",
        impact: "+25% User engagement via active feedback",
      },
    ],
  },
  {
    id: "zero-to-one",
    code: "PLR-03",
    title: "0→1 SHIP VELOCITY",
    tagline: "Rapid Iteration Paired with Structural Integrity",
    accent: "#f7d51d",
    icon: "▲",
    coreThesis:
      "Moving from zero to one requires crisp thesis definition and rapid prototyping. I lead cross-functional engineering teams to ship production-grade products fast without technical debt traps.",
    projectProof: [
      {
        name: "DonnaAI & Syftn",
        tag: "0→1 Product Builds",
        impact: "Agile delivery from concept to live deployment",
      },
      {
        name: "B&IYA",
        tag: "Cofounder Lead",
        impact: "30% Shorter development timelines across products",
      },
    ],
  },
  {
    id: "outcome-first",
    code: "PLR-04",
    title: "OUTCOME-FIRST EXECUTION",
    tagline: "Product Metrics Over Vanity Releases",
    accent: "#f06292",
    icon: "◆",
    coreThesis:
      "Shipping features is an input; business transformation is the output. Every sprint is anchored directly to conversion retention, onboarding efficiency, and tangible partner value.",
    projectProof: [
      {
        name: "Vensure Solutions",
        tag: "Onboarding Flow",
        impact: "+40% Client onboarding & 20% lower turnover",
      },
      {
        name: "Ledger (Covalynce)",
        tag: "Product Analytics",
        impact: "Full pipeline visibility & retention metrics",
      },
    ],
  },
];

export function ProductPhilosophy({ onSelect }: { onSelect?: () => void }) {
  const [activePillar, setActivePillar] = useState<string>(PHILOSOPHY_PILLARS[0].id);

  const current = PHILOSOPHY_PILLARS.find((p) => p.id === activePillar) ?? PHILOSOPHY_PILLARS[0];

  return (
    <div className="philosophy-wrapper">
      <div className="philosophy-grid">
        {/* Selector Tabs / Cards */}
        <div className="philosophy-cards">
          {PHILOSOPHY_PILLARS.map((p) => {
            const isSelected = p.id === activePillar;
            return (
              <button
                key={p.id}
                type="button"
                className={`philosophy-card${isSelected ? " is-selected" : ""}`}
                style={
                  {
                    ["--ph-accent"]: p.accent,
                  } as CSSProperties
                }
                onClick={() => {
                  setActivePillar(p.id);
                  onSelect?.();
                }}
              >
                <div className="philosophy-card__header">
                  <span className="philosophy-card__icon">{p.icon}</span>
                  <span className="philosophy-card__code">{p.code}</span>
                </div>
                <h4 className="philosophy-card__title">{p.title}</h4>
                <p className="philosophy-card__tagline">{p.tagline}</p>
                <div className="philosophy-card__active-bar" aria-hidden />
              </button>
            );
          })}
        </div>

        {/* Detailed Breakdown Deck */}
        <div
          className="philosophy-detail"
          style={
            {
              ["--ph-accent"]: current.accent,
            } as CSSProperties
          }
        >
          <div className="philosophy-detail__top">
            <span className="philosophy-detail__badge">{current.code} // CORE TACTIC</span>
            <ScrambleText
              text={current.title}
              as="h3"
              className="philosophy-detail__title"
              duration={600}
            />
            <p className="philosophy-detail__subtitle">{current.tagline}</p>
          </div>

          <div className="philosophy-detail__thesis">
            <p>&gt; {current.coreThesis}</p>
          </div>

          <div className="philosophy-detail__proof">
            <h5 className="philosophy-detail__proof-heading">PROJECT PROOF & EVIDENCE</h5>
            <div className="philosophy-detail__proof-grid">
              {current.projectProof.map((proof) => (
                <div key={proof.name} className="philosophy-proof-card">
                  <div className="philosophy-proof-card__head">
                    <strong className="philosophy-proof-card__name">{proof.name}</strong>
                    <span className="philosophy-proof-card__tag">{proof.tag}</span>
                  </div>
                  <p className="philosophy-proof-card__impact">▸ {proof.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
