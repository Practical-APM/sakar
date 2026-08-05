type IconProps = {
  className?: string;
  size?: number;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconKnuud({ className, size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const r = ((deg * Math.PI) / 180);
        const x2 = 24 + Math.cos(r) * 16;
        const y2 = 24 + Math.sin(r) * 16;
        return (
          <line key={deg} x1="24" y1="24" x2={x2} y2={y2} {...stroke} />
        );
      })}
      <circle cx="24" cy="24" r="10" {...stroke} opacity="0.5" />
    </svg>
  );
}

export function IconCloud({ className, size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        d="M12 26h16a6 6 0 0 0 0-12 8 8 0 0 0-15.2-2.4A5.5 5.5 0 0 0 12 26z"
        {...stroke}
      />
    </svg>
  );
}

export function IconEcho({ className, size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="4" fill="currentColor" />
      <circle cx="20" cy="20" r="9" {...stroke} />
      <circle cx="20" cy="20" r="14" {...stroke} opacity="0.6" />
    </svg>
  );
}

export function IconBeacon({ className, size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 8v6M14 30h12M17 30l1.5-10h3L23 30" {...stroke} />
      <path d="M20 14l8-4M20 14l-8-4M20 14l8 3M20 14l-8 3" {...stroke} />
      <rect x="16" y="20" width="8" height="4" rx="1" {...stroke} />
    </svg>
  );
}

export function IconLedger({ className, size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="10" y="10" width="20" height="4" rx="1" {...stroke} />
      <rect x="12" y="16" width="16" height="4" rx="1" {...stroke} />
      <rect x="14" y="22" width="12" height="4" rx="1" {...stroke} />
      <rect x="16" y="28" width="8" height="3" rx="1" {...stroke} />
    </svg>
  );
}

export function IconLightbulb({ className, size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" className={className} aria-hidden>
      <path d="M18 6a8 8 0 0 1 4 14.9V24h-8v-3.1A8 8 0 0 1 18 6z" {...stroke} />
      <path d="M14 27h8M15 30h6" {...stroke} />
    </svg>
  );
}

export function IconTarget({ className, size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" className={className} aria-hidden>
      <circle cx="18" cy="18" r="12" {...stroke} />
      <circle cx="18" cy="18" r="7" {...stroke} />
      <circle cx="18" cy="18" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function IconPeople({ className, size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" className={className} aria-hidden>
      <circle cx="13" cy="12" r="4" {...stroke} />
      <circle cx="23" cy="13" r="3.5" {...stroke} />
      <path d="M6 28c1.5-5 5-7 7-7s5.5 2 7 7" {...stroke} />
      <path d="M18 28c1-4 3.5-6 5-6s4 2 5 6" {...stroke} />
    </svg>
  );
}

export function IconPulse({ className, size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" className={className} aria-hidden>
      <path d="M4 18h6l3-8 5 16 3-8h11" {...stroke} />
    </svg>
  );
}

export function IconCompass({ className, size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" className={className} aria-hidden>
      <circle cx="18" cy="18" r="12" {...stroke} />
      <path d="M18 8v2M18 26v2M8 18h2M26 18h2" {...stroke} />
      <path d="M14 22l4-10 4 10-4-2-4 2z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export function IconSun({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" {...stroke} />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" {...stroke} />
    </svg>
  );
}

export function IconMoon({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M20 14.5A7.5 7.5 0 1 1 9.5 4 6 6 0 0 0 20 14.5z" {...stroke} />
    </svg>
  );
}

export function IconMenu({ className, size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" {...stroke} />
      <path d="M8 9h8M8 12h8M8 15h8" {...stroke} />
    </svg>
  );
}

export function IconArrowCircle({ className, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" className={className} aria-hidden>
      <circle cx="14" cy="14" r="12" {...stroke} />
      <path d="M12 9l5 5-5 5M8 14h9" {...stroke} />
    </svg>
  );
}

export function IconStarBurst({ className, size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" className={className} aria-hidden>
      <circle cx="18" cy="18" r="3" fill="currentColor" />
      {[0, 30, 60, 90, 120, 150].map((deg) => {
        const r = ((deg * Math.PI) / 180);
        return (
          <line
            key={deg}
            x1={18 - Math.cos(r) * 4}
            y1={18 - Math.sin(r) * 4}
            x2={18 + Math.cos(r) * 14}
            y2={18 + Math.sin(r) * 14}
            {...stroke}
          />
        );
      })}
    </svg>
  );
}

export function ProjectIcon({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  switch (name) {
    case "knuud":
      return <IconKnuud className={className} size={size} />;
    case "hypersync":
      return <IconCloud className={className} size={size} />;
    case "echo":
      return <IconEcho className={className} size={size} />;
    case "beacon":
      return <IconBeacon className={className} size={size} />;
    case "ledger":
      return <IconLedger className={className} size={size} />;
    default:
      return <IconStarBurst className={className} size={size} />;
  }
}

export function PrincipleIcon({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  switch (name) {
    case "lightbulb":
      return <IconLightbulb className={className} size={size} />;
    case "target":
      return <IconTarget className={className} size={size} />;
    case "people":
      return <IconPeople className={className} size={size} />;
    case "pulse":
      return <IconPulse className={className} size={size} />;
    case "compass":
      return <IconCompass className={className} size={size} />;
    default:
      return <IconStarBurst className={className} size={size} />;
  }
}
