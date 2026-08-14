import Image from "next/image";
import { useTranslations } from "next-intl";

import { getModeNumber, type PortfolioMode } from "./portfolio-data";
import * as styles from "./portfolio-hero.css";

type PortfolioHeroProps = {
  mode: PortfolioMode;
};

function PhotographyVisual() {
  const t = useTranslations("Portfolio.profile");

  return (
    <figure className={styles.portrait} data-cursor="view">
      <Image
        alt={t("imageAlt")}
        className={styles.portraitImage}
        fill
        priority
        sizes="(max-width: 800px) 100vw, 42vw"
        src="/img/profile.png"
      />
      <figcaption className={styles.portraitCaption}>
        <span>{t("caption")}</span>
        <span>© {new Date().getFullYear()}</span>
      </figcaption>
    </figure>
  );
}

function DevelopmentVisual() {
  return (
    <div aria-hidden="true" className={styles.codeWindow} data-cursor="view">
      <div className={styles.codeBar}>
        <span className={styles.codeDot} />
        <span className={styles.codeDot} />
        <span className={styles.codeDot} />
        <p className={styles.codeFile}>portfolio.tsx</p>
      </div>
      <div className={styles.codeLines}>
        <i className={styles.codeLine} />
        <i className={styles.codeLine} />
        <i className={styles.codeLine} />
        <i className={styles.codeLine} />
        <i className={styles.codeLine} />
        <i className={styles.codeLine} />
      </div>
      <div className={styles.codeOrbit} />
      <p className={styles.codeSteps}>
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
    <section className={styles.root} id="top">
      <div className={styles.copy}>
        <p className={styles.kicker} data-animate="hero-reveal">
          {t(`modes.${mode}.kicker`)}
        </p>
        <h1 className={styles.title} data-animate="hero-reveal">
          {t(`modes.${mode}.titleLineOne`)}
          <span className={styles.titleAccent}>
            {t(`modes.${mode}.titleLineTwo`)}
          </span>
        </h1>
        <p className={styles.introduction} data-animate="hero-reveal">
          {t(`modes.${mode}.introduction`)}
        </p>
        <a className={styles.action} data-animate="hero-reveal" href="#work">
          {t(`modes.${mode}.explore`)}{" "}
          <span aria-hidden="true" className={styles.actionArrow}>
            ↓
          </span>
        </a>
      </div>

      <div className={styles.visual} data-animate="hero-reveal">
        {mode === "photography" ? <PhotographyVisual /> : <DevelopmentVisual />}
        <span className={styles.number}>{getModeNumber(mode)} / 02</span>
      </div>
    </section>
  );
}
