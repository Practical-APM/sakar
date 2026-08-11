"use client";

import { useEffect, useState } from "react";

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  unlocked: boolean;
}

export function useRetroAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "explorer",
      title: "DEEP EXPLORER",
      desc: "Scrolled to the end of Sakar's portfolio",
      icon: "📜",
      unlocked: false,
    },
    {
      id: "audiophile",
      title: "AUDIO ENGINE",
      desc: "Toggled the retro audio soundtrack",
      icon: "🎧",
      unlocked: false,
    },
    {
      id: "tactician",
      title: "PRODUCT STRATEGIST",
      desc: "Explored all Product Philosophy pillars",
      icon: "⚡",
      unlocked: false,
    },
    {
      id: "konami",
      title: "ARCADE VETERAN",
      desc: "Unlocked the secret Konami Code cheat",
      icon: "🎮",
      unlocked: false,
    },
  ]);

  const [toast, setToast] = useState<Achievement | null>(null);

  const unlock = (id: string) => {
    setAchievements((prev) => {
      const target = prev.find((a) => a.id === id);
      if (!target || target.unlocked) return prev;

      const updated = prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a));
      setToast({ ...target, unlocked: true });
      return updated;
    });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Auto-detect scroll explorer achievement
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && window.scrollY / total > 0.85) {
        unlock("explorer");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return {
    achievements,
    unlockedCount,
    totalCount: achievements.length,
    unlock,
    recentToast: toast,
  };
}
