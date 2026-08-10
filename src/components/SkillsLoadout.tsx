"use client";

import type { CSSProperties } from "react";
import { skills, strengths } from "@/data/experience";

const STRENGTH_META: Record<
  string,
  { icon: string; accent: string; tag: string }
> = {
  "Problem Solving": { icon: "◆", accent: "#209cee", tag: "PWR-01" },
  Leadership: { icon: "▲", accent: "#92cc41", tag: "PWR-02" },
  "Strategic Thinking": { icon: "✦", accent: "#f7d51d", tag: "PWR-03" },
  "Innovation Driven": { icon: "⚡", accent: "#f06292", tag: "PWR-04" },
};

const SKILL_ACCENTS = [
  "#e76e55",
  "#209cee",
  "#92cc41",
  "#f7d51d",
  "#f06292",
  "#b39ddb",
];

/** RPG-style strengths + animated skill inventory. */
export function SkillsLoadout() {
  return (
    <div className="loadout-grid loadout-grid--v2">
      <div className="loadout-col">
        <h3 className="loadout-col__title">STRENGTHS</h3>
        <ul className="strength-grid">
          {strengths.map((s, i) => {
            const meta = STRENGTH_META[s] ?? {
              icon: "■",
              accent: "#92cc41",
              tag: `PWR-0${i + 1}`,
            };
            return (
              <li
                key={s}
                className="strength-card"
                style={
                  {
                    ["--str-accent"]: meta.accent,
                    ["--str-delay"]: `${i * 90}ms`,
                  } as CSSProperties
                }
              >
                <div className="strength-card__orb" aria-hidden>
                  <span>{meta.icon}</span>
                  <i className="strength-card__ring" />
                </div>
                <div className="strength-card__body">
                  <span className="strength-card__tag">{meta.tag}</span>
                  <strong>{s}</strong>
                  <div className="strength-card__bar" aria-hidden>
                    <span />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="loadout-col">
        <h3 className="loadout-col__title">TECHNICAL SKILLS</h3>
        <div className="skill-board">
          {skills.map((skill, i) => (
            <div
              key={skill}
              className="skill-chip"
              style={
                {
                  ["--skill-accent"]: SKILL_ACCENTS[i % SKILL_ACCENTS.length],
                  ["--skill-delay"]: `${80 + i * 45}ms`,
                } as CSSProperties
              }
            >
              <span className="skill-chip__dot" aria-hidden />
              <span className="skill-chip__label">{skill}</span>
              <span className="skill-chip__blink" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
