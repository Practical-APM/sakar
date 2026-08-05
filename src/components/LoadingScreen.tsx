"use client";

import { useEffect, useState } from "react";

/** Fast dismiss — no artificial 1.4s wait. */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const ready = () => {
      setHiding(true);
      window.setTimeout(() => setVisible(false), 280);
    };

    if (document.readyState === "complete") {
      const t = window.setTimeout(ready, 180);
      return () => window.clearTimeout(t);
    }

    window.addEventListener("load", ready, { once: true });
    const fallback = window.setTimeout(ready, 600);
    return () => {
      window.removeEventListener("load", ready);
      window.clearTimeout(fallback);
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
      <p className="loading-screen__text">Threading…</p>
    </div>
  );
}
