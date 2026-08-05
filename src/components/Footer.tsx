"use client";

import { socialLinks } from "@/data/social";

export function Footer() {
  return (
    <>
      <section id="about" className="section about" aria-labelledby="about-heading">
        <div className="about__inner" data-stitch-content data-stitch-id="about">
          <h2 id="about-heading" className="section-title">
            About
          </h2>
          <p className="section-lede about__copy">
            I enjoy problems where people, systems, and constraints refuse to
            line up on their own. I work best with teams that value clarity over
            theatre — and I look for the seam between what is possible and what
            is worth stitching together.
          </p>
        </div>
      </section>

      <section id="journal" className="section journal" aria-labelledby="journal-heading">
        <div className="about__inner" data-stitch-content data-stitch-id="journal">
          <h2 id="journal-heading" className="section-title">
            Journal
          </h2>
          <p className="section-lede">
            Writing coming soon — notes on product, systems, and craft.
          </p>
        </div>
      </section>

      <footer id="contact" className="footer">
        <p className="footer__copy">© 2025 Sakar Baxi</p>
        <div className="footer__right">
          <p className="footer__invite">Let&apos;s build meaningful things together.</p>
          <ul className="footer__social">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
