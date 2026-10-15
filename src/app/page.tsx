"use client";

import { useEffect, useState, useCallback } from "react";

/* ─── SVG Icons ────────────────────────────────────────────────────────────── */
const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

const Github = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const Linkedin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const Mail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);

const Sun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const Moon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
);

const YouTubeMusicIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#FF0000" />
    <circle cx="12" cy="12" r="6.2" stroke="#FFFFFF" strokeWidth="1.6" />
    <polygon points="10,8.5 15.5,12 10,15.5" fill="#FFFFFF" />
  </svg>
);

const CALENDLY_URL = "https://calendly.com/baxi_ji/introduction-call";
const YOUTUBE_MUSIC_PLAYLIST_URL = "https://music.youtube.com/playlist?list=PLeOmZiGno4Uk&si=Dy0OPDSHLAfQGm0Z";

/* ─── DATA: Shipped Side Projects ─────────────────────────────────────────── */
const sideProjects = [
  {
    id: "beacon",
    name: "Beacon",
    category: "Onboarding Alarms",
    desc: "Real-time alerts before client onboarding projects fall behind schedule.",
    preview: "/beacon.png",
    live: "https://covalynce-beacon.vercel.app/",
    github: "https://github.com/Practical-APM/Beacon",
  },
  {
    id: "ledger",
    name: "Ledger",
    category: "AI Spend Tracking",
    desc: "One live dashboard to monitor company AI costs before surprise invoices arrive.",
    preview: "/ledger.png",
    live: "https://covalynce-ledger.vercel.app/",
    github: "https://github.com/Practical-APM/Covalynce",
  },
  {
    id: "echo",
    name: "Echo",
    category: "Auto Announcements",
    desc: "Turns completed code updates into customer-ready release notes automatically.",
    preview: "/echo.png",
    live: "https://covalynce-echo.vercel.app/",
    github: "https://github.com/Practical-APM/Covalynce",
  },
  {
    id: "knuud",
    name: "Knuud",
    category: "PRD to Jira Sync",
    desc: "Reads product spec documents and automatically compiles them into dev tickets.",
    preview: "/knuud.png",
    live: "https://knuud.space",
    github: "https://github.com/Practical-APM/knuud",
  },
  {
    id: "bhangar",
    name: "Bhangar.space",
    category: "Hyperlocal Marketplace",
    desc: "Private space to buy, sell, or giveaway items within your building.",
    preview: "/bhangar.png",
    live: "https://bhangar.space",
    github: "https://github.com/Practical-APM/bhangar",
  },
  {
    id: "syftin",
    name: "Syftin",
    category: "Community Data Scraping",
    desc: "Desktop assistant that automatically extracts and organizes web research data.",
    preview: "/syftin.png",
    live: "https://syftin.vercel.app",
    github: "https://github.com/Practical-APM/Syftin",
  },
];

/* ─── COMPONENT: Die-Cut MacBook Laptop Sticker (Visual Meme) ───────────── */
function LaptopSticker({
  src,
  alt,
  className = "",
  rotation = "-6deg",
  width = 110,
  height = 110,
}: {
  src: string;
  alt: string;
  className?: string;
  rotation?: string;
  width?: number;
  height?: number;
}) {
  const [wobble, setWobble] = useState(false);

  const triggerWobble = () => {
    setWobble(true);
    setTimeout(() => setWobble(false), 600);
  };

  return (
    <div
      className={`laptop-sticker-wrap ${wobble ? "is-wobbling" : ""} ${className}`}
      style={{ "--sticker-rot": rotation } as React.CSSProperties}
      onClick={triggerWobble}
      onMouseEnter={triggerWobble}
      role="img"
      aria-label={alt}
    >
      <div className="laptop-sticker-diecut" style={{ width, height }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="laptop-sticker-img" />
        <div className="laptop-sticker-sheen" />
      </div>
    </div>
  );
}

/* ─── DATA: Featured Case Studies ─────────────────────────────────────────── */
const caseStudies = [
  {
    id: "hdfc",
    file: "tartan.app / hdfc-bank-onboarding.tsx",
    tags: ["B2B Software", "Banking", "Automation"],
    title: "Cutting HDFC Bank's Corporate Onboarding Time by 60%",
    company: "TartanHQ Solutions · 2025–2026",
    problem: "Opening a corporate salary account with HDFC Bank used to take 12 manual back-and-forth steps between paperwork, compliance checks, and the client, causing days of frustrating wait times and lost signups.",
    ownership: "I mapped the entire signup journey from start to finish, removed unnecessary manual steps, and built an automated online system that replaced paperwork with instant digital approvals.",
    metrics: [
      { num: "60%", label: "Faster Turnaround Time" },
      { num: "12 → 3", label: "Steps Needed" },
      { num: "↓ Drops", label: "Significantly Fewer Abandoned Signups" },
    ],
  },
  {
    id: "hrms",
    file: "tartan.app / enterprise-software-integrations.ts",
    tags: ["Software Connections", "Enterprise", "Zero Downtime"],
    title: "Connecting 90+ Systems for MakeMyTrip & Enterprise Clients",
    company: "TartanHQ Solutions · 2025",
    problem: "Large travel companies like MakeMyTrip needed employee data to automatically sync between their internal HR software and Tartan without servers crashing or data getting lost.",
    ownership: "Led a team of 10 developers to build and test 90+ direct software connections. Prioritized the critical features first so clients launched on time with zero system crashes.",
    metrics: [
      { num: "90+", label: "Software Systems Connected" },
      { num: "10", label: "Developers Led" },
      { num: "0", label: "System Outages or Incidents" },
    ],
  },
  {
    id: "vensure",
    file: "vensure.internal / client-update-automation.json",
    tags: ["Automated Updates", "Client Retention", "Easy Workflows"],
    title: "Helping 20% More Clients Stay by Automating Status Updates",
    company: "Vensure Employer Solutions · 2024–2025",
    problem: "New business clients were canceling early because they were left in the dark about their setup progress, and support teams couldn't manually email hundreds of clients every day.",
    ownership: "Created an automated notification system that sends clients instant milestone alerts, helpful check-ins, and proactive updates the moment a task needs attention.",
    metrics: [
      { num: "20%", label: "Drop in Client Cancellations" },
      { num: "2 Quarters", label: "To Achieve Measured Result" },
      { num: "4 Members", label: "Team Members Mentored" },
    ],
  },
];

/* ─── DATA: Playlists (YouTube Music Tracks) ──────────────────────────────── */
const playlist = [
  {
    title: "Choo Lo",
    artist: "The Local Train",
    album: "Aalas Ka Pedh",
    duration: "3:54",
    youtubeId: "opwZ_PJ-F_E",
  },
  {
    title: "Sajni",
    artist: "Jal - The Band",
    album: "Boondh",
    duration: "5:07",
    youtubeId: "IDOghyqFA8s",
  },
  {
    title: "Chup Chup",
    artist: "Jal - The Band",
    album: "Boondh",
    duration: "6:13",
    youtubeId: "P94A6_ftaWI",
  },
  {
    title: "Bawra",
    artist: "NAALAYAK",
    album: "Main Kaun",
    duration: "5:35",
    youtubeId: "HNCDKtmZt74",
  },
  {
    title: "Tu Hoti Toh",
    artist: "Bharat Chauhan",
    album: "Qurbat",
    duration: "5:34",
    youtubeId: "CyoUiKewD1Q",
  },
];

/* ─── DATA: Tech Stack Dock Items ─────────────────────────────────────────── */
const dockItems = [
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Python", icon: "/icons/python.svg" },
  { name: "Next.js", icon: "/icons/nextjs.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "Supabase", icon: "/icons/supabase.svg" },
  { name: "Prisma", icon: "/icons/prisma.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  { name: "OpenAI", icon: "/icons/openai.svg" },
  { name: "Anthropic", icon: "/icons/anthropic.svg" },
  { name: "Jira", icon: "/icons/jira.svg" },
  { name: "Linear", icon: "/icons/linear.svg" },
  { name: "Figma", icon: "/icons/figma.svg" },
  { name: "Notion", icon: "/icons/notion.svg" },
  { name: "Postman", icon: "/icons/postman.svg" },
  { name: "GitHub", icon: "/icons/github.svg" },
];

/* ─── DATA: Acquired Skills (Point Only) ────────────────────────────────────── */
const skillPillars = [
  {
    num: "01",
    title: "Product Strategy & 0→1",
    points: [
      "Clear Product Specs & Flows",
      "Roadmap & Tradeoff Prioritization",
      "Direct Customer Discovery",
      "Onboarding Activation Loops",
    ],
  },
  {
    num: "02",
    title: "Shipping Complex Projects",
    points: [
      "Enterprise Software Connections",
      "Engineering Team Leadership (Squad of 10)",
      "Cutting Process Turnaround Time (60%)",
      "Predictable Sprint Planning & Delivery",
    ],
  },
  {
    num: "03",
    title: "Data, Numbers & Costs",
    points: [
      "SQL & Funnel Analytics",
      "Cloud & AI Token Cost Tracking",
      "Drop-Off Diagnostics & Retention",
      "Hypothesis Validation & Testing",
    ],
  },
  {
    num: "04",
    title: "Automation & Smart Tools",
    points: [
      "Automated Jira / Linear Ticket Generation",
      "Private On-Device Web Extraction",
      "Automated Customer Milestone Alerts",
      "Early Project Delay Warning Alarms",
    ],
  },
];

/* ─── MAIN COMPONENT ───────────────────────────────────────────────────────── */
export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeNav, setActiveNav] = useState("hero");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [activeDockTech, setActiveDockTech] = useState<string>("TypeScript");
  const [showToast, setShowToast] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Sync theme to root dataset
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Dynamic day & date
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const dateNum = today.getDate();
  const monthName = today.toLocaleDateString("en-US", { month: "short" }).toUpperCase();

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText("baxisakar18@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  }, []);

  const handleOpenCalendly = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (typeof window !== "undefined") {
      const win = window as unknown as {
        Calendly?: {
          initPopupWidget: (options: { url: string }) => void;
        };
      };
      if (win.Calendly && typeof win.Calendly.initPopupWidget === "function") {
        win.Calendly.initPopupWidget({ url: CALENDLY_URL });
        return;
      }
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  }, []);

  const currentTrack = playlist[currentTrackIndex];
  const activeDockItem = dockItems.find((d) => d.name === activeDockTech) || dockItems[0];

  return (
    <>
      {/* ── FLOATING PILL NAVBAR (Sam Dickie Style) ── */}
      <div className="nav-wrap">
        <nav className="nav-pill" role="navigation" aria-label="Main navigation">
          <a
            href="#hero"
            className={`nav-pill-item${activeNav === "hero" ? " active" : ""}`}
            onClick={() => setActiveNav("hero")}
          >
            Home
          </a>
          <a
            href="#work"
            className={`nav-pill-item${activeNav === "work" ? " active" : ""}`}
            onClick={() => setActiveNav("work")}
          >
            Work
          </a>
          <a
            href="#projects"
            className={`nav-pill-item${activeNav === "projects" ? " active" : ""}`}
            onClick={() => setActiveNav("projects")}
          >
            Projects
          </a>
          <a
            href="#skills"
            className={`nav-pill-item${activeNav === "skills" ? " active" : ""}`}
            onClick={() => setActiveNav("skills")}
          >
            Stack &amp; Skills
          </a>
          <a
            href="#off-the-clock"
            className={`nav-pill-item${activeNav === "off-the-clock" ? " active" : ""}`}
            onClick={() => setActiveNav("off-the-clock")}
          >
            Off The Clock
          </a>
          <a
            href="#contact"
            className={`nav-pill-item${activeNav === "contact" ? " active" : ""}`}
            onClick={() => setActiveNav("contact")}
          >
            Contact
          </a>

          <button
            className="theme-toggle-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>

          <button
            onClick={handleOpenCalendly}
            className="nav-contact-btn"
            aria-label="Book 30-min call on Calendly"
          >
            Let&apos;s talk
          </button>
        </nav>
      </div>

      <main>
        {/* ── BENTO HERO SECTION ── */}
        <section id="hero" className="hero-section">
          <div className="container">
            <div className="bento-hero-grid">
              
              {/* Card 1: Warm Human Intro */}
              <div className="bento-card hero-intro-card">
                <div>
                  <h1 className="hero-title">
                    <strong>Sakar</strong> is a Product Manager &amp; Builder based in <strong>Gurugram</strong>.
                  </h1>
                  <p className="hero-body-p">
                    Welcome to my personal corner of the web.
                  </p>
                  <p className="hero-body-p">
                    By day, I&apos;m a <strong>Product Analyst at TartanHQ</strong>, turning tangled enterprise workflows and 12-step bank onboarding journeys into clean, automated products that people actually use.
                  </p>
                  <p className="hero-body-p">
                    Outside of work, I&apos;m an unapologetic nerd at heart. You&apos;ll usually find me backing <strong>Liverpool FC</strong> at all hours, passionately arguing why <em>The Big Bang Theory &gt;&gt;&gt; How I Met Your Mother &gt;&gt;&gt; Friends</em> (not even up for debate), or diving down deep late-night rabbit holes.
                  </p>
                  <p className="hero-body-p">
                    This site is a bento box of how I think, build, and work. Everything is clickable, nothing is breakable. Probably.
                  </p>
                </div>

                <div className="hero-actions-row">
                  <a href="#work" className="btn-pill-primary">
                    See Case Studies
                    <ArrowUpRight />
                  </a>
                  <button
                    onClick={handleOpenCalendly}
                    className="btn-pill-secondary"
                  >
                    <Mail />
                    Book 30-min Call
                  </button>
                </div>
              </div>

              {/* Card 2: Portrait with Siri / Wave Easter Egg */}
              <div className="bento-card portrait-card">
                <div className="portrait-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/profile.jpg"
                    alt="Sakar Baxi"
                    className="portrait-img"
                  />

                  <button
                    className="siri-badge-btn"
                    onClick={() => setShowToast(!showToast)}
                    aria-label="Interactive wave"
                    title="Click for a quick hello"
                  >
                    <div className="siri-orb" />
                  </button>
                </div>
              </div>

              {/* Card 3: Interactive Apple Calendar Widget (Linked to Calendly) */}
              <div className="bento-card calendar-card">
                {/* Header: Date + Live Status + Calendly Quick Icon */}
                <div className="calendar-header">
                  <div className="cal-date-lockup">
                    <span className="cal-day-label">{dayName}</span>
                    <div className="cal-date-row">
                      <span className="cal-date-number">{dateNum}</span>
                      <div className="cal-date-meta">
                        <span className="cal-month-pill">{monthName}</span>
                        <span className="cal-tz-label">IST · Remote</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleOpenCalendly}
                    className="cal-arrow-btn"
                    aria-label="Book a chat on Calendly"
                    title="Book via Calendly"
                  >
                    <ArrowUpRight />
                  </button>
                </div>

                {/* Slots section */}
                <div className="cal-slots-section">
                  <div className="cal-section-tag">
                    <span className="cal-live-dot" />
                    <span>Today&apos;s Schedule</span>
                  </div>
                  <div className="cal-slots-list">
                    <div className="cal-slot-item booked">
                      <div className="cal-slot-meta">
                        <span className="cal-slot-time">10:30 AM</span>
                        <span className="cal-slot-title">B2B Workflow Review</span>
                      </div>
                      <span className="cal-status-tag booked">Booked</span>
                    </div>
                    <div className="cal-slot-item booked">
                      <div className="cal-slot-meta">
                        <span className="cal-slot-time">02:00 PM</span>
                        <span className="cal-slot-title">AI FinOps Sync</span>
                      </div>
                      <span className="cal-status-tag booked">Booked</span>
                    </div>
                    <button
                      onClick={handleOpenCalendly}
                      className="cal-slot-item open"
                      title="Click to reserve this 30-min slot on Calendly"
                    >
                      <div className="cal-slot-meta">
                        <span className="cal-slot-time open-time">04:30 PM</span>
                        <span className="cal-slot-title">30-min Intro Call</span>
                      </div>
                      <span className="cal-status-tag open">Open · Book ↗</span>
                    </button>
                  </div>
                </div>

                {/* Quick Topics to purposefully balance card height */}
                <div className="cal-topics-section">
                  <span className="cal-topics-title">Topics I jam on:</span>
                  <div className="cal-topics-tags">
                    <span className="cal-topic-pill">0→1 Products</span>
                    <span className="cal-topic-pill">Enterprise FinTech</span>
                    <span className="cal-topic-pill">AI Spend / FinOps</span>
                  </div>
                </div>

                {/* Footer Action: Prominent Calendly CTA */}
                <div className="cal-footer-block">
                  <button
                    onClick={handleOpenCalendly}
                    className="cal-booking-cta-btn"
                    title="Open Calendly in a new tab"
                  >
                    <span>Schedule 30 mins</span>
                    <ArrowUpRight />
                  </button>
                  <p className="cal-footer-subtext">
                    Open for coffee, PM advisory, or 0→1 builds.
                  </p>
                </div>
              </div>

            </div>

            {/* ── INTERACTIVE ROW: YOUTUBE MUSIC & NOTES WIDGETS ── */}
            <div className="interactive-widgets-grid">
              
              {/* YouTube Music Player Widget ("Sakar's Rotation") */}
              <div className="bento-card ytm-card">
                <div>
                  <div className="ytm-top">
                    <div className="ytm-brand">
                      <YouTubeMusicIcon />
                      <span>YOUTUBE MUSIC · NERDS UNITED</span>
                    </div>
                    {isPlaying && (
                      <div className="equalizer ytm-equalizer" aria-label="Audio playing">
                        <span className="eq-bar" />
                        <span className="eq-bar" />
                        <span className="eq-bar" />
                        <span className="eq-bar" />
                      </div>
                    )}
                  </div>

                  <div className="ytm-track-now">
                    <div className="album-art ytm-album-art">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${currentTrack.youtubeId}/hqdefault.jpg`}
                        alt={currentTrack.title}
                      />
                      {isPlaying && (
                        <div className="ytm-live-chip">
                          <span className="ytm-pulse-dot" />
                          <span>Playing</span>
                        </div>
                      )}
                    </div>
                    <div className="track-meta">
                      <div className="track-title">{currentTrack.title}</div>
                      <div className="track-artist">
                        {currentTrack.artist} · <em>{currentTrack.album}</em>
                      </div>
                    </div>
                    <div className="ytm-ctrl-actions">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="btn-pill-primary ytm-play-btn"
                        aria-label={isPlaying ? "Pause music" : "Play music"}
                      >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        <span>{isPlaying ? "Pause" : "Play"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actual Real Working YouTube Audio Stream */}
                {isPlaying && (
                  <iframe
                    className="ytm-audio-stream"
                    src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=1&enablejsapi=1&playsinline=1`}
                    title={`${currentTrack.title} by ${currentTrack.artist}`}
                    allow="autoplay; encrypted-media"
                  />
                )}

                <div className="ytm-tracklist">
                  {playlist.map((track, i) => (
                    <button
                      key={track.title}
                      className={`track-item-btn ytm-track-btn${currentTrackIndex === i ? " active" : ""}`}
                      onClick={() => {
                        setCurrentTrackIndex(i);
                        setIsPlaying(true);
                      }}
                    >
                      <div className="ytm-track-left">
                        <span className="ytm-track-indicator">
                          {currentTrackIndex === i && isPlaying ? "▶" : `${i + 1}.`}
                        </span>
                        <span>{track.title} — {track.artist}</span>
                      </div>
                      <span className="ytm-track-duration">{track.duration}</span>
                    </button>
                  ))}
                </div>

                <div className="ytm-footer-row">
                  <a
                    href={`https://music.youtube.com/watch?v=${currentTrack.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ytm-open-link"
                    title={`Open "${currentTrack.title}" on YouTube Music`}
                  >
                    <span>Play on YT Music</span>
                    <ArrowUpRight />
                  </a>
                  {YOUTUBE_MUSIC_PLAYLIST_URL && (
                    <a
                      href={YOUTUBE_MUSIC_PLAYLIST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ytm-open-link secondary"
                      title="Open Nerds United playlist on YouTube Music"
                    >
                      <span>Nerds United Playlist</span>
                      <ArrowUpRight />
                    </a>
                  )}
                </div>
              </div>

              {/* macOS Notes Widget: How I Build */}
              <div className="bento-card notes-card">
                <div className="notes-window-top">
                  <div className="mac-dots">
                    <span className="mac-dot red" />
                    <span className="mac-dot yellow" />
                    <span className="mac-dot green" />
                  </div>
                  <div className="notes-doc-badge">
                    <span>📝 how-i-build.md</span>
                  </div>
                  <div className="notes-status-badge">
                    <span>3 Core Principles</span>
                  </div>
                </div>

                <div className="notes-content-body">
                  <div className="note-item">
                    <span className="note-num">01</span>
                    <div className="note-text-wrap">
                      <strong>Ship a prototype before writing a thesis.</strong> Huge 30-page requirement docs make teams feel productive, but nobody actually reads them. I keep specs down to a single clean page: the core user friction, edge cases, and rough wireframes. If an engineer and I can&apos;t test a rough working demo by day three, the scope is already too bloated.
                    </div>
                  </div>
                  <div className="note-item">
                    <span className="note-num">02</span>
                    <div className="note-text-wrap">
                      <strong>Watch where people quietly get stuck.</strong> You learn ten times more from 15 minutes of watching an ops teammate quietly struggle through an onboarding journey than from two weeks of roadmap slides. The fastest way to make software feel fast is deleting unnecessary steps, not adding explanations.
                    </div>
                  </div>
                  <div className="note-item">
                    <span className="note-num">03</span>
                    <div className="note-text-wrap">
                      <strong>Get under the hood with engineering.</strong> I don&apos;t just drop Figma links in Slack and wait for sprint reviews. Reading API payloads, understanding database tables, and knowing why a query is slow means I can debug alongside engineers at 6 PM instead of filing another vague ticket.
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── WORK / CASE STUDIES DOSSIER ── */}
        <section id="work" className="section-wrapper" aria-labelledby="work-head">
          <div className="container">
            <div className="section-head-with-sticker">
              <div>
                <div className="section-eyebrow-tag">Real Work / Real Impact</div>
                <h2 id="work-head" className="section-head-title">Problems I&apos;ve Solved.<br />Measurable Outcomes.</h2>
                <p className="section-head-desc">
                  Real business problems solved with simple systems and verified impact. No confusing buzzwords, no vague claims.
                </p>
              </div>
              <div className="section-sticker-anchor">
                <LaptopSticker
                  src="/cat.jpg"
                  alt="Side-eye cat meme sticker"
                  rotation="-7deg"
                  width={105}
                  height={105}
                />
              </div>
            </div>

            <div className="case-study-dossier-grid">
              {caseStudies.map((cs) => (
                <article key={cs.id} className="case-dossier-card">
                  <div className="case-card-header">
                    <div className="mac-dots">
                      <span className="mac-dot red" />
                      <span className="mac-dot yellow" />
                      <span className="mac-dot green" />
                    </div>
                    <span className="case-window-title">{cs.file}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-3)" }}>Verified Impact</span>
                  </div>

                  <div className="case-card-content">
                    <div>
                      <div className="case-tags-wrap">
                        {cs.tags.map((t, idx) => (
                          <span key={t} className={`case-badge ${idx === 0 ? "blue" : idx === 1 ? "green" : ""}`}>{t}</span>
                        ))}
                      </div>
                      <h3 className="case-main-h3">{cs.title}</h3>
                      <div className="case-company-sub">{cs.company}</div>
                      
                      <div style={{ marginBottom: "14px" }}>
                        <div style={{ fontSize: "11.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-3)", marginBottom: "4px" }}>The Problem</div>
                        <p className="case-desc-p">{cs.problem}</p>
                      </div>

                      <div>
                        <div style={{ fontSize: "11.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-3)", marginBottom: "4px" }}>What I Owned</div>
                        <p className="case-desc-p">{cs.ownership}</p>
                      </div>
                    </div>

                    <div className="case-metrics-column">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="metric-block">
                          <div className="metric-big-num">{m.num}</div>
                          <div className="metric-sub-label">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHIPPED SIDE BUILDS (REAL PRODUCTS) ── */}
        <section id="projects" className="section-wrapper" aria-labelledby="projects-head">
          <div className="container">
            <div className="section-head-with-sticker">
              <div>
                <div className="section-eyebrow-tag">Practical-APM / Shipped Projects</div>
                <h2 id="projects-head" className="section-head-title">Built Outside Work.<br />Working Apps for Real People.</h2>
                <p className="section-head-desc">
                  All 6 live products and open-source projects from <a href="https://github.com/Practical-APM" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-1)", textDecoration: "underline" }}>github.com/Practical-APM</a>. Real code, real users, real problems solved.
                </p>
              </div>
              <div className="section-sticker-anchor">
                <LaptopSticker
                  src="/monkey.png"
                  alt="Monkey clutching head meme sticker"
                  rotation="-8deg"
                  width={125}
                  height={125}
                />
              </div>
            </div>

            <div className="apps-bento-grid">
              {sideProjects.map((proj) => (
                <article key={proj.id} className="app-widget-card">
                  <div className="app-preview-pane">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={proj.preview} alt={`${proj.name} preview`} />
                    <div className="app-preview-glass" aria-hidden="true" />
                  </div>
                  <div className="app-body-pane">
                    <div className="app-title-row">
                      <h3 className="app-name">{proj.name}</h3>
                      <span className="app-category-badge">{proj.category}</span>
                    </div>
                    <p className="app-desc-p">{proj.desc}</p>
                    <div className="app-actions-row">
                      {proj.live && (
                        <a href={proj.live} target="_blank" rel="noopener noreferrer" className="app-link-btn primary">
                          <ArrowUpRight /> Launch App
                        </a>
                      )}
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noopener noreferrer" className="app-link-btn">
                          <Github /> Source Repo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH DOCK & ACQUIRED SKILLS ── */}
        <section id="skills" className="section-wrapper" aria-labelledby="skills-head">
          <div className="container">
            <div className="section-head-with-sticker">
              <div>
                <div className="section-eyebrow-tag">How I Work</div>
                <h2 id="skills-head" className="section-head-title">Hands-On Tech Stack &<br />Everyday Product Skills.</h2>
                <p className="section-head-desc">
                  Tools I build with daily, backed by clear communication and dependable execution. Hover any icon in the dock to inspect tools.
                </p>
              </div>
              <div className="section-sticker-anchor">
                <LaptopSticker
                  src="/disaster.jpg"
                  alt="Disaster Sakar meme sticker"
                  rotation="7deg"
                  width={115}
                  height={115}
                />
              </div>
            </div>

            {/* Apple macOS Interactive Dock */}
            <div className="dock-wrap-container">
              <div className="macos-dock" role="toolbar" aria-label="Tech Stack Dock">
                {dockItems.map((item) => (
                  <button
                    key={item.name}
                    className="dock-item-btn"
                    onClick={() => setActiveDockTech(item.name)}
                    onMouseEnter={() => setActiveDockTech(item.name)}
                    aria-label={item.name}
                    title={item.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.icon} alt={item.name} className="dock-icon-img" />
                  </button>
                ))}
              </div>

              <div className="dock-active-info">
                <span className="dock-active-dot" />
                <span>{activeDockItem.name}</span>
              </div>
            </div>

            {/* Acquired Skills 4 Pillars (Points Only) */}
            <div className="pillars-bento-grid">
              {skillPillars.map((pillar) => (
                <div key={pillar.title} className="pillar-bento-card">
                  <div className="pillar-top-num">{pillar.num} / PM CORE</div>
                  <h3 className="pillar-card-title">{pillar.title}</h3>

                  <div className="pillar-points-list">
                    {pillar.points.map((pt) => (
                      <div key={pt} className="pillar-point-item">
                        <span className="pillar-bullet" aria-hidden="true" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── OFF THE CLOCK / PASSIONS & LIFE ── */}
        <section id="off-the-clock" className="section-wrapper" aria-labelledby="off-clock-head">
          <div className="container">
            <div className="section-head-with-sticker">
              <div>
                <div className="section-eyebrow-tag">Life Outside The Terminal</div>
                <h2 id="off-clock-head" className="section-head-title">
                  Off The Clock.<br />Passions, Debates &amp; Rabbit Holes.
                </h2>
                <p className="section-head-desc">
                  What keeps me energised, intensely curious, and occasionally arguing on the internet once the laptop closes.
                </p>
              </div>
            </div>

            <div className="off-clock-grid">
              {/* Card 1: Liverpool FC */}
              <div className="off-clock-card liverpool-card">
                <div className="off-clock-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/interests/klopp_fist_pump.gif"
                    alt="Jurgen Klopp iconic triple fist pump celebration in front of the Kop at Anfield"
                    className="off-clock-img"
                  />
                  <div className="off-clock-media-overlay" />
                  <div className="off-clock-badge lfc-badge">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/interests/liverpool.png" alt="Liverpool FC Crest" className="lfc-crest-mini" />
                    <span>Reds · Anfield</span>
                  </div>
                </div>
                <div className="off-clock-content">
                  <div className="off-clock-title-row">
                    <h3 className="off-clock-card-title">Liverpool FC</h3>
                    <span className="off-clock-tag">YNWA</span>
                  </div>
                  <p className="off-clock-desc">
                    Passionate LFC fan. I will watch the 2006 Istanbul final for the 100th time and still celebrate like it's the first time. YNWA.
                  </p>
                </div>
              </div>

              {/* Card 2: The Sitcom Hierarchy */}
              <div className="off-clock-card sitcom-card">
                <div className="off-clock-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/interests/sheldon_bazinga.gif"
                    alt="Sheldon Cooper pointing with a smile: Bazinga!"
                    className="off-clock-img"
                  />
                  <div className="off-clock-media-overlay" />
                  <div className="off-clock-badge tier-badge">
                    <span>⚡️ Undisputed Ranking</span>
                  </div>
                </div>
                <div className="off-clock-content">
                  <div className="off-clock-title-row">
                    <h3 className="off-clock-card-title">The Sitcom Hierarchy</h3>
                    <span className="off-clock-tag">TBBT &gt;&gt;&gt; HIMYM &gt;&gt;&gt; Friends</span>
                  </div>
                  <p className="off-clock-desc">
                    No point discussing why: <em>The Big Bang Theory</em> &gt;&gt;&gt; <em>How I Met Your Mother</em> &gt;&gt;&gt; <em>Friends</em>. Being a STEM nerd comes with it's own perks
                  </p>
                </div>
              </div>

              {/* Card 3: Late-Night Reading & Rabbit Holes */}
              <div className="off-clock-card reading-card">
                <div className="off-clock-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/interests/cat_military_strategy.gif"
                    alt="Orange and white cat intently reading The Art of Military Strategy"
                    className="off-clock-img"
                  />
                  <div className="off-clock-media-overlay" />
                  <div className="off-clock-badge book-badge">
                    <span>📖 On The Nightstand</span>
                  </div>
                </div>
                <div className="off-clock-content">
                  <div className="off-clock-title-row">
                    <h3 className="off-clock-card-title">Late-Night Reading</h3>
                    <span className="off-clock-tag">1984 &amp; Medium articles</span>
                  </div>
                  <p className="off-clock-desc">
                    Currently re-reading George Orwell’s <em>1984</em> alongside latest patent filings. Fascinated by tech, philosophy, psychology and more.
                  </p>
                </div>
              </div>

              {/* Card 4: Soundtrack & Focus Rotation */}
              <div className="off-clock-card music-card">
                <div className="off-clock-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/interests/kid_dancing_club.gif"
                    alt="Kid with sunglasses bouncing excitedly in the club"
                    className="off-clock-img"
                  />
                  <div className="off-clock-media-overlay" />
                  <div className="off-clock-badge music-badge">
                    <span>🎸 Daily Fuel</span>
                  </div>
                </div>
                <div className="off-clock-content">
                  <div className="off-clock-title-row">
                    <h3 className="off-clock-card-title">Soundtrack &amp; Indie Rotation</h3>
                    <span className="off-clock-tag">Indie Rock &amp; Focus</span>
                  </div>
                  <p className="off-clock-desc">
                    2000s indie rock on heavy rotation (The Local Train, Jal, Silk Route, The Strokes, Arctic Monkeys) paired with deep-focus downtempo when shipping code late into the night.
                  </p>
                  <div className="off-clock-footer-action">
                    <a
                      href="#hero"
                      className="off-clock-player-link"
                      onClick={() => {
                        setCurrentTrackIndex(0);
                        setIsPlaying(true);
                      }}
                    >
                      <span>Listen on rotation player ↑</span>
                      <ArrowUpRight />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT BENTO ── */}
        <section id="contact" className="section-wrapper" aria-labelledby="contact-head">
          <div className="container">
            <div className="contact-bento-card">
              <h2 id="contact-head" className="contact-h2">Got a product problem? Let&apos;s talk.</h2>
              <p className="contact-sub-p">
                Whether you&apos;re looking to hire a Product Manager, need feedback on an early idea, or just want to chat about building simple software—I&apos;d love to connect.
              </p>

              <div className="contact-chips-bar">
                <button
                  onClick={handleOpenCalendly}
                  className="contact-chip-link primary"
                  aria-label="Book 30-min call on Calendly"
                >
                  <ArrowUpRight />
                  <span>Book a Call</span>
                </button>

                <button
                  onClick={handleCopyEmail}
                  className="contact-chip-link copy-email-toast-btn"
                  aria-label="Copy email address"
                >
                  <Mail />
                  <span>{emailCopied ? "✓ Email Copied!" : "baxisakar18@gmail.com"}</span>
                </button>

                <a
                  href="https://linkedin.com/in/sakar-baxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-chip-link"
                >
                  <Linkedin />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://github.com/Practical-APM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-chip-link"
                >
                  <Github />
                  <span>GitHub</span>
                </a>

                <a
                  href="mailto:baxisakar18@gmail.com?subject=Product%20Chat"
                  className="contact-chip-link"
                >
                  <span>Drop an Email ↗</span>
                </a>
              </div>
            </div>

            <footer className="footer-bar" role="contentinfo">
              <span>© {new Date().getFullYear()} Sakar Baxi · Built with love · Gurugram, India</span>
              <div style={{ display: "flex", gap: "16px" }}>
                <a href="#hero">Back to top ↑</a>
                <a href="https://github.com/Practical-APM" target="_blank" rel="noopener noreferrer">Practical-APM</a>
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* ── SIRI / WAVE EASTER EGG TOAST ── */}
      {showToast && (
        <div className="toast-msg-bubble" role="dialog" aria-label="Friendly greeting">
          <div className="toast-avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/profile.jpg" alt="Sakar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="toast-content-title">Sakar Baxi · Hey there! 👋</div>
            <div className="toast-content-p">
              Glad you poked around the widgets! Drop me a note at <strong>baxisakar18@gmail.com</strong> or hit play on the Strokes track above.
            </div>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="toast-close-btn"
            aria-label="Close message"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
