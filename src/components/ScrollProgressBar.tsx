"use client";

import { useEffect, useState } from "react";

/** Top CRT inner bezel 8-bit scroll progress bar. */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const current = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      setProgress(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="crt-scroll-track" aria-hidden>
      <div
        className="crt-scroll-bar"
        style={{ width: `${progress.toFixed(1)}%` }}
      />
    </div>
  );
}
