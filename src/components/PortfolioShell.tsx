"use client";

import { useCallback, useState } from "react";
import { Experience } from "./Experience";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Navigation } from "./Navigation";
import { ProjectSection } from "./ProjectSection";
import { StitchLayer } from "./StitchLayer";
import { ThemeToggle } from "./ThemeToggle";
import { ThinkingSection } from "./ThinkingSection";
import { SpoolLoading } from "./LoadingScreen";
import { LinenCssBridge } from "./LinenCssBridge";
import { ThemeProvider } from "@/hooks/useTheme";

export function PortfolioShell() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [handoff, setHandoff] = useState(0);
  const onProgress = useCallback((p: number) => setProgress(p), []);

  const onLoadComplete = useCallback((h: number) => {
    setHandoff(h);
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      <LinenCssBridge />
      {loading && <SpoolLoading onComplete={onLoadComplete} />}
      <a href="#intro" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <ThemeToggle />
      <StitchLayer onProgress={onProgress} handoffProgress={handoff}>
        <main>
          <Hero stitchProgress={progress} />
          <ProjectSection stitchProgress={progress} />
          <ThinkingSection stitchProgress={progress} />
          <Experience stitchProgress={progress} />
          <Footer />
        </main>
      </StitchLayer>
    </ThemeProvider>
  );
}
