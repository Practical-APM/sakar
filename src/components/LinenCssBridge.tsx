"use client";

import { useEffect } from "react";

/** Same plate as ClothBackground — keep patches / nav in sync. */
const LINEN_SRC = "/textures/linen-hero.jpg";

/** Ensures CSS patches / nav share the photographic linen plate. */
export function LinenCssBridge() {
  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.setProperty(
      "--linen-url",
      `url(${LINEN_SRC})`,
    );
    try {
      window.localStorage.removeItem("sb-theme");
    } catch {
      /* ignore */
    }
  }, []);

  return null;
}
