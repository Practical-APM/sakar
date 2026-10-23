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

const SkipBackIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" strokeWidth={2.5} />
  </svg>
);

const SkipForwardIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" strokeWidth={2.5} />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const Volume2 = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const VolumeX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const CALENDLY_URL = "https://calendly.com/baxi_ji/introduction-call";
const YOUTUBE_MUSIC_PLAYLIST_URL = "https://music.youtube.com/playlist?list=PLeOmZiGno4Uk&si=Dy0OPDSHLAfQGm0Z";

/* ─── Web Audio API Synthesizer for Tactile Haptic Sound Feedback ────────── */
function playTactileSound(type: "click" | "pop" | "toggle" | "copy" = "click", force = false) {
  if (typeof window === "undefined") return;
  if (!force) {
    try {
      if (localStorage.getItem("portfolio-sound") === "false") return;
    } catch {}
  }
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "pop") {
      // Gentle bubble pop (for stickers)
      osc.type = "sine";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.05);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.start(now);
      osc.stop(now + 0.07);
    } else if (type === "toggle") {
      // Soft toggle click
      osc.type = "triangle";
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.05);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "copy") {
      // Crisp two-tone harmonic success chime
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.04);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else {
      // Crisp mechanical keyclick
      osc.type = "sine";
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.start(now);
      osc.stop(now + 0.035);
    }
  } catch {
    // Graceful fallback
  }
}

/* ─── DATA: Shipped Side Projects ─────────────────────────────────────────── */
const sideProjects = [
  {
    id: "beacon",
    name: "Beacon",
    category: "B2B SaaS · Onboarding Risk",
    tag: "B2B / Workflow",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "OAuth"],
    desc: "Open-source risk engine that connects Salesforce, Jira, Slack, and Google Calendar to predict client onboarding delays before subscription revenue slips.",
    preview: "/beacon.png",
    live: "https://covalynce-beacon.vercel.app/",
    github: "https://github.com/Practical-APM/Beacon",
  },
  {
    id: "ledger",
    name: "Ledger",
    category: "AI FinOps · Spend Visibility",
    tag: "AI & FinOps",
    tech: ["React", "Chart.js", "OpenAI", "Anthropic", "Gemini API"],
    desc: "Consolidated financial dashboard tracking organization-wide AI costs across OpenAI, Anthropic, and Gemini before the monthly invoice arrives.",
    preview: "/ledger.png",
    live: "https://covalynce-ledger.vercel.app/",
    github: "https://github.com/Practical-APM/Covalynce",
  },
  {
    id: "echo",
    name: "Echo",
    category: "Developer Tools · Changelogs",
    tag: "AI & FinOps",
    tech: ["TypeScript", "GitHub API", "OpenAI", "Linear", "CLI"],
    desc: "Event-driven orchestrator that analyzes merged PRs and closed sprints to automatically generate customer changelogs and launch announcements.",
    preview: "/echo.png",
    live: "https://covalynce-echo.vercel.app/",
    github: "https://github.com/Practical-APM/Covalynce",
  },
  {
    id: "knuud",
    name: "Knuud",
    category: "Product Ops · PRD Alignment",
    tag: "AI & FinOps",
    tech: ["Next.js", "Claude/GPT-4", "Linear API", "Jira", "Zendesk"],
    desc: "Reads one product PRD from Notion or Docs and instantly generates synchronized, production-ready specs for Engineering, QA, Support, and Marketing.",
    preview: "/knuud.png",
    live: "https://knuud.space",
    github: "https://github.com/Practical-APM/knuud",
  },
  {
    id: "bhangar",
    name: "Bhangar.space",
    category: "Hyperlocal Marketplace",
    tag: "Community",
    tech: ["Next.js", "PostgreSQL", "Supabase", "Leaflet"],
    desc: "Gated resident marketplace for apartment societies to buy, sell, or giveaway bulky furniture and appliances with zero shipping or packaging friction.",
    preview: "/bhangar.png",
    live: "https://bhangar.space",
    github: "https://github.com/Practical-APM/bhangar",
  },
  {
    id: "syftin",
    name: "Syftin",
    category: "Data Pipelines · Web Extraction",
    tag: "B2B / Workflow",
    tech: ["TypeScript", "Next.js", "Node.js", "S3/GCS", "RazorpayX"],
    desc: "Structured web data platform delivering privacy-screened pricing, registry, and job market datasets directly via Webhooks, REST API, or S3/GCS.",
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
    playTactileSound("pop");
    setWobble(true);
    setTimeout(() => setWobble(false), 600);
  };

  return (
    <div
      className={`laptop-sticker-wrap ${wobble ? "is-wobbling" : ""} ${className}`}
      style={
        {
          "--sticker-rot": rotation,
          "--sticker-w": `${width}px`,
          "--sticker-h": `${height}px`,
        } as React.CSSProperties
      }
      onClick={triggerWobble}
      onMouseEnter={triggerWobble}
      role="img"
      aria-label={alt}
    >
      <div className="laptop-sticker-diecut">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="laptop-sticker-img" loading="lazy" decoding="async" />
        <div className="laptop-sticker-sheen" />
      </div>
    </div>
  );
}

/* ─── INTERFACE & DATA: Featured Case Studies ──────────────────────────────── */
interface CaseStudy {
  id: string;
  category: "Enterprise Work" | "Shipped Products";
  file: string;
  tags: string[];
  title: string;
  company: string;
  live?: string;
  github?: string;
  problem: string;
  ownership: string;
  metrics: { num: string; label: string }[];
  deepDive: {
    headline: string;
    context: string;
    timeline: string;
    architectureSteps: { step: string; title: string; desc: string }[];
    tradeoffs: { decision: string; chosen: string; why: string }[];
    pmOwnership: { area: string; detail: string }[];
    impactDetails: { label: string; value: string; context: string }[];
  };
}

const caseStudies: CaseStudy[] = [
  {
    id: "hdfc",
    category: "Enterprise Work",
    file: "tartan.app / hdfc-bank-onboarding.tsx",
    tags: ["Fintech / Banking", "Digital KYC", "Process Re-engineering"],
    title: "Digitizing Corporate Salary Onboarding for HDFC Bank",
    company: "TartanHQ Solutions · 2025–2026",
    problem: "Corporate salary account onboarding relied on branch visits, manual paper KYC, and physical courier handoffs. A 7–10 day turnaround caused over 40% of newly hired employees to abandon their setup before account activation.",
    ownership: "Owned product definition and execution end-to-end: negotiated API security clearance with HDFC risk leadership, designed a 3-step digital KYC journey with edge-based Aadhaar masking, and drove engineering through bank security audits.",
    metrics: [
      { num: "60%", label: "Faster Turnaround (7–10 Days → <30 Mins)" },
      { num: "12 → 3", label: "Steps in Onboarding Flow" },
      { num: "40%↓", label: "Drop in Account Activation Churn" },
    ],
    deepDive: {
      headline: "Digitizing corporate salary onboarding for HDFC Bank—replacing physical paperwork with a compliant, instant 3-step mobile journey.",
      context: "Corporate HR teams were manually handling employee rosters, physical KYC dossiers, and courier coordination with branch managers. For enterprise HRs, delayed salary accounts meant payroll processing delays; for the bank, it meant high operational overhead and customer dissatisfaction.",
      timeline: "Q1–Q4 2025 · 4 Sprints to MVP · Bank-Wide General Availability",
      architectureSteps: [
        {
          step: "01",
          title: "Bulk Employee Ingestion",
          desc: "HR uploads joining rosters via CSV or API; new hires instantly receive secure, expiring self-serve onboarding links.",
        },
        {
          step: "02",
          title: "Edge-Verified Digital KYC",
          desc: "Instant OCR extraction for PAN and Aadhaar. Masking runs on the client device prior to upload to comply with RBI data privacy mandates.",
        },
        {
          step: "03",
          title: "Asynchronous Core Banking Sync",
          desc: "Dispatches validated payloads to HDFC gateway with status webhooks, provisioning active salary accounts in under 30 minutes.",
        },
      ],
      tradeoffs: [
        {
          decision: "Direct Synchronous API vs Asynchronous Job Queue",
          chosen: "Job Queue with Status Webhooks",
          why: "Bank API response latencies fluctuate heavily during morning peak hours. Decoupling the user session prevented client timeouts and eliminated duplicate submissions.",
        },
        {
          decision: "Server-Side Redaction vs Client-Side Edge Masking",
          chosen: "Client-Side Edge Masking",
          why: "Transmitting raw Aadhaar numbers through our servers would trigger heavy regulatory and compliance burdens. Masking in the browser ensured zero unmasked identity storage.",
        },
      ],
      pmOwnership: [
        {
          area: "Bank Risk & Compliance Clearance",
          detail: "Spearheaded architecture reviews with HDFC InfoSec and compliance teams, securing security sign-offs without roadmap slippage.",
        },
        {
          area: "Mock Banking Gateway for QA",
          detail: "Spearheaded internal mock bank test environments, allowing engineering to simulate gateway timeouts and edge failures without waiting for bank sandbox access.",
        },
        {
          area: "Phased Enterprise Rollout",
          detail: "Piloted with 5 select corporate accounts, monitoring drop-off telemetry at each funnel stage before enabling general availability.",
        },
      ],
      impactDetails: [
        { label: "Turnaround Time", value: "60% Reduction", context: "From 7–10 business days down to under 30 minutes." },
        { label: "Process Simplification", value: "12 → 3 Steps", context: "Replaced in-person paperwork with a responsive self-serve mobile flow." },
        { label: "Security & Audits", value: "0 Non-Compliances", context: "Clean sign-off from HDFC internal security and RBI audit checks." },
      ],
    },
  },
  {
    id: "hrms",
    category: "Enterprise Work",
    file: "tartan.app / enterprise-software-integrations.ts",
    tags: ["Enterprise Integrations", "Data Pipelines", "API Infrastructure"],
    title: "Scaling 90+ HRMS Integrations for MakeMyTrip & Enterprise Clients",
    company: "TartanHQ Solutions · 2025",
    problem: "Enterprise clients like MakeMyTrip rely on disparate HR tools (Workday, Darwinbox, SAP) with custom schemas and strict rate limits. Out-of-sync payroll records and pipeline failures caused immediate payroll processing blockers.",
    ownership: "Product lead for Tartan's integration platform. Led a 10-engineer squad to design a unified intermediate data schema across 90+ HRMS vendors, built auto-throttling connectors, and created a self-serve test sandbox that cut enterprise client go-live time from 6 weeks to 4 days.",
    metrics: [
      { num: "90+", label: "Enterprise Connectors Shipped" },
      { num: "10 Devs", label: "Cross-Functional Squad Led" },
      { num: "100%", label: "Pipeline Uptime During Peak Surges" },
    ],
    deepDive: {
      headline: "Standardizing 90+ fragmented enterprise HR platforms into a unified, high-reliability data synchronization engine.",
      context: "MakeMyTrip and other enterprise customers maintain complex employee hierarchies across multiple systems. Each vendor has different payload formats, token lifetimes, and throttling limits, leading to fragile point-to-point connections.",
      timeline: "2025 · Product Lead across 3 engineering pods",
      architectureSteps: [
        {
          step: "01",
          title: "Dynamic Vendor Ingestion",
          desc: "Ingests employee updates across diverse vendor webhook and polling protocols without saturating partner rate limits.",
        },
        {
          step: "02",
          title: "Canonical Intermediate Schema",
          desc: "Normalizes 90+ proprietary vendor payloads into a canonical JSON model, decoupling downstream business logic from source quirks.",
        },
        {
          step: "03",
          title: "Circuit-Breaking & Auto-Backoff",
          desc: "Automatically isolates failing third-party endpoints and retries with exponential backoff, preventing cascade failures.",
        },
      ],
      tradeoffs: [
        {
          decision: "Unified Intermediate Schema vs Point-to-Point Mappings",
          chosen: "Canonical Intermediate Schema",
          why: "Point-to-point adapters scale quadratically (N×M). A unified schema reduced integration maintenance overhead by over 80% and enabled rapid onboarding of new vendors.",
        },
        {
          decision: "Third-Party API Rate Limit Management",
          chosen: "Distributed Token Bucket Throttling",
          why: "Protected both our infrastructure and client API quotas from spikes, avoiding vendor account blacklisting during high-volume sync windows.",
        },
      ],
      pmOwnership: [
        {
          area: "Squad Execution & Roadmap",
          detail: "Drove sprint planning, technical specs, and interface contracts for 10 engineers across 3 squads, delivering all scheduled connectors on time.",
        },
        {
          area: "Developer Sandbox & Onboarding",
          detail: "Conceived and launched an interactive test harness with synthetic HR payloads, shrinking enterprise integration onboarding from 6 weeks to 4 days.",
        },
        {
          area: "Peak Load Testing",
          detail: "Executed chaos testing and load simulations up to 10× baseline concurrency ahead of holiday booking spikes, ensuring zero downtime for MakeMyTrip.",
        },
      ],
      impactDetails: [
        { label: "Ecosystem Breadth", value: "90+ Integrations", context: "Comprehensive coverage across HRMS, payroll, and ERP enterprise vendors." },
        { label: "Reliability", value: "Zero Outages", context: "Zero sync interruptions during peak holiday hiring and booking periods." },
        { label: "Client Time-to-Value", value: "6 Weeks → 4 Days", context: "Interactive sandbox eliminated manual integration engineering bottlenecks." },
      ],
    },
  },
  {
    id: "vensure",
    category: "Enterprise Work",
    file: "vensure.internal / client-update-automation.json",
    tags: ["Client Retention", "Workflow Automation", "Enterprise SaaS"],
    title: "Reducing Client Onboarding Churn by 20% Through Event-Driven Automation",
    company: "Vensure Employer Solutions · 2024–2025",
    problem: "During the 60-day client implementation window, accounts suffered a 20% early cancellation rate due to lack of visibility. Account managers were trapped in 15+ hours of manual weekly status inquiries instead of resolving onboarding roadblocks.",
    ownership: "Interviewed 25 churned clients and customer ops teams to isolate drop-off points. Designed and launched an event-driven status tracking platform with batched milestone digests and passwordless tracking links, dropping early churn by 20% across two consecutive quarters.",
    metrics: [
      { num: "20%", label: "Reduction in Onboarding Churn" },
      { num: "15 hrs/wk", label: "Saved per Account Manager" },
      { num: "4 Mentees", label: "Associate PMs & Analysts Mentored" },
    ],
    deepDive: {
      headline: "Transforming opaque 60-day enterprise onboarding into transparent, event-driven client milestones.",
      context: "Client implementation was a black box. Clients didn't know what task was pending or who owned the next step. Support teams handled hundreds of repetitive tickets, while preventable delays triggered early account cancellations.",
      timeline: "2024–2025 · 2 Consecutive Fiscal Quarters",
      architectureSteps: [
        {
          step: "01",
          title: "Workflow Event Ingestion",
          desc: "Listens for task completion and dependency triggers across Jira, CRM, and internal ops databases.",
        },
        {
          step: "02",
          title: "Intelligent Digest Bundling",
          desc: "Consolidates rapid sequential updates within rolling 30-minute windows, replacing inbox clutter with concise progress summaries.",
        },
        {
          step: "03",
          title: "Frictionless Client Tracker",
          desc: "Dispatches contextual notifications via email and Slack with magic-link access to real-time setup dashboards.",
        },
      ],
      tradeoffs: [
        {
          decision: "Passwordless Magic Links vs Required Portal Accounts",
          chosen: "Expiring Signed Magic Links",
          why: "Clients rarely remembered portal credentials during onboarding. Frictionless 1-click links increased client engagement with setup checklists by 340%.",
        },
        {
          decision: "Instant Granular Alerts vs Rolling Digest Window",
          chosen: "30-Minute Rolling Digest",
          why: "Prevented alert fatigue when onboarding reps closed several checklist items in quick succession.",
        },
      ],
      pmOwnership: [
        {
          area: "Customer Journey Mapping",
          detail: "Conducted qualitative discovery across 25 accounts and 12 implementation leads, identifying 3 key friction drop-off points in weeks 2 and 4.",
        },
        {
          area: "Cross-Functional Team Mentorship",
          detail: "Mentored 4 associate PMs and data analysts on user research synthesis, PRD writing, and instrumentation standards.",
        },
        {
          area: "Leadership Telemetry",
          detail: "Built automated cohort tracking dashboards for executive leadership, reporting time-to-first-value and churn metrics weekly.",
        },
      ],
      impactDetails: [
        { label: "Client Churn", value: "20% Reduction", context: "Sustained across two consecutive quarters of implementation cohorts." },
        { label: "Ops Time Saved", value: "15 Hours / Week", context: "Per account manager, redirected from status emails to proactive onboarding." },
        { label: "Client Engagement", value: "+340%", context: "Increase in client checklist completion through passwordless progress links." },
      ],
    },
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
  { name: "TypeScript", icon: "/icons/typescript.svg", desc: "Type-safe web apps & backend logic" },
  { name: "Python", icon: "/icons/python.svg", desc: "Data scripts, scraping & LLM pipelines" },
  { name: "Next.js", icon: "/icons/nextjs.svg", desc: "Production React framework & SSR" },
  { name: "React", icon: "/icons/react.svg", desc: "Interactive reactive components" },
  { name: "Node.js", icon: "/icons/nodejs.svg", desc: "Backend runtime & microservices" },
  { name: "PostgreSQL", icon: "/icons/postgresql.svg", desc: "Relational data & structured schemas" },
  { name: "Docker", icon: "/icons/docker.svg", desc: "Containerized reproducible setups" },
  { name: "Supabase", icon: "/icons/supabase.svg", desc: "Auth, database & real-time sync" },
  { name: "Prisma", icon: "/icons/prisma.svg", desc: "Type-safe ORM & database migrations" },
  { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg", desc: "Rapid responsive interface styling" },
  { name: "OpenAI", icon: "/icons/openai.svg", desc: "Embeddings, GPT-4o & function calling" },
  { name: "Anthropic", icon: "/icons/anthropic.svg", desc: "Claude models for reasoning tasks" },
  { name: "Jira", icon: "/icons/jira.svg", desc: "Enterprise sprint tracking & epics" },
  { name: "Linear", icon: "/icons/linear.svg", desc: "Fast-cycle issue & roadmap tracking" },
  { name: "Figma", icon: "/icons/figma.svg", desc: "User journeys, wireframes & specs" },
  { name: "Notion", icon: "/icons/notion.svg", desc: "PRDs, team docs & knowledge bases" },
  { name: "Postman", icon: "/icons/postman.svg", desc: "API testing, docs & endpoint mocks" },
  { name: "GitHub", icon: "/icons/github.svg", desc: "Git branches, CI/CD & open-source" },
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
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [commandSelectedIndex, setCommandSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [istTime, setIstTime] = useState("");
  const [selectedProjectTag, setSelectedProjectTag] = useState<string>("All");
  const [copiedCaseId, setCopiedCaseId] = useState<string | null>(null);
  const [activeNotesTab, setActiveNotesTab] = useState<"principles" | "framework" | "recruiter">("principles");
  const [summaryCopied, setSummaryCopied] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeCopied, setResumeCopied] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const [isStackPaused, setIsStackPaused] = useState(false);

  // Auto-rotate stacked case studies every 6 seconds unless hovered/paused
  useEffect(() => {
    if (isStackPaused) return;
    const timer = setInterval(() => {
      setActiveStackIndex((prev) => (prev + 1) % caseStudies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isStackPaused]);

  const [bouncingTech, setBouncingTech] = useState<string | null>(null);

  // Initialize theme & sound preference from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTheme("light");
      }
      const savedSound = localStorage.getItem("portfolio-sound");
      if (savedSound !== null) {
        setSoundEnabled(savedSound === "true");
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync theme to root dataset
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    playTactileSound("toggle");
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("portfolio-theme", next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("portfolio-sound", String(next));
      } catch {
        // ignore
      }
      if (next) {
        playTactileSound("toggle", true);
      }
      return next;
    });
  }, []);

  const handleDockClick = (techName: string) => {
    playTactileSound("click");
    setActiveDockTech(techName);
    setBouncingTech(techName);
    setTimeout(() => {
      setBouncingTech((curr) => (curr === techName ? null : curr));
    }, 600);
  };

  // Scroll-spy: Sync active nav pill with current viewport section
  useEffect(() => {
    const sectionIds = ["hero", "work", "projects", "skills", "off-the-clock", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topId = visibleEntries[0].target.id;
          setActiveNav(topId);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Mobile nav auto-scroll: keep the active pill centered in horizontal scroll
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 768) return;
    const navPill = document.querySelector(".nav-pill");
    const activeItem = navPill?.querySelector(".nav-pill-item.active");
    if (navPill && activeItem) {
      activeItem.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeNav]);

  // Live IST Clock (Gurugram local time)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setIstTime(timeStr);
      } catch {
        // fallback
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll progress & back-to-top detection
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const pct = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(pct);
        setShowBackToTop(window.scrollY > 400);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic day & date
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const dateNum = today.getDate();
  const monthName = today.toLocaleDateString("en-US", { month: "short" }).toUpperCase();

  const handleCopyEmail = useCallback(() => {
    playTactileSound("copy");
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText("baxisakar18@gmail.com").catch(() => {});
      }
    } catch {
      // fallback
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  }, []);

  const handleOpenCalendly = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    playTactileSound("click");
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

  const handleCopyCaseLink = useCallback((caseId: string) => {
    playTactileSound("copy");
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#case-${caseId}`;
      try {
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(url).catch(() => {});
        }
      } catch {
        // fallback
      }
      setCopiedCaseId(caseId);
      setTimeout(() => setCopiedCaseId(null), 2000);
    }
  }, []);

  const handleCopyRecruiterSummary = useCallback(() => {
    playTactileSound("copy");
    const summary = `Sakar Baxi — Product Manager & Builder (TartanHQ)\n• Impact: Led squad of 10 engineers across 90+ enterprise integrations (MakeMyTrip), digitized HDFC Bank corporate onboarding (reduced turnaround by 60% from 7–10 days to <30 mins).\n• Shipped: 6 production web applications (Beacon, Ledger, Echo, Knuud, Bhangar.space, Syftin).\n• Focus: B2B SaaS, enterprise API infrastructure, banking workflows, AI FinOps & 0→1 products.\n• Portfolio: https://sakarbaxi.com · Email: baxisakar18@gmail.com`;
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(summary).catch(() => {});
      }
    } catch {
      // fallback
    }
    setSummaryCopied(true);
    setTimeout(() => setSummaryCopied(false), 2200);
  }, []);

  const RESUME_PLAINTEXT = `SAKAR BAXI
Product Manager & Builder · Gurugram, India
baxisakar18@gmail.com · https://linkedin.com/in/sakar-baxi · https://github.com/Practical-APM · https://sakarbaxi.com

PROFESSIONAL SUMMARY
Product Manager with hands-on technical depth delivering scalable enterprise integrations and automated onboarding products. Proven track record leading a cross-functional squad of 10 engineers across 90+ enterprise connectors (MakeMyTrip), cutting corporate banking onboarding turnaround time by 60% with HDFC Bank, and actively shipping production-ready web applications.

CAREER HIGHLIGHTS
• 60% Faster Turnaround: Digitized corporate salary onboarding for HDFC Bank from 12 steps down to a 3-step digital journey.
• 90+ Enterprise Integrations: Led squad of 10 engineers to build, test, and launch 90+ connectors for enterprise clients including MakeMyTrip with 100% pipeline uptime.
• 20% Churn Reduction: Designed event-driven status tracking engine at Vensure, reducing 60-day client onboarding drop-offs across two consecutive quarters.
• 6 Shipped Live Products: Built and launched Beacon, Ledger, Echo, Knuud, Bhangar.space, and Syftin.

EXPERIENCE
Product Analyst — TartanHQ Solutions (2025 – Present) · Gurugram, India
• HDFC Bank Corporate Onboarding: Digitized corporate salary account onboarding from 12 physical paperwork steps down to 3 digital approvals. Negotiated API security clearance with HDFC risk leadership, accelerating turnaround by 60% (7–10 days to <30 mins) and cutting onboarding churn by 40%.
• Enterprise System Integrations: Product lead for Tartan's integration platform. Led a 10-engineer squad delivering 90+ connectors for enterprise clients (e.g. MakeMyTrip). Designed a canonical intermediate schema and interactive developer sandbox that compressed client go-live time from 6 weeks to 4 days.

Product Operations Specialist — Vensure Employer Solutions (2024 – 2025)
• Client Setup Automation: Designed and rolled out an event-driven status tracking platform with batched milestone digests, reducing 60-day client onboarding churn by 20% and saving 15 hours weekly per account manager.
• Mentored 4 associate PMs and data analysts on qualitative discovery, PRD writing, and telemetry instrumentation.

SHIPPED PRODUCTS & OPEN SOURCE (Practical-APM)
• Beacon: Real-time alerts before client onboarding projects fall behind schedule. (https://covalynce-beacon.vercel.app/)
• Ledger: Live dashboard monitoring organizational AI token spend before surprise bills arrive. (https://covalynce-ledger.vercel.app/)
• Echo: Automated engine converting code diffs into customer-ready release notes. (https://covalynce-echo.vercel.app/)
• Knuud: Spec-to-ticket compiler converting PRD documents into Jira/Linear engineering backlogs. (https://knuud.space)
• Bhangar.space: Hyperlocal marketplace for residential communities. (https://bhangar.space)
• Syftin: Desktop assistant that extracts and organizes web research data. (https://syftin.vercel.app)

SKILLS & TECHNOLOGIES
Product: 0→1 Product Strategy, User Journey Mapping, PRD Scoping, Funnel Analytics, Sprint Planning, Enterprise Integrations.
Technologies: TypeScript, Python, Next.js, React, Node.js, PostgreSQL, Docker, Supabase, Prisma, Linear, Jira, Figma, Postman.

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science & Engineering
Coursework in Data Structures, Database Systems, Computer Networks & Software Engineering.`;

  const handleDownloadResume = useCallback(() => {
    playTactileSound("click");
    if (typeof window === "undefined") return;
    try {
      const blob = new Blob([RESUME_PLAINTEXT], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Sakar_Baxi_Resume.md";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // fallback
    }
  }, [RESUME_PLAINTEXT]);

  const handleCopyPlaintextResume = useCallback(() => {
    playTactileSound("copy");
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(RESUME_PLAINTEXT).catch(() => {});
      }
    } catch {
      // fallback
    }
    setResumeCopied(true);
    setTimeout(() => setResumeCopied(false), 2200);
  }, [RESUME_PLAINTEXT]);

  const handleNextTrack = useCallback(() => {
    playTactileSound("click");
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  }, []);

  const handlePrevTrack = useCallback(() => {
    playTactileSound("click");
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  }, []);

  const navigateCaseStudy = useCallback((direction: "prev" | "next") => {
    setSelectedCaseStudy((current) => {
      if (!current) return null;
      const currentIdx = caseStudies.findIndex((c) => c.id === current.id);
      if (currentIdx === -1) return current;
      const total = caseStudies.length;
      const nextIdx = direction === "next" ? (currentIdx + 1) % total : (currentIdx - 1 + total) % total;
      return caseStudies[nextIdx];
    });
    playTactileSound("click");
  }, []);

  // Global Keyboard Shortcuts (⌘K, Escape, T, S, M, N, C, ?, ←/→, 1-6)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        playTactileSound("click");
        setCommandOpen((prev) => !prev);
        return;
      }

      // Escape always closes open dialogs
      if (e.key === "Escape") {
        setCommandOpen(false);
        setResumeOpen(false);
        setShortcutsOpen(false);
        setSelectedCaseStudy(null);
        return;
      }

      // Case study arrow navigation
      if (selectedCaseStudy) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          navigateCaseStudy("prev");
          return;
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          navigateCaseStudy("next");
          return;
        }
      }

      // Ignore single-character hotkeys if user is actively typing in an input
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === "t") {
        e.preventDefault();
        toggleTheme();
      } else if (key === "s") {
        e.preventDefault();
        toggleSound();
      } else if (key === "m") {
        e.preventDefault();
        playTactileSound("toggle");
        setIsPlaying((prev) => !prev);
      } else if (key === "n") {
        e.preventDefault();
        handleNextTrack();
      } else if (key === "c") {
        e.preventDefault();
        handleCopyEmail();
      } else if (key === "?") {
        e.preventDefault();
        playTactileSound("click");
        setShortcutsOpen((prev) => !prev);
      } else if (e.key >= "1" && e.key <= "6") {
        const sectionMap: Record<string, string> = {
          "1": "hero",
          "2": "work",
          "3": "projects",
          "4": "skills",
          "5": "off-the-clock",
          "6": "contact",
        };
        const targetId = sectionMap[e.key];
        if (targetId) {
          const el = document.getElementById(targetId);
          el?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme, toggleSound, handleNextTrack, handleCopyEmail, selectedCaseStudy, navigateCaseStudy]);

  const commandItems = [
    {
      id: "nav-hero",
      title: "Home / Overview",
      subtitle: "Back to top and hero introduction",
      category: "Navigation",
      icon: "🏠",
      action: () => {
        window.location.hash = "#hero";
      },
    },
    {
      id: "nav-work",
      title: "Case Studies & Work",
      subtitle: "HDFC onboarding, HRMS integrations & client retention",
      category: "Navigation",
      icon: "💼",
      action: () => {
        window.location.hash = "#work";
      },
    },
    {
      id: "nav-projects",
      title: "Shipped Side Projects",
      subtitle: "Beacon, Ledger, Echo, Knuud, Bhangar & Syftin",
      category: "Navigation",
      icon: "🚀",
      action: () => {
        window.location.hash = "#projects";
      },
    },
    {
      id: "nav-skills",
      title: "Tech Stack & Skills",
      subtitle: "Interactive macOS dock & 4 core PM pillars",
      category: "Navigation",
      icon: "⚡",
      action: () => {
        window.location.hash = "#skills";
      },
    },
    {
      id: "nav-off-clock",
      title: "Off The Clock",
      subtitle: "Liverpool FC, Sitcom debates, Late-night reading & Indie rotation",
      category: "Navigation",
      icon: "⚽",
      action: () => {
        window.location.hash = "#off-the-clock";
      },
    },
    {
      id: "nav-contact",
      title: "Contact & Schedule",
      subtitle: "Book a call or drop a direct note",
      category: "Navigation",
      icon: "📬",
      action: () => {
        window.location.hash = "#contact";
      },
    },
    {
      id: "act-call",
      title: "Schedule 30-min Call",
      subtitle: "Open Calendly booking widget",
      category: "Actions",
      icon: "📅",
      action: () => {
        handleOpenCalendly();
      },
    },
    {
      id: "act-copy-email",
      title: "Copy Email Address",
      subtitle: "baxisakar18@gmail.com",
      category: "Actions",
      icon: "📋",
      action: () => {
        handleCopyEmail();
      },
    },
    {
      id: "act-copy-summary",
      title: "Copy Candidate Summary for Slack / ATS",
      subtitle: "One-click pitch with impact metrics for hiring managers",
      category: "Actions",
      icon: "⚡",
      action: () => {
        handleCopyRecruiterSummary();
      },
    },
    {
      id: "act-resume",
      title: "View Sakar's Resume (PDF / Print)",
      subtitle: "Full career overview, enterprise metrics & skills sheet",
      category: "Actions",
      icon: "📄",
      action: () => {
        setResumeOpen(true);
      },
    },
    {
      id: "act-shortcuts",
      title: "Keyboard Shortcuts & Hotkeys",
      subtitle: "View complete visual cheat sheet of hotkeys (?)",
      category: "Actions",
      icon: "⌨️",
      action: () => {
        setShortcutsOpen(true);
      },
    },
    {
      id: "act-theme",
      title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      subtitle: "Toggle visual color theme (T)",
      category: "Actions",
      icon: theme === "dark" ? "☀️" : "🌙",
      action: () => {
        toggleTheme();
      },
    },
    {
      id: "act-sound",
      title: `Turn Sound Effects ${soundEnabled ? "Off (Mute)" : "On"}`,
      subtitle: "Toggle tactile Web Audio feedback on clicks and shortcuts (S)",
      category: "Actions",
      icon: soundEnabled ? "🔊" : "🔇",
      action: () => {
        toggleSound();
      },
    },
    {
      id: "act-case-hdfc",
      title: "Case Study: HDFC Bank Onboarding",
      subtitle: "Deep dive: 60% faster onboarding & digital KYC architecture",
      category: "Case Studies",
      icon: "🏦",
      action: () => {
        setSelectedCaseStudy(caseStudies[0]);
      },
    },
    {
      id: "act-case-hrms",
      title: "Case Study: MakeMyTrip 90+ HRMS Integrations",
      subtitle: "Deep dive: Canonical Data Model & zero-downtime integration architecture",
      category: "Case Studies",
      icon: "✈️",
      action: () => {
        setSelectedCaseStudy(caseStudies[1]);
      },
    },
    {
      id: "act-case-vensure",
      title: "Case Study: Vensure Client Retention Automation",
      subtitle: "Deep dive: 20% churn reduction via event-driven status tracking engine",
      category: "Case Studies",
      icon: "📈",
      action: () => {
        setSelectedCaseStudy(caseStudies[2]);
      },
    },
    {
      id: "act-music-toggle",
      title: isPlaying ? "Pause Soundtrack" : "Play Soundtrack",
      subtitle: `${playlist[currentTrackIndex].title} — ${playlist[currentTrackIndex].artist}`,
      category: "Actions",
      icon: isPlaying ? "⏸️" : "▶️",
      action: () => {
        setIsPlaying((prev) => !prev);
      },
    },
    {
      id: "act-music-next",
      title: "Next Track in Playlist",
      subtitle: "Skip to next song in rotation",
      category: "Actions",
      icon: "⏭️",
      action: () => {
        handleNextTrack();
      },
    },
    {
      id: "proj-beacon",
      title: "Launch Beacon (Live)",
      subtitle: "Client onboarding alarm system",
      category: "Shipped Projects",
      icon: "🚨",
      action: () => {
        window.open("https://covalynce-beacon.vercel.app/", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "proj-ledger",
      title: "Launch Ledger (Live)",
      subtitle: "AI spend tracking & invoice alerts",
      category: "Shipped Projects",
      icon: "📊",
      action: () => {
        window.open("https://covalynce-ledger.vercel.app/", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "proj-echo",
      title: "Launch Echo (Live)",
      subtitle: "Code update to release notes automation",
      category: "Shipped Projects",
      icon: "📣",
      action: () => {
        window.open("https://covalynce-echo.vercel.app/", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "proj-knuud",
      title: "Launch Knuud (Live)",
      subtitle: "PRD spec to Jira ticket compiler",
      category: "Shipped Projects",
      icon: "📝",
      action: () => {
        window.open("https://knuud.space", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "proj-bhangar",
      title: "Launch Bhangar.space (Live)",
      subtitle: "Hyperlocal apartment building marketplace",
      category: "Shipped Projects",
      icon: "📦",
      action: () => {
        window.open("https://bhangar.space", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "proj-syftin",
      title: "Launch Syftin (Live)",
      subtitle: "Desktop community data extraction tool",
      category: "Shipped Projects",
      icon: "🔍",
      action: () => {
        window.open("https://syftin.vercel.app", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "link-github",
      title: "GitHub Profile",
      subtitle: "github.com/Practical-APM",
      category: "Links",
      icon: "🐙",
      action: () => {
        window.open("https://github.com/Practical-APM", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "link-linkedin",
      title: "LinkedIn Profile",
      subtitle: "linkedin.com/in/sakar-baxi",
      category: "Links",
      icon: "💼",
      action: () => {
        window.open("https://linkedin.com/in/sakar-baxi", "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "link-music",
      title: "Open YouTube Music Playlist",
      subtitle: "Listen on YouTube Music web app",
      category: "Links",
      icon: "🎧",
      action: () => {
        window.open(YOUTUBE_MUSIC_PLAYLIST_URL, "_blank", "noopener,noreferrer");
      },
    },
  ];

  const filteredCommandItems = commandItems.filter((item) => {
    if (!commandQuery.trim()) return true;
    const q = commandQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleCommandInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      playTactileSound("click");
      setCommandSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommandItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      playTactileSound("click");
      setCommandSelectedIndex((prev) => (prev - 1 + filteredCommandItems.length) % Math.max(1, filteredCommandItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommandItems[commandSelectedIndex]) {
        playTactileSound("click");
        filteredCommandItems[commandSelectedIndex].action();
        setCommandOpen(false);
      }
    }
  };

  // Keep highlighted command item visible during keyboard navigation
  useEffect(() => {
    if (commandOpen) {
      const selectedEl = document.querySelector(".cmd-item.selected");
      if (selectedEl && typeof selectedEl.scrollIntoView === "function") {
        selectedEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [commandSelectedIndex, commandOpen]);

  const currentTrack = playlist[currentTrackIndex];
  const activeDockItem = dockItems.find((d) => d.name === activeDockTech) || dockItems[0];

  return (
    <>
      {/* ── READING PROGRESS BAR ── */}
      <div
        className="reading-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

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
            className="nav-resume-btn"
            onClick={() => setResumeOpen(true)}
            aria-label="View Sakar's Resume"
            title="View Resume"
          >
            Resume
          </button>

          <button
            className="cmd-trigger-btn"
            onClick={() => {
              setCommandQuery("");
              setCommandSelectedIndex(0);
              setCommandOpen(true);
            }}
            aria-label="Open command palette"
            title="Open Command Menu (⌘K)"
          >
            <span className="cmd-kbd-symbol">⌘</span>K
          </button>

          <button
            className={`sound-toggle-btn${!soundEnabled ? " muted" : ""}`}
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute sound effects" : "Unmute sound effects"}
            title={soundEnabled ? "Sound: On (Click to mute)" : "Sound: Muted (Click to unmute)"}
          >
            {soundEnabled ? <Volume2 /> : <VolumeX />}
          </button>

          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
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
                    Product Analyst at <strong>TartanHQ</strong>. I build simple, automated systems for complex enterprise problems—like cutting HDFC Bank&apos;s corporate onboarding from 12 steps down to 3.
                  </p>
                  <p className="hero-body-p" style={{ color: "var(--text-3)", fontSize: "13.5px" }}>
                    Outside work, I ship live side projects, back Liverpool FC, and listen to indie Hindi rock. Explore the widgets below—everything is interactive.
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
                    fetchPriority="high"
                    decoding="sync"
                  />

                  <button
                    className="siri-badge-btn"
                    onClick={() => setShowToast(!showToast)}
                    aria-label="Interactive greeting: click to say hi"
                    title="Click for a quick hello"
                  >
                    <div className="siri-orb" />
                    <span className="siri-hint-tag">Say hi 👋</span>
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
                        loading="lazy"
                        draggable={false}
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
                      {isPlaying && (
                        <div className="ytm-progress-container" aria-label="Playback progress">
                          <div className="ytm-progress-bar" />
                        </div>
                      )}
                    </div>
                    <div className="ytm-ctrl-actions">
                      <button
                        onClick={handlePrevTrack}
                        className="ytm-skip-btn"
                        aria-label="Previous track"
                        title="Previous track"
                      >
                        <SkipBackIcon />
                      </button>
                      <button
                        onClick={() => {
                          playTactileSound("toggle");
                          setIsPlaying(!isPlaying);
                        }}
                        className="btn-pill-primary ytm-play-btn"
                        aria-label={isPlaying ? "Pause music" : "Play music"}
                      >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        <span>{isPlaying ? "Pause" : "Play"}</span>
                      </button>
                      <button
                        onClick={handleNextTrack}
                        className="ytm-skip-btn"
                        aria-label="Next track"
                        title="Next track"
                      >
                        <SkipForwardIcon />
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
                        playTactileSound("click");
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
                  <div className="notes-tabs" role="tablist" aria-label="Notes documentation tabs">
                    <button
                      onClick={() => setActiveNotesTab("principles")}
                      className={`notes-tab-btn${activeNotesTab === "principles" ? " active" : ""}`}
                      role="tab"
                      aria-selected={activeNotesTab === "principles"}
                    >
                      📝 how-i-build.md
                    </button>
                    <button
                      onClick={() => setActiveNotesTab("framework")}
                      className={`notes-tab-btn${activeNotesTab === "framework" ? " active" : ""}`}
                      role="tab"
                      aria-selected={activeNotesTab === "framework"}
                    >
                      📐 prd-framework.md
                    </button>
                    <button
                      onClick={() => setActiveNotesTab("recruiter")}
                      className={`notes-tab-btn${activeNotesTab === "recruiter" ? " active" : ""}`}
                      role="tab"
                      aria-selected={activeNotesTab === "recruiter"}
                    >
                      ⚡ for-recruiters.md
                    </button>
                  </div>
                </div>

                <div className="notes-content-body">
                  {activeNotesTab === "principles" && (
                    <>
                      <div className="note-item">
                        <span className="note-num">01</span>
                        <div className="note-text-wrap">
                          <strong>Validate early with working prototypes.</strong> Test assumptions quickly with interactive mockups or API endpoints before committing full engineering bandwidth. If a concept cannot be validated within a week, break it into smaller milestones.
                        </div>
                      </div>
                      <div className="note-item">
                        <span className="note-num">02</span>
                        <div className="note-text-wrap">
                          <strong>Study actual user drop-off directly.</strong> Review funnel telemetry and shadow operations teams as they navigate the product. Removing unnecessary steps in a workflow always drives higher retention than adding explanatory tooltips.
                        </div>
                      </div>
                      <div className="note-item">
                        <span className="note-num">03</span>
                        <div className="note-text-wrap">
                          <strong>Collaborate closely on technical architecture.</strong> Understand API payload structures, database schemas, and external vendor rate limits. Partnering with engineers on constraints early prevents late-stage rework and delivery delays.
                        </div>
                      </div>
                    </>
                  )}

                  {activeNotesTab === "framework" && (
                    <>
                      <div className="note-item">
                        <span className="note-num">01</span>
                        <div className="note-text-wrap">
                          <strong>Problem &amp; Business Context:</strong> A clear breakdown of the customer pain point, who is impacted, and the operational or revenue cost of leaving it unresolved.
                        </div>
                      </div>
                      <div className="note-item">
                        <span className="note-num">02</span>
                        <div className="note-text-wrap">
                          <strong>Measurable Success Targets:</strong> Concrete product metrics with defined baselines and targets (e.g. 60% turnaround reduction, zero pipeline sync dropouts).
                        </div>
                      </div>
                      <div className="note-item">
                        <span className="note-num">03</span>
                        <div className="note-text-wrap">
                          <strong>User Journey &amp; Edge Cases:</strong> The primary path mapped out alongside error handling states, validation rules, and recovery behaviors.
                        </div>
                      </div>
                      <div className="note-item">
                        <span className="note-num">04</span>
                        <div className="note-text-wrap">
                          <strong>Technical Contracts &amp; Schemas:</strong> Request/response payloads, authentication flows, and data models aligned with engineering before sprint kickoff.
                        </div>
                      </div>
                    </>
                  )}

                  {activeNotesTab === "recruiter" && (
                    <div style={{ padding: "4px 0" }}>
                      <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.55, margin: "0 0 12px 0" }}>
                        <strong>Executive Summary:</strong> Product Manager at TartanHQ with hands-on technical depth across B2B fintech and enterprise platforms. Led an engineering squad of 10 delivering 90+ enterprise integrations (MakeMyTrip), digitized HDFC Bank corporate onboarding (cutting turnaround time by 60%), and actively builds production software outside work.
                      </p>
                      <div className="recruiter-meta-row">
                        <span className="recruiter-meta-pill">📍 Gurugram, India</span>
                        <span className="recruiter-meta-pill">🏢 TartanHQ</span>
                        <span className="recruiter-meta-pill">💼 B2B Fintech &amp; SaaS</span>
                        <span className="recruiter-meta-pill">🛠️ Technical PM</span>
                      </div>
                      <button
                        onClick={handleCopyRecruiterSummary}
                        className="btn-recruiter-copy"
                        aria-label="Copy candidate summary to clipboard"
                      >
                        {summaryCopied ? "✓ Summary Copied for Slack!" : "📋 Copy Candidate Summary for Slack / ATS"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── WORK / CASE STUDIES DOSSIER ── */}
        <section id="work" className="section-wrapper" aria-labelledby="work-head">
          <div className="container">
            <div className="section-head-with-sticker">
              <div className="section-sticker-anchor">
                <LaptopSticker
                  src="/cat.jpg"
                  alt="Side-eye cat meme sticker"
                  rotation="-5deg"
                  width={96}
                  height={96}
                />
              </div>
              <div className="section-head-title-wrap">
                <div className="section-eyebrow-tag">Enterprise Case Studies</div>
                <h2 id="work-head" className="section-head-title">Systems Shipped at Scale.<br />Measurable Product Impact.</h2>
              </div>
              <p className="section-head-desc">
                In-depth breakdowns of 0→1 product strategy, system architecture, and verified business outcomes from my enterprise work experience.
              </p>
            </div>

            {/* Executive Filing Drawer Architecture */}
            <div
              className="case-stacked-wrapper"
              onMouseEnter={() => setIsStackPaused(true)}
              onMouseLeave={() => setIsStackPaused(false)}
            >
              {/* Executive Filing Drawer Rail & Folder Tabs */}
              <div className="case-drawer-rail" role="tablist" aria-label="Executive Filing Drawer">
                <div className="case-drawer-rail-header">
                  <div className="case-drawer-rail-label">
                    <span className="case-drawer-status-led" />
                    <span>EXECUTIVE FILING DRAWER · {caseStudies.length} ENTERPRISE DOSSIERS</span>
                  </div>
                  <span className="case-drawer-hint">Select tab or click drifted file in drawer</span>
                </div>
                <div className="case-drawer-tabs">
                  {caseStudies.map((cs, i) => {
                    const isFront = activeStackIndex === i;
                    const shortCompany = cs.id === "hdfc" ? "HDFC Bank" : cs.id === "hrms" ? "MakeMyTrip" : "Vensure PEO";
                    const shortTopic = cs.id === "hdfc" ? "Fintech Salary KYC" : cs.id === "hrms" ? "90+ HRMS Connectors" : "Onboarding Churn Drop";
                    const highlightMetric = cs.metrics[0]?.num;

                    return (
                      <button
                        key={cs.id}
                        role="tab"
                        aria-selected={isFront}
                        className={`case-drawer-tab ${isFront ? "active" : ""}`}
                        onClick={() => {
                          playTactileSound("click");
                          setActiveStackIndex(i);
                        }}
                        title={`Pull Dossier 0${i + 1} (${shortCompany}) forward`}
                      >
                        <div className="case-drawer-tab-info">
                          <span className="case-drawer-tab-folder">📁</span>
                          <div className="case-drawer-tab-text">
                            <span className="case-drawer-tab-name">0{i + 1} · {shortCompany}</span>
                            <span className="case-drawer-tab-sub">{shortTopic}</span>
                          </div>
                        </div>
                        <span className="case-drawer-tab-stat">{highlightMetric}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3D Stack Deck */}
              <div className="case-stack-deck">
                {caseStudies.map((cs, i) => {
                  const offset = (i - activeStackIndex + caseStudies.length) % caseStudies.length;
                  const isFront = offset === 0;

                  return (
                    <article
                      key={cs.id}
                      id={`case-${cs.id}`}
                      className={`case-stack-item state-${offset}`}
                      onClick={() => {
                        if (!isFront) {
                          playTactileSound("click");
                          setActiveStackIndex(i);
                        }
                      }}
                      aria-hidden={!isFront}
                    >
                      <div className="case-card-header">
                        <div className="mac-dots">
                          <button
                            className="mac-dot red clickable"
                            onClick={(e) => {
                              e.stopPropagation();
                              playTactileSound("click");
                              setSelectedCaseStudy(cs);
                            }}
                            aria-label={`Open ${cs.title} deep dive`}
                            title="View Deep Dive (Click to open)"
                          />
                          <span className="mac-dot yellow" />
                          <span className="mac-dot green" />
                        </div>
                        <div className="case-window-title-wrap">
                          <span className="case-window-folder-badge">📁 Dossier 0{i + 1}</span>
                          <span className="case-window-title">{cs.file}</span>
                        </div>
                        <div className="case-header-actions">
                          {!isFront ? (
                            <span className="case-pull-pill">Click to pull forward ↵</span>
                          ) : (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playTactileSound("click");
                                  setSelectedCaseStudy(cs);
                                }}
                                className="case-inspect-btn"
                                title="Open deep architecture breakdown"
                              >
                                🔍 Deep Dive
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyCaseLink(cs.id);
                                }}
                                className="case-share-btn"
                                title="Copy direct link to this case study"
                                aria-label={`Copy link to ${cs.title}`}
                              >
                                {copiedCaseId === cs.id ? "✓ Copied!" : "🔗 Share"}
                              </button>
                            </>
                          )}
                        </div>
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
                            <div style={{ fontSize: "11.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-3)", marginBottom: "4px" }}>What I Owned (0→1 PM Role)</div>
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playTactileSound("click");
                              setSelectedCaseStudy(cs);
                            }}
                            className="case-deep-dive-btn"
                            title={`Read full architecture & PM breakdown for ${cs.title}`}
                          >
                            <span>Read Architecture Breakdown</span>
                            <ArrowUpRight />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── SHIPPED SIDE BUILDS (REAL PRODUCTS) ── */}
        <section id="projects" className="section-wrapper" aria-labelledby="projects-head">
          <div className="container">
            <div className="section-head-with-sticker">
              <div className="section-sticker-anchor">
                <LaptopSticker
                  src="/monkey.png"
                  alt="Monkey clutching head meme sticker"
                  rotation="-6deg"
                  width={96}
                  height={96}
                />
              </div>
              <div className="section-head-title-wrap">
                <div className="section-eyebrow-tag">Practical-APM / Shipped Projects</div>
                <h2 id="projects-head" className="section-head-title">Built Outside Work.<br />Working Apps for Real People.</h2>
              </div>
              <p className="section-head-desc">
                All 6 live products and open-source projects from <a href="https://github.com/Practical-APM" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-1)", textDecoration: "underline" }}>github.com/Practical-APM</a>. Real code, real users, real problems solved.
              </p>
            </div>

            {/* Project Category Filter Pills */}
            <div className="projects-filter-bar" role="tablist" aria-label="Filter projects by category">
              {["All", "AI & FinOps", "B2B / Workflow", "Community"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedProjectTag(tag)}
                  className={`project-filter-pill${selectedProjectTag === tag ? " active" : ""}`}
                  role="tab"
                  aria-selected={selectedProjectTag === tag}
                >
                  {tag} {tag === "All" ? `(${sideProjects.length})` : `(${sideProjects.filter((p) => p.tag === tag).length})`}
                </button>
              ))}
            </div>

            <div className="apps-bento-grid">
              {sideProjects
                .filter((proj) => selectedProjectTag === "All" || proj.tag === selectedProjectTag)
                .map((proj) => (
                <article key={proj.id} className="app-widget-card">
                  <div
                    className="app-preview-pane"
                    onClick={() => {
                      if (proj.live || proj.github) {
                        playTactileSound("click");
                        window.open(proj.live || proj.github, "_blank", "noopener,noreferrer");
                      }
                    }}
                    role={proj.live || proj.github ? "button" : undefined}
                    tabIndex={proj.live || proj.github ? 0 : undefined}
                    onKeyDown={(e) => {
                      if ((e.key === "Enter" || e.key === " ") && (proj.live || proj.github)) {
                        e.preventDefault();
                        playTactileSound("click");
                        window.open(proj.live || proj.github, "_blank", "noopener,noreferrer");
                      }
                    }}
                    title={proj.live ? `Launch ${proj.name}` : proj.github ? `View ${proj.name} code` : undefined}
                    aria-label={`Open ${proj.name}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={proj.preview} alt={`${proj.name} preview`} loading="lazy" decoding="async" />
                    <div className="app-preview-glass" aria-hidden="true" />
                  </div>
                  <div className="app-body-pane">
                    <div className="app-title-row">
                      <div className="app-title-group">
                        <h3 className="app-name">{proj.name}</h3>
                        <span className="app-status-badge">
                          <span className="app-status-dot" />
                          <span>Live</span>
                        </span>
                      </div>
                      <span className="app-category-badge">{proj.tag}</span>
                    </div>
                    <div className="app-category-sub">{proj.category}</div>
                    <p className="app-desc-p">{proj.desc}</p>
                    {proj.tech && proj.tech.length > 0 && (
                      <div className="app-tech-tags" aria-label="Technologies used">
                        {proj.tech.slice(0, 4).map((t) => (
                          <span key={t} className="app-tech-chip">
                            {t}
                          </span>
                        ))}
                        {proj.tech.length > 4 && (
                          <span className="app-tech-chip" title={proj.tech.slice(4).join(", ")}>
                            +{proj.tech.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="app-actions-row">
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="app-btn-live-primary"
                          title={`Launch ${proj.name} web app`}
                        >
                          <span>Live App</span>
                          <ArrowUpRight />
                        </a>
                      )}
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="app-btn-code-secondary"
                          title={`View ${proj.name} repository on GitHub`}
                        >
                          <Github />
                          <span>Source Code</span>
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
              <div className="section-sticker-anchor">
                <LaptopSticker
                  src="/disaster.jpg"
                  alt="Disaster Sakar meme sticker"
                  rotation="5deg"
                  width={96}
                  height={96}
                />
              </div>
              <div className="section-head-title-wrap">
                <div className="section-eyebrow-tag">How I Work</div>
                <h2 id="skills-head" className="section-head-title">Hands-On Tech Stack &<br />Everyday Product Skills.</h2>
              </div>
              <p className="section-head-desc">
                Tools I build with daily, backed by clear communication and dependable execution. Hover any icon in the dock to inspect tools.
              </p>
            </div>

            {/* Apple macOS Interactive Dock */}
            <div className="dock-wrap-container">
              <div className="macos-dock" role="toolbar" aria-label="Tech Stack Dock">
                {dockItems.map((item) => (
                  <button
                    key={item.name}
                    className={`dock-item-btn${bouncingTech === item.name ? " bouncing" : ""}${activeDockTech === item.name ? " active" : ""}`}
                    onClick={() => handleDockClick(item.name)}
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
                <span className="dock-active-name">{activeDockItem.name}</span>
                <span className="dock-active-sep">·</span>
                <span className="dock-active-desc">{activeDockItem.desc}</span>
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
            <div className="section-head-standard">
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
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="off-clock-media-overlay" />
                  <div className="off-clock-badge lfc-badge">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/interests/liverpool.png" alt="Liverpool FC Crest" className="lfc-crest-mini" loading="lazy" decoding="async" />
                    <span>Reds · Anfield</span>
                  </div>
                </div>
                <div className="off-clock-content">
                  <div className="off-clock-title-row">
                    <h3 className="off-clock-card-title">Liverpool FC</h3>
                    <span className="off-clock-tag">YNWA</span>
                  </div>
                  <p className="off-clock-desc">
                    Passionate LFC fan. I will watch the 2006 Istanbul final for the 100th time and still celebrate like it&apos;s the first time. YNWA.
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
                    loading="lazy"
                    decoding="async"
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
                    No point discussing why: <em>The Big Bang Theory</em> &gt;&gt;&gt; <em>How I Met Your Mother</em> &gt;&gt;&gt; <em>Friends</em>. Being a STEM nerd comes with its own perks.
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
                    loading="lazy"
                    decoding="async"
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
                    loading="lazy"
                    decoding="async"
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
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                <span>© {new Date().getFullYear()} Sakar Baxi · Built with love · Gurugram, India</span>
                {istTime && (
                  <div className="footer-status-pill" title="Current Indian Standard Time (IST)">
                    <span className="footer-live-dot" />
                    <span>{istTime} IST</span>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <button
                  onClick={() => {
                    playTactileSound("click");
                    setShortcutsOpen(true);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-3)",
                    cursor: "pointer",
                    fontSize: "12.5px",
                    fontWeight: 500,
                    textDecoration: "underline",
                  }}
                >
                  Shortcuts (?)
                </button>
                <button
                  onClick={() => {
                    playTactileSound("click");
                    setCommandQuery("");
                    setCommandSelectedIndex(0);
                    setCommandOpen(true);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-3)",
                    cursor: "pointer",
                    fontSize: "12.5px",
                    fontWeight: 500,
                    textDecoration: "underline",
                  }}
                >
                  Command Menu (⌘K)
                </button>
                <a href="#hero">Back to top ↑</a>
                <a href="https://github.com/Practical-APM" target="_blank" rel="noopener noreferrer">Practical-APM</a>
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* ── FLOATING BACK TO TOP BUTTON ── */}
      {showBackToTop && (
        <button
          onClick={() => {
            playTactileSound("click");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="back-to-top-fab"
          aria-label="Back to top"
          title="Scroll back to top"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      {/* ── RAYCAST / APPLE SPOTLIGHT STYLE COMMAND PALETTE (⌘K) ── */}
      {commandOpen && (
        <div
          className="cmd-backdrop"
          onClick={() => setCommandOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            className="cmd-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmd-header">
              <div className="cmd-search-icon">
                <SearchIcon />
              </div>
              <input
                type="text"
                className="cmd-input"
                placeholder="Type a command or jump to projects, case studies, actions..."
                value={commandQuery}
                onChange={(e) => {
                  setCommandQuery(e.target.value);
                  setCommandSelectedIndex(0);
                }}
                onKeyDown={handleCommandInputKeyDown}
                autoFocus
              />
              <span className="cmd-esc-tag">ESC</span>
            </div>

            <div className="cmd-list" role="listbox">
              {filteredCommandItems.length === 0 ? (
                <div className="cmd-empty">No matching commands or projects found.</div>
              ) : (
                filteredCommandItems.map((item, idx) => (
                  <button
                    key={item.id}
                    className={`cmd-item${commandSelectedIndex === idx ? " selected" : ""}`}
                    onClick={() => {
                      playTactileSound("click");
                      item.action();
                      setCommandOpen(false);
                    }}
                    onMouseEnter={() => setCommandSelectedIndex(idx)}
                    role="option"
                    aria-selected={commandSelectedIndex === idx}
                  >
                    <span className="cmd-item-icon">{item.icon}</span>
                    <div className="cmd-item-content">
                      <div className="cmd-item-title">{item.title}</div>
                      {item.subtitle && <div className="cmd-item-subtitle">{item.subtitle}</div>}
                    </div>
                    <span className="cmd-item-action-tag">↵</span>
                  </button>
                ))
              )}
            </div>

            <div className="cmd-footer">
              <div className="cmd-footer-keys">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <button
                  onClick={() => {
                    playTactileSound("click");
                    setCommandOpen(false);
                    setShortcutsOpen(true);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    padding: 0,
                    textDecoration: "underline",
                  }}
                >
                  ? Shortcuts
                </button>
                <span>ESC Close</span>
              </div>
              <span>Sakar Baxi · Portfolio</span>
            </div>
          </div>
        </div>
      )}

      {/* ── INTERACTIVE RESUME MODAL ── */}
      {resumeOpen && (
        <div
          className="resume-modal-backdrop"
          onClick={() => setResumeOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Sakar Baxi Resume"
        >
          <div className="resume-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <div className="mac-dots">
                <button
                  className="mac-dot red clickable"
                  onClick={() => {
                    playTactileSound("click");
                    setResumeOpen(false);
                  }}
                  aria-label="Close resume"
                  title="Close (ESC)"
                />
                <span className="mac-dot yellow" />
                <span className="mac-dot green" />
              </div>
              <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text-1)" }}>
                📄 Sakar_Baxi_Resume.pdf
              </div>
              <div className="resume-modal-actions">
                <button
                  onClick={handleDownloadResume}
                  className="resume-download-btn"
                  title="Download resume as markdown file"
                >
                  ⬇️ Save .md
                </button>
                <button
                  onClick={handleCopyPlaintextResume}
                  className="resume-copy-btn"
                  title="Copy plaintext resume for ATS or messaging"
                >
                  {resumeCopied ? "✓ Plaintext Copied!" : "📋 Copy Plaintext"}
                </button>
                <button
                  onClick={() => {
                    playTactileSound("click");
                    window.print();
                  }}
                  className="resume-print-btn"
                  title="Print or save as PDF"
                >
                  🖨️ Print / Save PDF
                </button>
                <button
                  onClick={() => {
                    playTactileSound("click");
                    setResumeOpen(false);
                  }}
                  className="resume-close-btn"
                  aria-label="Close resume"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="resume-modal-body">
              {/* Header */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 4px", color: "var(--text-1)" }}>
                      Sakar Baxi
                    </h2>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--blue)", marginBottom: "8px" }}>
                      Product Manager &amp; Builder · Gurugram, India
                    </div>
                  </div>
                  <span className="resume-status-badge">
                    <span className="resume-status-dot" />
                    <span>Open to PM / Senior PM Roles</span>
                  </span>
                </div>
                <div style={{ fontSize: "12.5px", color: "var(--text-3)", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <span>baxisakar18@gmail.com</span>
                  <span>·</span>
                  <a href="https://linkedin.com/in/sakar-baxi" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-2)", textDecoration: "underline" }}>LinkedIn</a>
                  <span>·</span>
                  <a href="https://github.com/Practical-APM" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-2)", textDecoration: "underline" }}>GitHub (@Practical-APM)</a>
                  <span>·</span>
                  <a href="https://sakarbaxi.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-2)", textDecoration: "underline" }}>sakarbaxi.com</a>
                </div>
              </div>

              {/* Career Highlights Bento Grid */}
              <div className="resume-metrics-grid">
                <div className="resume-metric-card">
                  <span className="resume-metric-num">60%</span>
                  <span className="resume-metric-label">Faster Turnaround (HDFC)</span>
                </div>
                <div className="resume-metric-card">
                  <span className="resume-metric-num">90+</span>
                  <span className="resume-metric-label">Enterprise Integrations</span>
                </div>
                <div className="resume-metric-card">
                  <span className="resume-metric-num">6</span>
                  <span className="resume-metric-label">Shipped Live Products</span>
                </div>
                <div className="resume-metric-card">
                  <span className="resume-metric-num">10</span>
                  <span className="resume-metric-label">Engineers Squad Led</span>
                </div>
              </div>

              {/* Summary */}
              <div className="resume-sec-title">Professional Summary</div>
              <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.55, margin: 0 }}>
                Product Manager with hands-on technical depth delivering scalable enterprise integrations and automated onboarding products. Proven track record leading a cross-functional squad of 10 engineers across 90+ enterprise connectors (MakeMyTrip), cutting corporate banking onboarding turnaround time by 60% with HDFC Bank, and actively shipping production-ready web applications.
              </p>

              {/* Work Experience */}
              <div className="resume-sec-title">Experience</div>
              
              <div style={{ marginBottom: "16px" }}>
                <div className="resume-job-row">
                  <span className="resume-job-title">Product Analyst</span>
                  <span className="resume-job-date">2025 – Present</span>
                </div>
                <div className="resume-job-company">TartanHQ Solutions · Gurugram, India</div>
                <ul>
                  <li className="resume-bullet">
                    <strong>HDFC Bank Corporate Onboarding:</strong> Digitized corporate salary onboarding from 12 physical paperwork steps down to 3 digital approvals. Negotiated API security clearance with HDFC risk leadership, accelerating turnaround by 60% (7–10 days to &lt;30 mins) and cutting onboarding churn by 40%.
                  </li>
                  <li className="resume-bullet">
                    <strong>Enterprise System Integrations:</strong> Product lead for Tartan&apos;s integration platform. Led a 10-engineer squad delivering 90+ connectors for enterprise clients (e.g. MakeMyTrip). Designed a canonical intermediate schema and interactive developer sandbox that compressed client go-live time from 6 weeks to 4 days.
                  </li>
                </ul>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <div className="resume-job-row">
                  <span className="resume-job-title">Product Operations Specialist</span>
                  <span className="resume-job-date">2024 – 2025</span>
                </div>
                <div className="resume-job-company">Vensure Employer Solutions</div>
                <ul>
                  <li className="resume-bullet">
                    <strong>Client Setup Automation:</strong> Designed and rolled out an event-driven status tracking platform with batched milestone digests, reducing 60-day client onboarding churn by 20% and saving 15 hours weekly per account manager.
                  </li>
                  <li className="resume-bullet">
                    Mentored 4 associate PMs and data analysts on qualitative discovery, PRD writing, and telemetry instrumentation.
                  </li>
                </ul>
              </div>

              {/* Shipped Products */}
              <div className="resume-sec-title">Shipped Products &amp; Open Source (Practical-APM)</div>
              <ul>
                <li className="resume-bullet">
                  <strong>Beacon:</strong> Real-time alerts before client onboarding projects fall behind schedule.
                </li>
                <li className="resume-bullet">
                  <strong>Ledger:</strong> Live dashboard monitoring organizational AI token spend before surprise bills arrive.
                </li>
                <li className="resume-bullet">
                  <strong>Echo:</strong> Automated engine converting code diffs into customer-ready release notes.
                </li>
                <li className="resume-bullet">
                  <strong>Knuud:</strong> Spec-to-ticket compiler converting PRD documents into Jira/Linear engineering backlogs.
                </li>
              </ul>

              {/* Skills */}
              <div className="resume-sec-title">Skills &amp; Technologies</div>
              <p style={{ fontSize: "12.5px", color: "var(--text-2)", lineHeight: 1.5, margin: "0 0 16px" }}>
                <strong>Product:</strong> 0→1 Product Strategy, User Journey Mapping, PRD Scoping, Funnel Analytics, Sprint Planning, Enterprise Integrations.<br />
                <strong>Technologies:</strong> TypeScript, Python, Next.js, React, Node.js, PostgreSQL, Docker, Supabase, Prisma, Linear, Jira, Figma, Postman.
              </p>

              {/* Education */}
              <div className="resume-sec-title">Education</div>
              <div style={{ marginBottom: "8px" }}>
                <div className="resume-job-row">
                  <span className="resume-job-title">Bachelor of Technology (B.Tech)</span>
                  <span className="resume-job-date">Computer Science &amp; Engineering</span>
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-3)", margin: "3px 0 0" }}>
                  Coursework in Data Structures, Database Systems, Computer Networks &amp; Software Engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── KEYBOARD SHORTCUTS HUD MODAL (?) ── */}
      {shortcutsOpen && (
        <div
          className="shortcuts-modal-backdrop"
          onClick={() => setShortcutsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard Shortcuts"
        >
          <div className="shortcuts-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="shortcuts-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>⌨️</span>
                <span style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--text-1)" }}>
                  Keyboard Shortcuts &amp; Hotkeys
                </span>
              </div>
              <button
                onClick={() => {
                  playTactileSound("click");
                  setShortcutsOpen(false);
                }}
                className="resume-close-btn"
                aria-label="Close shortcuts"
              >
                ✕
              </button>
            </div>

            <div className="shortcuts-modal-body">
              <div className="shortcuts-grid">
                <div className="shortcut-row">
                  <span className="shortcut-desc">Open Command Palette / Search</span>
                  <span className="shortcut-kbd-wrap">
                    <kbd className="shortcut-kbd">⌘</kbd>
                    <kbd className="shortcut-kbd">K</kbd>
                  </span>
                </div>

                <div className="shortcut-row">
                  <span className="shortcut-desc">Toggle Dark / Light Theme</span>
                  <kbd className="shortcut-kbd">T</kbd>
                </div>

                <div className="shortcut-row">
                  <span className="shortcut-desc">Toggle Audio Sound Effects</span>
                  <kbd className="shortcut-kbd">S</kbd>
                </div>

                <div className="shortcut-row">
                  <span className="shortcut-desc">Play / Pause Indie Music</span>
                  <kbd className="shortcut-kbd">M</kbd>
                </div>

                <div className="shortcut-row">
                  <span className="shortcut-desc">Skip to Next Music Track</span>
                  <kbd className="shortcut-kbd">N</kbd>
                </div>

                <div className="shortcut-row">
                  <span className="shortcut-desc">Copy Email (baxisakar18@gmail.com)</span>
                  <kbd className="shortcut-kbd">C</kbd>
                </div>

                <div className="shortcut-row">
                  <span className="shortcut-desc">Jump to Section (Hero, Work, Projects...)</span>
                  <span className="shortcut-kbd-wrap">
                    <kbd className="shortcut-kbd">1</kbd>
                    <span style={{ fontSize: "11px", color: "var(--text-3)" }}>to</span>
                    <kbd className="shortcut-kbd">6</kbd>
                  </span>
                </div>

                <div className="shortcut-row">
                  <span className="shortcut-desc">Show / Hide This Shortcuts Guide</span>
                  <kbd className="shortcut-kbd">?</kbd>
                </div>

                <div className="shortcut-row">
                  <span className="shortcut-desc">Navigate Case Studies (in modal)</span>
                  <span className="shortcut-kbd-wrap">
                    <kbd className="shortcut-kbd">←</kbd>
                    <kbd className="shortcut-kbd">→</kbd>
                  </span>
                </div>

                <div className="shortcut-row">
                  <span className="shortcut-desc">Close Active Modal or Menu</span>
                  <kbd className="shortcut-kbd">ESC</kbd>
                </div>
              </div>
            </div>

            <div className="shortcuts-modal-footer">
              <span>Designed for accessibility &amp; power-users</span>
              <button
                onClick={() => {
                  playTactileSound("click");
                  setShortcutsOpen(false);
                  setResumeOpen(true);
                }}
                className="shortcuts-footer-btn"
              >
                📄 View Resume ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CASE STUDY ARCHITECTURE & PM DEEP DIVE MODAL ── */}
      {selectedCaseStudy && (
        <div
          className="case-modal-backdrop"
          onClick={() => setSelectedCaseStudy(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCaseStudy.title} Architecture Breakdown`}
        >
          <div className="case-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="case-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="mac-dots">
                  <button
                    className="mac-dot red clickable"
                    onClick={() => {
                      playTactileSound("click");
                      setSelectedCaseStudy(null);
                    }}
                    aria-label="Close breakdown"
                    title="Close (ESC)"
                  />
                  <span className="mac-dot yellow" />
                  <span className="mac-dot green" />
                </div>
                <div className="case-modal-nav-group">
                  <button
                    className="case-modal-nav-btn"
                    onClick={() => navigateCaseStudy("prev")}
                    title="Previous Case Study (← Arrow)"
                    aria-label="Previous Case Study"
                  >
                    ←
                  </button>
                  <span className="case-modal-nav-counter">
                    {caseStudies.findIndex((c) => c.id === selectedCaseStudy.id) + 1} / {caseStudies.length}
                  </span>
                  <button
                    className="case-modal-nav-btn"
                    onClick={() => navigateCaseStudy("next")}
                    title="Next Case Study (→ Arrow)"
                    aria-label="Next Case Study"
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="case-modal-filename" style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text-1)", fontFamily: "var(--font-mono)" }}>
                {selectedCaseStudy.file}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {selectedCaseStudy.live && (
                  <a
                    href={selectedCaseStudy.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-inspect-btn"
                    title={`Open ${selectedCaseStudy.title} live in new tab`}
                    style={{ textDecoration: "none", color: "var(--blue)" }}
                  >
                    ↗ Live App
                  </a>
                )}
                <button
                  onClick={() => handleCopyCaseLink(selectedCaseStudy.id)}
                  className="case-share-btn"
                  title="Copy direct link"
                >
                  {copiedCaseId === selectedCaseStudy.id ? "✓ Copied!" : "🔗 Share"}
                </button>
                <button
                  onClick={() => {
                    playTactileSound("click");
                    setSelectedCaseStudy(null);
                  }}
                  className="resume-close-btn"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="case-modal-body">
              {/* Hero */}
              <div className="case-deep-hero">
                <div className="case-tags-wrap">
                  {selectedCaseStudy.tags.map((t, idx) => (
                    <span key={t} className={`case-badge ${idx === 0 ? "blue" : idx === 1 ? "green" : ""}`}>{t}</span>
                  ))}
                </div>
                <h2 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-1)", margin: "8px 0 6px", lineHeight: 1.28 }}>
                  {selectedCaseStudy.title}
                </h2>
                <div className="case-company-sub">{selectedCaseStudy.company}</div>
                <p className="case-deep-headline">{selectedCaseStudy.deepDive.headline}</p>
                <div className="case-deep-meta-bar">
                  <span>⏱️ {selectedCaseStudy.deepDive.timeline}</span>
                  <span>·</span>
                  <span>{selectedCaseStudy.category === "Enterprise Work" ? "🏢 Enterprise Production Scale" : "🚀 Live Shipped Product"}</span>
                </div>
              </div>

              {/* Highlight Metrics */}
              <div>
                <div className="case-deep-section-head">Key Measured Outcomes</div>
                <div className="case-impact-cards-grid">
                  {selectedCaseStudy.deepDive.impactDetails.map((imp) => (
                    <div key={imp.label} className="case-impact-card">
                      <span className="case-impact-val">{imp.value}</span>
                      <span className="case-impact-lbl">{imp.label}</span>
                      <span className="case-impact-ctx">{imp.context}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem & Context */}
              <div>
                <div className="case-deep-section-head">The Friction Before</div>
                <div className="case-problem-callout">
                  <p className="case-desc-p" style={{ fontSize: "13.5px", lineHeight: 1.6, margin: 0 }}>
                    {selectedCaseStudy.deepDive.context}
                  </p>
                </div>
              </div>

              {/* System Architecture & Flow */}
              <div>
                <div className="case-deep-section-head">End-to-End System Architecture</div>
                <div className="case-pipeline-grid">
                  {selectedCaseStudy.deepDive.architectureSteps.map((step) => (
                    <div key={step.step} className="case-pipeline-step">
                      <span className="case-step-num-pill">{step.step}</span>
                      <div>
                        <h4 className="case-step-content-h4">{step.title}</h4>
                        <p className="case-step-content-p">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Decisions & Tradeoffs */}
              <div>
                <div className="case-deep-section-head">Engineering Decisions &amp; Trade-Offs</div>
                <div className="case-decisions-grid">
                  {selectedCaseStudy.deepDive.tradeoffs.map((item) => (
                    <div key={item.decision} className="case-decision-card">
                      <div className="case-decision-header-row">
                        <span className="case-decision-title">{item.decision}</span>
                        <span className="case-decision-choice-tag">Chosen: {item.chosen}</span>
                      </div>
                      <p className="case-decision-why-p">{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PM Leadership */}
              <div>
                <div className="case-deep-section-head">Product Leadership &amp; Cross-Functional Alignment</div>
                <div className="case-pm-points-list">
                  {selectedCaseStudy.deepDive.pmOwnership.map((pm) => (
                    <div key={pm.area} className="case-pm-point-item">
                      <div className="case-pm-point-title">⚡ {pm.area}</div>
                      <div className="case-pm-point-detail">{pm.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="case-modal-footer">
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                {selectedCaseStudy.live && (
                  <a
                    href={selectedCaseStudy.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shortcuts-footer-btn"
                    style={{ textDecoration: "none", color: "var(--blue)", fontWeight: 600 }}
                    title={`Open ${selectedCaseStudy.title} live in new tab`}
                  >
                    ↗ Launch Live App
                  </a>
                )}
                {selectedCaseStudy.github && (
                  <a
                    href={selectedCaseStudy.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shortcuts-footer-btn"
                    style={{ textDecoration: "none" }}
                    title="View source repository"
                  >
                    🐙 View Repo
                  </a>
                )}
                <button
                  onClick={() => navigateCaseStudy("next")}
                  className="shortcuts-footer-btn"
                  title="View Next Case Study (→ Arrow key)"
                >
                  Next Case Study →
                </button>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button
                  onClick={() => {
                    playTactileSound("click");
                    setSelectedCaseStudy(null);
                  }}
                  className="shortcuts-footer-btn"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    playTactileSound("click");
                    handleOpenCalendly();
                  }}
                  className="case-modal-cta-btn"
                >
                  <span>Discuss in 30-min Call</span>
                  <ArrowUpRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              Glad you poked around the widgets! Drop me a note at <strong>baxisakar18@gmail.com</strong> or hit play on The Local Train track above.
            </div>
          </div>
          <button
            onClick={() => {
              playTactileSound("click");
              setShowToast(false);
            }}
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
