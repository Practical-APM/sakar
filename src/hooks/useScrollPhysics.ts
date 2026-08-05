"use client";

import { useCallback, useSyncExternalStore } from "react";

function getScrollProgress() {
  if (typeof window === "undefined") return 0;
  const max = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  return Math.min(1, Math.max(0, window.scrollY / max));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  window.addEventListener("resize", onStoreChange);
  return () => {
    window.removeEventListener("scroll", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
  };
}

export function useScrollPhysics() {
  return useSyncExternalStore(
    subscribe,
    getScrollProgress,
    useCallback(() => 0, []),
  );
}
