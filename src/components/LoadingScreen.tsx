"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const start = window.setTimeout(() => setHiding(true), 900);
    const end = window.setTimeout(() => setVisible(false), 1400);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen ${hiding ? "is-hiding" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading-screen__mark">S/B</div>
      <p className="loading-screen__text">Threading the page…</p>
    </div>
  );
}
