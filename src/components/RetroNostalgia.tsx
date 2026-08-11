"use client";

import { useEffect, useState } from "react";
import type { RetroPalette } from "@/hooks/useRetroNostalgia";

export function RetroEqBars({ playing }: { playing: boolean }) {
  return (
    <div className={`retro-eq${playing ? " is-playing" : ""}`} aria-hidden>
      <span className="retro-eq__bar" style={{ ["--i" as string]: 1 }} />
      <span className="retro-eq__bar" style={{ ["--i" as string]: 2 }} />
      <span className="retro-eq__bar" style={{ ["--i" as string]: 3 }} />
      <span className="retro-eq__bar" style={{ ["--i" as string]: 4 }} />
      <span className="retro-eq__bar" style={{ ["--i" as string]: 5 }} />
    </div>
  );
}

export function PaletteToggle({
  paletteName,
  onCycle,
}: {
  paletteName: string;
  onCycle: () => void;
}) {
  return (
    <button
      type="button"
      className="nes-btn palette-toggle-btn"
      onClick={onCycle}
      title="Cycle retro display color palette"
    >
      <span className="palette-toggle-icon">🎨</span>
      <span className="palette-toggle-label">{paletteName}</span>
    </button>
  );
}

export function RetroScoreDisplay({
  score,
  cheatUnlocked,
  onUnlock,
}: {
  score: number;
  cheatUnlocked: boolean;
  onUnlock: () => void;
}) {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (cheatUnlocked) {
      setToast(true);
      const timer = window.setTimeout(() => setToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [cheatUnlocked]);

  return (
    <div className="retro-score-hud">
      <div className="retro-score-box" onClick={onUnlock} title="Click to trigger secret 1UP!">
        <span className="retro-score-label">1UP</span>
        <span className="retro-score-val">{String(score).padStart(6, "0")}</span>
      </div>

      {toast && (
        <div className="cheat-toast nes-container is-rounded is-dark">
          <span className="cheat-toast__icon">⭐</span>
          <div>
            <strong>KONAMI CHEAT UNLOCKED!</strong>
            <p>+999,900 PTS · SUPER OVERDRIVE ACTIVE</p>
          </div>
        </div>
      )}
    </div>
  );
}

const QUOTES = [
  "PRESS START TO BUILD!",
  "AI PRODUCT MANAGER LEVEL 99!",
  "INSERT COIN TO CONTINUE!",
  "60% FASTER TURNAROUND TIME!",
  "LIVERPOOL FC IS TOP OF THE LEAGUE!",
  "NOSTALGIA OVERLOAD!",
];

export function InteractiveMascot({ onBlip }: { onBlip?: () => void }) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [jumping, setJumping] = useState(false);

  const handleClick = () => {
    onBlip?.();
    setJumping(true);
    setQuoteIdx((prev) => (prev + 1) % QUOTES.length);
    window.setTimeout(() => setJumping(false), 450);
  };

  return (
    <div className="interactive-mascot" onClick={handleClick} title="Click for 8-bit quote!">
      <div className={`mascot-sprite${jumping ? " is-jumping" : ""}`}>
        <div className="mascot-sprite__head" />
        <div className="mascot-sprite__body" />
      </div>
      <div className={`mascot-bubble${jumping ? " is-pop" : ""}`}>
        <span>{QUOTES[quoteIdx]}</span>
      </div>
    </div>
  );
}
