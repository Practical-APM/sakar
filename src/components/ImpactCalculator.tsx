"use client";

import { useState } from "react";
import { ScrambleText } from "./RetroText";

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
      { name: "HRMS Systems (90+ Endpoint)", level: "Expert" },
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

export function ImpactCalculator({ onSelect }: { onSelect?: () => void }) {
  const [clients, setClients] = useState<number>(25);
  const [baseDays, setBaseDays] = useState<number>(14);
  const [teamSize, setTeamSize] = useState<number>(8);

  // Derived Telemetry Calculations based on Tartan/Vensure empirical ratios (60% TAT drop, +40% onboarding)
  const tatDaysSaved = Math.round(baseDays * 0.6);
  const totalDaysSavedPerYear = clients * tatDaysSaved;
  const devHoursUnlockedPerSprint = Math.round(teamSize * 18.5);
  const projectedOnboardingCapacity = Math.round(clients * 1.4);

  return (
    <div className="impact-container">
      {/* Interactive ROI Calculator */}
      <div className="impact-calc-card nes-container is-rounded is-dark">
        <div className="impact-calc__head">
          <span className="impact-calc__badge">TELEMETRY SIMULATOR</span>
          <ScrambleText
            text="IMPACT & ROI CALCULATOR"
            as="h3"
            className="impact-calc__title"
            duration={700}
          />
          <p className="impact-calc__desc">
            Simulate the operational efficiency gains & engineering capacity unlocked by Sakar's product execution model.
          </p>
        </div>

        <div className="impact-calc__controls">
          <div className="impact-slider-group">
            <div className="impact-slider-label">
              <span>ENTERPRISE CLIENTS ONBOARDED:</span>
              <strong>{clients} Clients</strong>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={clients}
              onChange={(e) => {
                onSelect?.();
                setClients(Number(e.target.value));
              }}
              className="impact-range"
            />
          </div>

          <div className="impact-slider-group">
            <div className="impact-slider-label">
              <span>BASELINE TURNAROUND TIME (TAT):</span>
              <strong>{baseDays} Days</strong>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={baseDays}
              onChange={(e) => {
                onSelect?.();
                setBaseDays(Number(e.target.value));
              }}
              className="impact-range"
            />
          </div>

          <div className="impact-slider-group">
            <div className="impact-slider-label">
              <span>ENGINEERING TEAM SIZE LED:</span>
              <strong>{teamSize} Developers</strong>
            </div>
            <input
              type="range"
              min={2}
              max={20}
              step={1}
              value={teamSize}
              onChange={(e) => {
                onSelect?.();
                setTeamSize(Number(e.target.value));
              }}
              className="impact-range"
            />
          </div>
        </div>

        <div className="impact-calc__metrics">
          <div className="impact-metric-box">
            <span className="impact-metric__val">-{tatDaysSaved} Days</span>
            <span className="impact-metric__label">TAT Drop per Journey (60% Cut)</span>
          </div>
          <div className="impact-metric-box">
            <span className="impact-metric__val">{totalDaysSavedPerYear} Days</span>
            <span className="impact-metric__label">Annual Turnaround Days Saved</span>
          </div>
          <div className="impact-metric-box">
            <span className="impact-metric__val">+{devHoursUnlockedPerSprint} hrs</span>
            <span className="impact-metric__label">Dev Hours Unlocked per Sprint</span>
          </div>
          <div className="impact-metric-box">
            <span className="impact-metric__val">{projectedOnboardingCapacity}</span>
            <span className="impact-metric__label">Client Onboardings Lifted (+40%)</span>
          </div>
        </div>
      </div>

      {/* AI PM Tech Stack Radar */}
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
    </div>
  );
}
