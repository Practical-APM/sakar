"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Light linen only — dark theme was removed; it muddied the cloth.
 * Clears any leftover localStorage preference on mount.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    try {
      window.localStorage.removeItem("sb-theme");
    } catch {
      /* ignore */
    }
  }, []);

  return children;
}
