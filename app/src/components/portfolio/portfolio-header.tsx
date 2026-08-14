import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/ui/locale-switcher";

import type { PortfolioMode } from "./portfolio-data";
import { PortfolioModeTabs } from "./portfolio-mode-tabs";

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
    <header className="topbar hero-reveal">
      <a className="brand" href="#top" aria-label={t("homeLabel")}>
        LP<span>.</span>
      </a>

      <PortfolioModeTabs
        activeMode={mode}
        disabled={isSwitching}
        onChange={onModeChange}
      />

      <nav aria-label={t("primaryLabel")}>
        <a href="#work">{t("work")}</a>
        <a href="#about">{t("about")}</a>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
