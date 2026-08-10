"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { profile, socialLinks } from "@/data/social";
import { createBlipEngine } from "@/lib/blips";
import { AboutPanels } from "./AboutPanels";
import { Cartridge, useScreenTilt } from "./Cartridge";
import { CrtFx } from "./CrtFx";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { GithubSection } from "./GithubSection";
import { InterestCards } from "./InterestCards";
import { PixelStars } from "./PixelStars";
import { PowerOn } from "./PowerOn";
import { Reveal } from "./Reveal";
import { SkillsLoadout } from "./SkillsLoadout";

const COLORS = ["#e76e55", "#209cee", "#92cc41", "#f7d51d", "#f06292"];

const NAV = [
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#about", id: "about", label: "About" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export function PortfolioShell() {
  const [booting, setBooting] = useState(true);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [activeNav, setActiveNav] = useState("projects");
  const blips = useRef<ReturnType<typeof createBlipEngine> | null>(null);

  const audio = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createBlipEngine();
  }, []);

  useEffect(() => {
    blips.current = audio;
  }, [audio]);

  useScreenTilt(ready && !booting);

  const onNoise = useCallback(() => {
    setReady(true);
  }, []);

  const onBootDone = useCallback(() => {
    setBooting(false);
    blips.current?.setMuted(muted);
    blips.current?.coin();
  }, [muted]);

  useEffect(() => {
    if (!ready) return;
    const ids = NAV.map((n) => n.id);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveNav(visible.target.id);
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ready]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    blips.current?.setMuted(next);
    if (!next) blips.current?.select();
  };

  const ping = () => blips.current?.select();

  return (
    <div className="crt">
      <div className="crt__bezel" aria-hidden>
        <div className="crt__glass" />
        <div className={`crt__led${booting ? " is-warming" : ""}`} />
      </div>
      <PixelStars />
      <CrtFx active={!booting} />

      {booting && <PowerOn onNoise={onNoise} onDone={onBootDone} />}

      <svg className="crt__filters" aria-hidden>
        <filter id="crt-rgb">
          <feOffset in="SourceGraphic" dx="1.2" result="r" />
          <feOffset in="SourceGraphic" dx="-1.2" result="b" />
          <feColorMatrix
            in="r"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0"
            result="r2"
          />
          <feColorMatrix
            in="b"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 0.55 0"
            result="b2"
          />
          <feBlend in="SourceGraphic" in2="r2" mode="screen" result="m1" />
          <feBlend in="m1" in2="b2" mode="screen" />
        </filter>
      </svg>

      {ready && (
        <main
          className={`pixel-shell crt__screen${booting ? " is-under-snow" : " is-live"}`}
        >
          <header className="topbar">
            <div className="topbar__who">
              <h1>{profile.name}</h1>
              <p>
                {profile.title} · {profile.location}
              </p>
            </div>
            <button
              type="button"
              className={`nes-btn sound-toggle${muted ? "" : " is-success"}`}
              onClick={toggleMute}
              aria-pressed={!muted}
            >
              {muted ? "SFX OFF" : "SFX ON"}
            </button>
          </header>

          <nav className="pixel-nav" aria-label="Sections">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nes-btn nav-chip${activeNav === item.id ? " is-warning" : " is-primary"}`}
                onClick={ping}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Reveal variant="punch">
            <section id="projects" className="pixel-zone">
              <header className="zone-header">
                <span className="zone-header__num">01</span>
                <h2 className="zone-header__title">PROJECTS</h2>
              </header>
              <div className="stage-lane__rack stage-lane__rack--all">
                {projects.map((p, i) => (
                  <Cartridge
                    key={p.slug}
                    project={p}
                    color={COLORS[i % COLORS.length]}
                    index={i}
                    delay={i * 70}
                    onSelect={ping}
                  />
                ))}
              </div>
              <div className="zone-actions">
                <Link href="/work" className="nes-btn is-warning" onClick={ping}>
                  All projects
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal variant="punch">
            <section id="experience" className="pixel-zone">
              <header className="zone-header">
                <span className="zone-header__num">02</span>
                <h2 className="zone-header__title">EXPERIENCE</h2>
              </header>
              <ExperienceTimeline />
            </section>
          </Reveal>

          <Reveal variant="punch">
            <section id="skills" className="pixel-zone">
              <header className="zone-header">
                <span className="zone-header__num">03</span>
                <h2 className="zone-header__title">STRENGTHS & SKILLS</h2>
              </header>
              <SkillsLoadout />
            </section>
          </Reveal>

          <Reveal variant="punch">
            <section id="about" className="pixel-zone">
              <header className="zone-header">
                <span className="zone-header__num">04</span>
                <h2 className="zone-header__title">ABOUT</h2>
              </header>
              <AboutPanels />
            </section>
          </Reveal>

          <InterestCards />

          <Reveal variant="punch">
            <section id="contact" className="pixel-zone">
              <header className="zone-header">
                <span className="zone-header__num">05</span>
                <h2 className="zone-header__title">CONTACT</h2>
              </header>
              <div className="nes-container is-rounded is-dark continue-panel">
                <div className="contact-row">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="nes-btn is-success"
                      onClick={() => blips.current?.confirm()}
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={`tel:${profile.phone}`}
                    className="nes-btn is-error"
                    onClick={() => blips.current?.confirm()}
                  >
                    Call
                  </a>
                </div>
              </div>

              <div className="gh-wrap">
                <GithubSection onSelect={() => blips.current?.confirm()} />
              </div>
            </section>
          </Reveal>

          <footer className="pixel-footer">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span>{profile.email}</span>
          </footer>
        </main>
      )}
    </div>
  );
}
