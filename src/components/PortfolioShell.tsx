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
import { PixelDustCursor } from "./PixelDustCursor";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { LeadIntakeModal } from "./LeadIntakeModal";
import { useRetroNostalgia } from "@/hooks/useRetroNostalgia";
import { useRetroAchievements } from "@/hooks/useRetroAchievements";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import {
  InteractiveMascot,
  PaletteToggle,
  RetroEqBars,
  RetroScoreDisplay,
} from "./RetroNostalgia";
import { PowerOn } from "./PowerOn";
import { Reveal } from "./Reveal";
import { ProductPhilosophy } from "./ProductPhilosophy";
import {
  NeonText,
  RetroMarquee,
  ZoneHeader,
} from "./RetroText";
import { SkillsLoadout } from "./SkillsLoadout";

const COLORS = ["#e76e55", "#209cee", "#92cc41", "#f7d51d", "#f06292"];

const NAV = [
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#philosophy", id: "philosophy", label: "Philosophy" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#about", id: "about", label: "About" },
  { href: "#contact", id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV.map((n) => n.id);

export function PortfolioShell() {
  const [booting, setBooting] = useState(true);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(85);
  const [bgmReady, setBgmReady] = useState(false);
  const activeSectionId = useScrollSpy(SECTION_IDS, 140);
  const [activeNav, setActiveNav] = useState("projects");
  const [modalOpen, setModalOpen] = useState(false);
  const blips = useRef<ReturnType<typeof createBlipEngine> | null>(null);

  useEffect(() => {
    if (activeSectionId) {
      setActiveNav(activeSectionId);
    }
  }, [activeSectionId]);

  const nostalgia = useRetroNostalgia();
  const achievements = useRetroAchievements();

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
      <PixelDustCursor />
      <ScrollProgressBar />
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
        <>
          <main
            className={`pixel-shell crt__screen${booting ? " is-under-snow" : " is-live"}`}
          >
          <header className="topbar">
            <div className="topbar__who">
              <div className="topbar__who-title">
                <InteractiveMascot onBlip={() => blips.current?.coin()} />
                <div>
                  <h1>{profile.name}</h1>
                  <p>
                    {profile.title} · {profile.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="sound-dock">
              <RetroScoreDisplay
                score={nostalgia.score}
                cheatUnlocked={nostalgia.cheatUnlocked}
                onUnlock={() => {
                  nostalgia.unlockCheatManual();
                  blips.current?.coin();
                }}
              />
              <PaletteToggle
                paletteName={nostalgia.paletteName}
                onCycle={() => {
                  nostalgia.cyclePalette();
                  blips.current?.select();
                }}
              />
              <RetroEqBars playing={!muted && bgmReady} />
              <button
                type="button"
                className={`nes-btn sound-toggle${muted ? "" : " is-success"}`}
                onClick={() => {
                  toggleMute();
                  achievements.unlock("audiophile");
                }}
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
            <section id="philosophy" className="pixel-zone">
              <ZoneHeader num="02" title="PRODUCT PHILOSOPHY" />
              <ProductPhilosophy onSelect={ping} />
            </section>
          </Reveal>

          <Reveal variant="punch">
            <section id="experience" className="pixel-zone">
              <ZoneHeader num="03" title="EXPERIENCE" />
              <ExperienceTimeline />
            </section>
          </Reveal>

          <Reveal variant="punch">
            <section id="skills" className="pixel-zone">
              <ZoneHeader num="04" title="STRENGTHS & SKILLS" />
              <SkillsLoadout onSelect={ping} />
            </section>
          </Reveal>

          <Reveal variant="punch">
            <section id="about" className="pixel-zone">
              <ZoneHeader num="05" title="ABOUT" />
              <AboutPanels />
            </section>
          </Reveal>

          <InterestCards onSelect={ping} />

          <Reveal variant="punch">
            <section id="contact" className="pixel-zone">
              <ZoneHeader num="06" title="CONTACT" />
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
                  <button
                    type="button"
                    className="nes-btn is-warning contact-hire-btn"
                    onClick={() => {
                      blips.current?.coin();
                      setModalOpen(true);
                    }}
                  >
                    👾 INSERT COIN TO HIRE
                  </button>
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
            <div className="pixel-footer__actions">
              <span>{profile.email}</span>
              <button
                type="button"
                className="nes-btn is-primary pixel-footer__hire-btn"
                onClick={() => {
                  blips.current?.coin();
                  setModalOpen(true);
                }}
              >
                👾 HIRE ME
              </button>
            </div>
          </footer>
        </main>

        <LeadIntakeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onBlip={() => blips.current?.select()}
        />
        {achievements.recentToast && (
          <div className="achievement-toast" role="alert" aria-live="assertive">
            <span className="achievement-toast__icon">{achievements.recentToast.icon}</span>
            <div className="achievement-toast__body">
              <strong>ACHIEVEMENT UNLOCKED</strong>
              <span>{achievements.recentToast.title}</span>
              <em>{achievements.recentToast.desc}</em>
            </div>
            <div className="achievement-toast__progress">
              {achievements.unlockedCount}/{achievements.totalCount}
            </div>
          </div>
        )}
        </>
      )}
    </div>
  );
}

