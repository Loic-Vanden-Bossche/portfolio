import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";

import { PhotoEssay } from "./photo-essay";
import { developmentProjects, type PortfolioMode } from "./portfolio-data";
import { ProjectCard } from "./project-card";

type PortfolioWorkProps = {
  mode: PortfolioMode;
};

export function PortfolioWork({ mode }: PortfolioWorkProps) {
  const t = useTranslations("Portfolio");

  if (mode === "photography") {
    return (
      <section
        className="work-section photo-work-section"
        id="work"
        aria-labelledby="work-title"
      >
        <PhotoEssay />
      </section>
    );
  }

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <SectionHeading
        introduction={t(`modes.${mode}.work.introduction`)}
        label={t(`modes.${mode}.work.label`)}
        title={t(`modes.${mode}.work.title`)}
        titleId="work-title"
      />

      <div className={`project-grid ${mode}-grid`}>
        {developmentProjects.map((project, index) => (
          <ProjectCard
            isFeatured={index === 0}
            key={project.key}
            mode={mode}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
