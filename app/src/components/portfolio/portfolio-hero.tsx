import Image from "next/image";
import { useTranslations } from "next-intl";

import { getModeNumber, type PortfolioMode } from "./portfolio-data";

type PortfolioHeroProps = {
  mode: PortfolioMode;
};

function PhotographyVisual() {
  const t = useTranslations("Portfolio.profile");

  return (
    <figure className="portrait-frame" data-cursor="view">
      <Image
        alt={t("imageAlt")}
        fill
        priority
        sizes="(max-width: 800px) 100vw, 42vw"
        src="/img/profile.png"
      />
      <figcaption>
        <span>{t("caption")}</span>
        <span>© {new Date().getFullYear()}</span>
      </figcaption>
    </figure>
  );
}

function DevelopmentVisual() {
  return (
    <div className="code-window" aria-hidden="true" data-cursor="view">
      <div className="code-window-bar">
        <span />
        <span />
        <span />
        <p>portfolio.tsx</p>
      </div>
      <div className="code-lines">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="code-orbit" />
      <p>
        01 / CREATE
        <br />
        02 / ITERATE
        <br />
        03 / SHIP
      </p>
    </div>
  );
}

export function PortfolioHero({ mode }: PortfolioHeroProps) {
  const t = useTranslations("Portfolio");

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="hero-kicker hero-reveal">{t(`modes.${mode}.kicker`)}</p>
        <h1 className="hero-reveal">
          {t(`modes.${mode}.titleLineOne`)}
          <span>{t(`modes.${mode}.titleLineTwo`)}</span>
        </h1>
        <p className="hero-introduction hero-reveal">
          {t(`modes.${mode}.introduction`)}
        </p>
        <a className="text-action hero-reveal" href="#work">
          {t(`modes.${mode}.explore`)} <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div className="hero-visual hero-reveal">
        {mode === "photography" ? <PhotographyVisual /> : <DevelopmentVisual />}
        <span className="visual-number">{getModeNumber(mode)} / 02</span>
      </div>
    </section>
  );
}
