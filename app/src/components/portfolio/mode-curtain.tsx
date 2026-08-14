import { useTranslations } from "next-intl";
import { forwardRef } from "react";

import { getModeNumber, type PortfolioMode } from "./portfolio-data";

type ModeCurtainProps = {
  nextMode: PortfolioMode;
};

export const ModeCurtain = forwardRef<HTMLDivElement, ModeCurtainProps>(
  function ModeCurtain({ nextMode }, ref) {
    const t = useTranslations("Portfolio");

    return (
      <div className="mode-curtain" aria-hidden="true" ref={ref}>
        <span className="curtain-index">{getModeNumber(nextMode)}</span>
        <p>{t(`modes.${nextMode}.transition`)}</p>
        <span className="curtain-line" />
      </div>
    );
  },
);
