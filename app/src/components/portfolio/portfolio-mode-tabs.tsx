import { useTranslations } from "next-intl";

import {
  getModeNumber,
  type PortfolioMode,
  portfolioModes,
} from "./portfolio-data";
import * as styles from "./portfolio-mode-tabs.css";

type PortfolioModeTabsProps = {
  activeMode: PortfolioMode;
  disabled: boolean;
  onChange: (mode: PortfolioMode) => void;
};

export function PortfolioModeTabs({
  activeMode,
  disabled,
  onChange,
}: PortfolioModeTabsProps) {
  const t = useTranslations("Portfolio");

  return (
    <div
      className={styles.root}
      aria-label={t("navigation.disciplineLabel")}
      role="tablist"
    >
      {portfolioModes.map((mode) => (
        <button
          aria-controls="portfolio-panel"
          aria-selected={activeMode === mode}
          className={styles.tab}
          data-cursor="switch"
          disabled={disabled}
          id={`${mode}-tab`}
          key={mode}
          onClick={() => onChange(mode)}
          role="tab"
          type="button"
        >
          <span className={styles.index}>{getModeNumber(mode)}</span>
          {t(`modes.${mode}.shortLabel`)}
        </button>
      ))}
    </div>
  );
}
