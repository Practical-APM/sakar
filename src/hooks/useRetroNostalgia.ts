"use client";

import { useEffect, useState } from "react";

export type RetroPalette = "crt" | "gameboy" | "synthwave";

export const PALETTES: Record<
  RetroPalette,
  {
    name: string;
    bg: string;
    lime: string;
    sky: string;
    pink: string;
    gold: string;
    coral: string;
  }
> = {
  crt: {
    name: "CRT CLASSIC",
    bg: "#07070f",
    lime: "#92cc41",
    sky: "#209cee",
    pink: "#f06292",
    gold: "#f7d51d",
    coral: "#e76e55",
  },
  gameboy: {
    name: "GAMEBOY 8-BIT",
    bg: "#0f380f",
    lime: "#9bbc0f",
    sky: "#8bac0f",
    pink: "#306230",
    gold: "#9bbc0f",
    coral: "#306230",
  },
  synthwave: {
    name: "CYBER NEON",
    bg: "#0d0221",
    lime: "#00ffcc",
    sky: "#00bbf9",
    pink: "#ff007f",
    gold: "#fee440",
    coral: "#ff5400",
  },
};

/** Konami code detection sequence (Up Up Down Down Left Right Left Right B A). */
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useRetroNostalgia() {
  const [palette, setPalette] = useState<RetroPalette>("crt");
  const [cheatUnlocked, setCheatUnlocked] = useState(false);
  const [score, setScore] = useState(100);

  // Apply palette theme tokens to document root
  useEffect(() => {
    const root = document.documentElement;
    const theme = PALETTES[palette];
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--lime", theme.lime);
    root.style.setProperty("--sky", theme.sky);
    root.style.setProperty("--pink", theme.pink);
    root.style.setProperty("--gold", theme.gold);
    root.style.setProperty("--coral", theme.coral);
  }, [palette]);

  // Konami Code listener
  useEffect(() => {
    let keyIndex = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_CODE[keyIndex];

      if (key === expected || key.toLowerCase() === expected) {
        keyIndex++;
        if (keyIndex === KONAMI_CODE.length) {
          setCheatUnlocked(true);
          setScore((prev) => prev + 999900);
          keyIndex = 0;
        }
      } else {
        keyIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const cyclePalette = () => {
    const keys: RetroPalette[] = ["crt", "gameboy", "synthwave"];
    const nextIdx = (keys.indexOf(palette) + 1) % keys.length;
    setPalette(keys[nextIdx]);
  };

  const unlockCheatManual = () => {
    setCheatUnlocked(true);
    setScore((prev) => prev + 999900);
  };

  return {
    palette,
    paletteName: PALETTES[palette].name,
    cyclePalette,
    cheatUnlocked,
    unlockCheatManual,
    score,
    addScore: (pts: number) => setScore((prev) => prev + pts),
  };
}
