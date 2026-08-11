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
import {
  NeonText,
  RetroMarquee,
  ZoneHeader,
} from "./RetroText";
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
  const [volume, setVolume] = useState(85);
  const [bgmReady, setBgmReady] = useState(false);
  const [activeNav, setActiveNav] = useState("projects");
  const blips = useRef<ReturnType<typeof createBlipEngine> | null>(null);

  const audio = useMemo(() => {
    if (typeof window === "undefined") return null;
    const engine = createBlipEngine();
    engine.setVolume(0.85);
    return engine;
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
    if (!next) {
      setBgmReady(false);
      blips.current?.preload();
      blips.current?.setVolume(volume / 100);
      void blips.current?.setMuted(false)?.then(() => {
        setBgmReady(true);
        blips.current?.select();
      });
    } else {
      void blips.current?.setMuted(true);
      setBgmReady(false);
    }
  };

  const onVolume = (value: number) => {
    setVolume(value);
    blips.current?.setVolume(value / 100);
    if (muted && value > 0) {
      setMuted(false);
      setBgmReady(false);
      void blips.current?.setMuted(false)?.then(() => setBgmReady(true));
    }
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
            <div className="sound-dock">
              <button
                type="button"
                className={`nes-btn sound-toggle${muted ? "" : " is-success"}`}
                onClick={toggleMute}
                aria-pressed={!muted}
              >
                {muted ? "SOUND OFF" : bgmReady ? "SOUND ON" : "LOADING…"}
              </button>
              <label className={`vol-slider${muted ? " is-dim" : ""}`}>
                <span aria-hidden>VOL</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={volume}
                  onChange={(e) => onVolume(Number(e.target.value))}
                  aria-label="Music volume"
                />
                <em>{volume}</em>
              </label>
            </div>
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
              <ZoneHeader num="01" title="PROJECTS" />
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
              <ZoneHeader num="02" title="EXPERIENCE" />
              <ExperienceTimeline />
            </section>
          </Reveal>

          <Reveal variant="punch">
            <section id="skills" className="pixel-zone">
              <ZoneHeader num="03" title="STRENGTHS & SKILLS" />
              <SkillsLoadout />
            </section>
          </Reveal>

          <Reveal variant="punch">
            <section id="about" className="pixel-zone">
              <ZoneHeader num="04" title="ABOUT" />
              <AboutPanels />
            </section>
          </Reveal>

          <InterestCards />

          <Reveal variant="punch">
            <section id="contact" className="pixel-zone">
              <ZoneHeader num="05" title="CONTACT" />
              <div className="nes-container is-rounded is-dark continue-panel">
                <NeonText className="continue-panel__neon" as="p" color="var(--lime)">
                  INSERT COIN TO CONTINUE
                </NeonText>
                <RetroMarquee
                  className="continue-panel__ticker"
                  items={[
                    "OPEN TO ROLES",
                    "AI PRODUCT",
                    "GURUGRAM",
                    "LET'S BUILD",
                    profile.email,
                  ]}
                />
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
