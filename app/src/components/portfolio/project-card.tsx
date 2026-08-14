import Image from "next/image";
import { useTranslations } from "next-intl";

import type { PortfolioMode, PortfolioProject } from "./portfolio-data";
import * as styles from "./project-card.css";

type ProjectCardProps = {
  isFeatured: boolean;
  mode: PortfolioMode;
  project: PortfolioProject;
};

export function ProjectCard({ isFeatured, mode, project }: ProjectCardProps) {
  const t = useTranslations("Portfolio");
  const translationPath = `modes.${mode}.work.projects.${project.key}`;

  return (
    <article
      className={`${styles.root} ${project.index === "03" ? styles.wide : ""}`}
      data-animate="reveal"
      data-portfolio-mode={mode}
      data-tone={project.tone}
    >
      {mode === "photography" && isFeatured ? (
        <Image
          alt={t("profile.workImageAlt")}
          className={styles.image}
          fill
          sizes="(max-width: 800px) 100vw, 55vw"
          src="/img/profile.png"
        />
      ) : (
        <div className={styles.art} aria-hidden="true">
          <span className={styles.artPoint} />
        </div>
      )}
      <div className={styles.meta}>
        <span>{project.index}</span>
        <span>{t(`${translationPath}.type`)}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{t(`${translationPath}.title`)}</h3>
        <p className={styles.description}>{t(`${translationPath}.copy`)}</p>
      </div>
    </article>
  );
}
