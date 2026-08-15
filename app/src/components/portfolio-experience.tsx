"use client";

import { useRef } from "react";

import { CosmicScene } from "@/components/cosmic-scene";
import { ArchiveNote } from "@/components/portfolio/archive-note";
import { ModeCurtain } from "@/components/portfolio/mode-curtain";
import { PortfolioAbout } from "@/components/portfolio/portfolio-about";
import type { PortfolioMode } from "@/components/portfolio/portfolio-data";
import { PortfolioFooter } from "@/components/portfolio/portfolio-footer";
import { PortfolioHeader } from "@/components/portfolio/portfolio-header";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { PortfolioWork } from "@/components/portfolio/portfolio-work";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { usePortfolioMode } from "@/hooks/use-portfolio-mode";
import { usePortfolioMotion } from "@/hooks/use-portfolio-motion";

import * as styles from "./portfolio-experience.css";

type PortfolioExperienceProps = { initialMode?: PortfolioMode };

export function PortfolioExperience({
  initialMode = "photography",
}: PortfolioExperienceProps) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const { changeMode, isSwitching, mode, nextMode } = usePortfolioMode(
    stage,
    curtain,
    initialMode,
  );

  usePortfolioMotion(root, stage, mode);

  return (
    <div className={styles.root} data-mode={mode} ref={root}>
      <div
        aria-hidden="true"
        className={`${styles.scene} ${mode === "development" ? styles.developmentScene : ""}`}
        data-animate="scene"
      >
        <CosmicScene />
      </div>
      <div
        aria-hidden="true"
        className={`${styles.ambient} ${styles.ambientPrimary}`}
      />
      <div
        aria-hidden="true"
        className={`${styles.ambient} ${styles.ambientSecondary}`}
      />

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
        className={styles.stage}
        id="portfolio-panel"
        ref={stage}
        role="tabpanel"
      >
        <main className={styles.main}>
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
