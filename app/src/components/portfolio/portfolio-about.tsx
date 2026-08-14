import { useTranslations } from "next-intl";

import { type PortfolioMode, portfolioSkills } from "./portfolio-data";

type PortfolioAboutProps = {
  mode: PortfolioMode;
};

export function PortfolioAbout({ mode }: PortfolioAboutProps) {
  const t = useTranslations("Portfolio");

  return (
    <section className="about-section" id="about">
      <div className="about-card reveal">
        <div className="about-mark" aria-hidden="true">
          LP / {mode === "photography" ? "PHOTO" : "DEV"}
        </div>
        <div>
          <p className="section-label">{t("about.label")}</p>
          <h2>{t("about.title")}</h2>
        </div>
        <div className="about-copy">
          <p>{t("about.copy")}</p>
          <div className="skill-list" aria-label={t("about.skillsLabel")}>
            {portfolioSkills[mode].map((skill) => (
              <span key={skill}>{t(`modes.${mode}.skills.${skill}`)}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
