"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

function getTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("sb-theme");
  return stored === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("sb-theme-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("sb-theme-change", onChange);
  };
}

function applyTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  window.localStorage.setItem("sb-theme", t);
  window.dispatchEvent(new Event("sb-theme-change"));
}

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    applyTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  const value = useMemo(() => ({ theme, toggle, setTheme }), [theme, toggle, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
