import Image from "next/image";
import { useTranslations } from "next-intl";

import type { PortfolioMode, PortfolioProject } from "./portfolio-data";

type ProjectCardProps = {
  isFeatured: boolean;
  mode: PortfolioMode;
  project: PortfolioProject;
};

export function ProjectCard({ isFeatured, mode, project }: ProjectCardProps) {
  const t = useTranslations("Portfolio");
  const translationPath = `modes.${mode}.work.projects.${project.key}`;

  return (
    <article className={`project-card project-${project.tone} reveal`}>
      {mode === "photography" && isFeatured ? (
        <Image
          alt={t("profile.workImageAlt")}
          className="project-image"
          fill
          sizes="(max-width: 800px) 100vw, 55vw"
          src="/img/profile.png"
        />
      ) : (
        <div className="card-art" aria-hidden="true">
          <span />
        </div>
      )}
      <div className="card-meta">
        <span>{project.index}</span>
        <span>{t(`${translationPath}.type`)}</span>
      </div>
      <div className="card-content">
        <h3>{t(`${translationPath}.title`)}</h3>
        <p>{t(`${translationPath}.copy`)}</p>
      </div>
    </article>
  );
}
