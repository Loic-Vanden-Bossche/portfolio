import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/ui/locale-switcher";

import type { PortfolioMode } from "./portfolio-data";
import * as styles from "./portfolio-header.css";
import { PortfolioModeTabs } from "./portfolio-mode-tabs";
import { StoriesDialog } from "./stories-dialog";

type PortfolioHeaderProps = {
  isSwitching: boolean;
  mode: PortfolioMode;
  onModeChange: (mode: PortfolioMode) => void;
};

export function PortfolioHeader({
  isSwitching,
  mode,
  onModeChange,
}: PortfolioHeaderProps) {
  const t = useTranslations("Portfolio.navigation");

  return (
    <header className={styles.root} data-animate="hero-reveal">
      <a className={styles.brand} href="#top" aria-label={t("homeLabel")}>
        LP<span className={styles.brandAccent}>.</span>
      </a>

      <PortfolioModeTabs
        activeMode={mode}
        disabled={isSwitching}
        onChange={onModeChange}
      />

      <nav aria-label={t("primaryLabel")} className={styles.navigation}>
        <StoriesDialog />
        <a className={styles.navigationLink} href="#work">
          {t("work")}
        </a>
        <a className={styles.navigationLink} href="#about">
          {t("about")}
        </a>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
