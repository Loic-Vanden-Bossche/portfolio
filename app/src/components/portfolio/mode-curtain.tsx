import { useTranslations } from "next-intl";
import { forwardRef } from "react";

import * as styles from "./mode-curtain.css";
import { getModeNumber, type PortfolioMode } from "./portfolio-data";

type ModeCurtainProps = {
  nextMode: PortfolioMode;
};

export const ModeCurtain = forwardRef<HTMLDivElement, ModeCurtainProps>(
  function ModeCurtain({ nextMode }, ref) {
    const t = useTranslations("Portfolio");

    return (
      <div className={styles.root} aria-hidden="true" ref={ref}>
        <span className={styles.index}>{getModeNumber(nextMode)}</span>
        <p className={styles.title}>{t(`modes.${nextMode}.transition`)}</p>
        <span className={styles.line} />
      </div>
    );
  },
);
