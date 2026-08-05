"use client";

import { useTheme } from "@/hooks/useTheme";
import { IconMoon, IconSun } from "./Icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      <button
        type="button"
        className={theme === "light" ? "is-active" : ""}
        aria-label="Light theme"
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
      >
        <IconSun />
      </button>
      <button
        type="button"
        className={theme === "dark" ? "is-active" : ""}
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        <IconMoon />
      </button>
    </div>
  );
}
