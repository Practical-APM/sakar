"use client";

import {
  awards,
  certifications,
  education,
  languages,
} from "@/data/experience";
import { profile, socialLinks } from "@/data/social";

export function Footer() {
  return (
    <>
      <section id="about" className="section about" aria-labelledby="about-heading">
        <div className="seam-layout">
          <div
            className="seam-layout__left about__inner"
            data-stitch-content
            data-stitch-id="about"
            data-side="left"
          >
            <h2 id="about-heading" className="section-title">
              About
            </h2>
            <p className="section-lede about__copy">{profile.summary}</p>
            <p className="about__detail">
              {education.degree} · {education.school} ({education.period}). Based
              in {profile.location}. I care about business transformation through
              AI, and teams that value clarity over theatre.
            </p>
            <ul className="about__meta">
              {languages.map((lang) => (
                <li key={lang.name}>
                  <strong>{lang.name}</strong> · {lang.level}
                </li>
              ))}
            </ul>
            <ul className="about__meta about__meta--certs">
              {certifications.map((c) => (
                <li key={c.name}>
                  {c.name} · {c.org}
                </li>
              ))}
              {awards.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="seam-layout__corridor" aria-hidden />
          <div className="seam-layout__right" aria-hidden />
        </div>
      </section>

      <section id="life" className="section journal" aria-labelledby="life-heading">
        <div className="seam-layout">
          <div
            className="seam-layout__left about__inner"
            data-stitch-content
            data-stitch-id="life"
            data-side="left"
          >
            <h2 id="life-heading" className="section-title">
              Outside work
            </h2>
            <p className="section-lede">
              Reading novels (last: <em>1984</em>), lifelong Liverpool FC
              supporter (#YNWA), and a soft spot for 90s / early-2000s indie.
            </p>
          </div>
          <div className="seam-layout__corridor" aria-hidden />
          <div className="seam-layout__right" aria-hidden />
        </div>
      </section>

      <footer id="contact" className="footer">
        <p className="footer__copy">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="footer__right">
          <p className="footer__invite">
            Let&apos;s build meaningful things together.
          </p>
          <ul className="footer__social">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
