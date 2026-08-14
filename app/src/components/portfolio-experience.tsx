"use client";

import { useRef } from "react";

import { CosmicScene } from "@/components/cosmic-scene";
import { ArchiveNote } from "@/components/portfolio/archive-note";
import { ModeCurtain } from "@/components/portfolio/mode-curtain";
import { PortfolioAbout } from "@/components/portfolio/portfolio-about";
import { PortfolioFooter } from "@/components/portfolio/portfolio-footer";
import { PortfolioHeader } from "@/components/portfolio/portfolio-header";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { PortfolioWork } from "@/components/portfolio/portfolio-work";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { usePortfolioMode } from "@/hooks/use-portfolio-mode";
import { usePortfolioMotion } from "@/hooks/use-portfolio-motion";

export function PortfolioExperience() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const { changeMode, isSwitching, mode, nextMode } = usePortfolioMode(
    stage,
    curtain,
  );

  usePortfolioMotion(root, stage, mode);

  return (
    <div className="site-shell" data-mode={mode} ref={root}>
      <div className="scene" aria-hidden="true">
        <CosmicScene />
      </div>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <ModeCurtain nextMode={nextMode} ref={curtain} />
      <PortfolioHeader
        isSwitching={isSwitching}
        mode={mode}
        onModeChange={changeMode}
      />
      <ReturnToTop />

      <div
        aria-busy={isSwitching}
        aria-labelledby={`${mode}-tab`}
        className="mode-stage"
        id="portfolio-panel"
        ref={stage}
        role="tabpanel"
      >
        <main>
          <PortfolioHero mode={mode} />
          <PortfolioWork mode={mode} />
          <PortfolioAbout mode={mode} />
          <ArchiveNote />
        </main>
        <PortfolioFooter />
      </div>
    </div>
  );
}
