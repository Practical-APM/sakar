"use client";

import { useEffect } from "react";

const LINEN_SRC = "/textures/linen-light.jpg";

/** Ensures CSS patches / nav share the photographic linen plate. */
export function LinenCssBridge() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--linen-url",
      `url(${LINEN_SRC})`,
    );
  }, []);

  return null;
}
