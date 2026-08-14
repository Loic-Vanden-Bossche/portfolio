import Image from "next/image";
import { useTranslations } from "next-intl";
import { type CSSProperties, useRef } from "react";

import { usePhotoEssayMotion } from "@/hooks/use-photo-essay-motion";

import { PhotoAtmosphere } from "./photo-atmosphere";
import { type PhotoChapter, photoChapters } from "./portfolio-data";

type ChapterProps = {
  chapter: PhotoChapter;
};

function getChapterImageSizes(layout: string) {
  if (["botanical", "clock", "nightline"].includes(layout)) {
    return "(max-width: 800px) 84vw, 40vw";
  }

  if (["witness", "city", "spiral", "monument"].includes(layout)) {
    return "(max-width: 800px) 100vw, 82vw";
  }

  return "100vw";
}

function Chapter({ chapter }: ChapterProps) {
  const t = useTranslations("Portfolio.modes.photography.essay");
  const titleId = `photo-title-${chapter.key}`;

  return (
    <section
      aria-labelledby={titleId}
      className={`photo-chapter photo-${chapter.layout}`}
      data-photo-accent={chapter.accent}
      data-photo-animation={chapter.animation}
      data-photo-background={chapter.background}
      style={
        {
          "--essay-accent": chapter.accent,
        } as CSSProperties
      }
    >
      <div className="photo-stage">
        <div className="photo-frame" data-cursor="view">
          <Image
            alt={t(`chapters.${chapter.key}.alt`)}
            fill
            quality={72}
            sizes={getChapterImageSizes(chapter.layout)}
            src={`/img/sections/${chapter.file}`}
          />
          {chapter.animation === "shutters" ? (
            <div className="photo-shutters" aria-hidden="true">
              <span className="photo-shutter" />
              <span className="photo-shutter" />
            </div>
          ) : null}
          {chapter.animation === "pulse" ? (
            <div className="photo-pulse-rings" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          ) : null}
          {chapter.animation === "focus" ? (
            <div className="photo-botanical-atmosphere" aria-hidden="true">
              <span className="photo-botanical-aura" />
              <span className="photo-pollen" />
              <span className="photo-pollen" />
              <span className="photo-pollen" />
              <span className="photo-pollen" />
              <span className="photo-pollen" />
            </div>
          ) : null}
          {chapter.animation === "perspective" ? (
            <div className="photo-time-orbit" aria-hidden="true">
              <span className="photo-time-ring photo-time-ring-outer" />
              <span className="photo-time-ring photo-time-ring-inner" />
              <span className="photo-time-hand" />
              <span className="photo-time-center" />
            </div>
          ) : null}
        </div>

        <div className="photo-copy">
          <div className="photo-meta">
            <span className="photo-number">{chapter.index}</span>
            <span>{t(`chapters.${chapter.key}.eyebrow`)}</span>
          </div>
          <div className="photo-title-clip">
            <h3 id={titleId}>{t(`chapters.${chapter.key}.title`)}</h3>
          </div>
          <span className="photo-rule" aria-hidden="true" />
          <p>{t(`chapters.${chapter.key}.copy`)}</p>
        </div>
      </div>
    </section>
  );
}

export function PhotoEssay() {
  const root = useRef<HTMLDivElement>(null);
  const t = useTranslations("Portfolio.modes.photography.essay");

  usePhotoEssayMotion(root);

  return (
    <div
      className="photo-essay"
      ref={root}
      style={
        {
          "--essay-accent": photoChapters[0].accent,
          "--essay-bg": photoChapters[0].background,
          "--atmosphere-accent": photoChapters[0].accent,
        } as CSSProperties
      }
    >
      <PhotoAtmosphere />

      <nav className="photo-progress" aria-label={t("navigationLabel")}>
        {photoChapters.map((chapter) => (
          <a
            aria-label={t("goTo", {
              title: t(`chapters.${chapter.key}.title`),
            })}
            href={`#photo-title-${chapter.key}`}
            key={chapter.key}
          >
            <span />
          </a>
        ))}
      </nav>

      <header className="photo-essay-intro reveal">
        <p className="section-label">{t("label")}</p>
        <h2 id="work-title">{t("title")}</h2>
        <p>{t("introduction")}</p>
        <span>{t("direction")}</span>
      </header>

      {photoChapters.map((chapter) => (
        <Chapter chapter={chapter} key={chapter.key} />
      ))}
    </div>
  );
}
