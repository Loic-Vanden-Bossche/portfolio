import { useTranslations } from "next-intl";

import * as styles from "./portfolio-about.css";
import { type PortfolioMode, portfolioSkills } from "./portfolio-data";

type PortfolioAboutProps = {
  mode: PortfolioMode;
};

export function PortfolioAbout({ mode }: PortfolioAboutProps) {
  const t = useTranslations("Portfolio");

  return (
    <section className={styles.root} id="about">
      <div className={styles.card} data-animate="reveal">
        <div className={styles.mark} aria-hidden="true">
          LP / {mode === "photography" ? "PHOTO" : "DEV"}
        </div>
        <div>
          <p className={styles.label}>{t("about.label")}</p>
          <h2 className={styles.title}>{t("about.title")}</h2>
        </div>
        <div className={styles.copy}>
          <p className={styles.description}>{t("about.copy")}</p>
          <div className={styles.skills} aria-label={t("about.skillsLabel")}>
            {portfolioSkills[mode].map((skill) => (
              <span className={styles.skill} key={skill}>
                {t(`modes.${mode}.skills.${skill}`)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
