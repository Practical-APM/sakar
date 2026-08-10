"use client";

import type { CSSProperties } from "react";
import {
  awards,
  certifications,
  education,
  languages,
} from "@/data/experience";
import { profile } from "@/data/social";

const LANG_FILL: Record<string, number> = {
  Native: 100,
  Advanced: 82,
  Proficient: 68,
};

/** Visual About panels: summary terminal, diploma, language meters, trophies. */
export function AboutPanels() {
  return (
    <div className="about-v2">
      <article className="about-v2__summary">
        <div className="about-v2__terminal-bar">
          <span />
          <span />
          <span />
          <strong>SUMMARY.TXT</strong>
        </div>
        <div className="about-v2__terminal-body">
          <p>
            <span className="about-v2__prompt">&gt;</span> {profile.summary}
            <span className="about-v2__cursor" aria-hidden />
          </p>
        </div>
      </article>

      <article className="about-v2__edu">
        <div className="edu-seal" aria-hidden>
          <div className="edu-seal__ring">
            <span>NIT</span>
          </div>
        </div>
        <div>
          <p className="about-v2__kicker">EDUCATION</p>
          <h3>{education.degree}</h3>
          <p className="about-v2__school">{education.school}</p>
          <p className="about-v2__meta">
            {education.period}
            {education.location ? ` · ${education.location}` : ""}
          </p>
        </div>
      </article>

      <article className="about-v2__langs">
        <p className="about-v2__kicker">LANGUAGES</p>
        <ul className="lang-meters">
          {languages.map((l, i) => {
            const fill = LANG_FILL[l.level] ?? 60;
            return (
              <li
                key={l.name}
                style={{ ["--lang-delay"]: `${i * 80}ms` } as CSSProperties}
              >
                <div className="lang-meters__row">
                  <strong>{l.name}</strong>
                  <span>{l.level}</span>
                </div>
                <div className="lang-meters__track" aria-hidden>
                  <span style={{ width: `${fill}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </article>

      <article className="about-v2__trophies">
        <p className="about-v2__kicker">CERTS & AWARDS</p>
        <ul className="trophy-grid">
          {certifications.map((c, i) => (
            <li
              key={c.name}
              className="trophy-tile trophy-tile--cert"
              style={{ ["--t-delay"]: `${i * 70}ms` } as CSSProperties}
            >
              <span className="trophy-tile__icon" aria-hidden>
                ▣
              </span>
              <div>
                <strong>{c.name}</strong>
                <p>{c.org}</p>
              </div>
            </li>
          ))}
          {awards.map((a, i) => (
            <li
              key={a}
              className="trophy-tile trophy-tile--award"
              style={
                {
                  ["--t-delay"]: `${(certifications.length + i) * 70}ms`,
                } as CSSProperties
              }
            >
              <span className="trophy-tile__icon" aria-hidden>
                ★
              </span>
              <div>
                <strong>{a}</strong>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
