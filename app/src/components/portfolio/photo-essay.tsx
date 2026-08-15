import { assignInlineVars } from "@vanilla-extract/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { StoryTransitionLink } from "@/components/motion/story-transition-link";
import { usePhotoEssayMotion } from "@/hooks/use-photo-essay-motion";

import { PhotoAtmosphere } from "./photo-atmosphere";
import { PhotoCategoryIcon } from "./photo-category-icon";
import * as styles from "./photo-essay.css";
import { getPhotoAsset, getPhotoCategory } from "./photo-library";
import {
  atmosphereAccent,
  essayAccent,
  essayBackground,
} from "./photo-style-vars.css";
import { usePhotoViewer } from "./photo-viewer-provider";
import { type PhotoChapter, photoChapters } from "./portfolio-data";

type ChapterProps = {
  chapter: PhotoChapter;
  chapterIndex: number;
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

function Chapter({ chapter, chapterIndex }: ChapterProps) {
  const t = useTranslations("Portfolio.modes.photography.essay");
  const archiveT = useTranslations("PhotographyArchive");
  const titleId = `photo-title-${chapter.key}`;
  const asset = getPhotoAsset(chapter.key)!;
  const category = getPhotoCategory(asset.primaryCategory);
  const { openPhoto } = usePhotoViewer();

  return (
    <section
      aria-labelledby={titleId}
      className={`${styles.chapter} ${chapterIndex > 0 ? styles.overlappingChapter : ""} ${styles.chapterLayout[chapter.layout]}`}
      data-photo-accent={chapter.accent}
      data-photo-animation={chapter.animation}
      data-photo-background={chapter.background}
      data-photo-part="chapter"
      style={assignInlineVars({ [essayAccent]: chapter.accent })}
    >
      <div
        className={`${styles.stage} ${styles.stageLayout[chapter.layout]}`}
        data-photo-part="stage"
      >
        <div
          className={`${styles.frame} ${styles.frameLayout[chapter.layout]}`}
          data-cursor="view"
          data-photo-part="frame"
        >
          <Image
            alt={t(`chapters.${chapter.key}.alt`)}
            className={`${styles.image} ${styles.imageLayout[chapter.layout]}`}
            data-photo-part="image"
            fill
            quality={72}
            sizes={getChapterImageSizes(chapter.layout)}
            src={`/img/sections/${chapter.file}`}
          />
          <button
            aria-label={archiveT("viewer.open", {
              title: archiveT(`images.${asset.id}.title`),
            })}
            className={styles.viewerButton}
            data-cursor="view"
            onClick={(event) => {
              const frame = event.currentTarget.parentElement;
              if (frame) openPhoto({ asset, sourceElement: frame });
            }}
            type="button"
          />
          {chapter.animation === "shutters" ? (
            <div className={styles.shutters} aria-hidden="true">
              <span className={styles.shutter} data-photo-part="shutter" />
              <span className={styles.shutter} data-photo-part="shutter" />
            </div>
          ) : null}
          {chapter.animation === "pulse" ? (
            <div className={styles.pulseRings} aria-hidden="true">
              <span className={styles.pulseRing} data-photo-part="pulse-ring" />
              <span className={styles.pulseRing} data-photo-part="pulse-ring" />
              <span className={styles.pulseRing} data-photo-part="pulse-ring" />
            </div>
          ) : null}
          {chapter.animation === "focus" ? (
            <div className={styles.botanicalAtmosphere} aria-hidden="true">
              <span
                className={styles.botanicalAura}
                data-photo-part="botanical-aura"
              />
              <span className={styles.pollen} data-photo-part="pollen" />
              <span className={styles.pollen} data-photo-part="pollen" />
              <span className={styles.pollen} data-photo-part="pollen" />
              <span className={styles.pollen} data-photo-part="pollen" />
              <span className={styles.pollen} data-photo-part="pollen" />
            </div>
          ) : null}
          {chapter.animation === "perspective" ? (
            <div className={styles.timeOrbit} aria-hidden="true">
              <span
                className={`${styles.timeRing} ${styles.timeRingOuter}`}
                data-photo-part="time-ring"
              />
              <span
                className={`${styles.timeRing} ${styles.timeRingInner}`}
                data-photo-part="time-ring"
              />
              <span className={styles.timeHand} data-photo-part="time-hand" />
              <span
                className={styles.timeCenter}
                data-photo-part="time-center"
              />
            </div>
          ) : null}
        </div>

        <div
          className={`${styles.copy} ${styles.copyLayout[chapter.layout]}`}
          data-photo-part="copy"
        >
          <div
            className={`${styles.meta} ${styles.metaLayout[chapter.layout]}`}
          >
            <span className={styles.number} data-photo-part="number">
              {chapter.index}
            </span>
            <span>{t(`chapters.${chapter.key}.eyebrow`)}</span>
          </div>
          <div className={styles.titleClip}>
            <h3
              className={`${styles.title} ${styles.titleLayout[chapter.layout]}`}
              data-photo-part="title"
              id={titleId}
            >
              {t(`chapters.${chapter.key}.title`)}
            </h3>
          </div>
          <span
            aria-hidden="true"
            className={`${styles.rule} ${styles.ruleLayout[chapter.layout]}`}
            data-photo-part="rule"
          />
          <p
            className={`${styles.description} ${styles.descriptionLayout[chapter.layout]}`}
          >
            {t(`chapters.${chapter.key}.copy`)}
          </p>
          <StoryTransitionLink
            category={category.slug}
            className={styles.categoryBadge}
            href={`/photography/${category.slug}`}
          >
            <PhotoCategoryIcon icon={category.icon} size={15} />
            {archiveT(`categories.${category.slug}.title`)}
          </StoryTransitionLink>
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
      className={styles.root}
      ref={root}
      style={assignInlineVars({
        [essayAccent]: photoChapters[0].accent,
        [essayBackground]: photoChapters[0].background,
        [atmosphereAccent]: photoChapters[0].accent,
      })}
    >
      <PhotoAtmosphere />

      <nav className={styles.progress} aria-label={t("navigationLabel")}>
        {photoChapters.map((chapter) => (
          <a
            aria-label={t("goTo", {
              title: t(`chapters.${chapter.key}.title`),
            })}
            className={styles.progressLink}
            href={`#photo-title-${chapter.key}`}
            key={chapter.key}
          >
            <span
              className={styles.progressMark}
              data-photo-part="progress-mark"
            />
          </a>
        ))}
      </nav>

      <header className={styles.intro} data-animate="reveal">
        <p className={styles.introLabel}>{t("label")}</p>
        <h2 className={styles.introTitle} id="work-title">
          {t("title")}
        </h2>
        <p className={styles.introDescription}>{t("introduction")}</p>
        <span className={styles.introDirection}>{t("direction")}</span>
      </header>

      {photoChapters.map((chapter, chapterIndex) => (
        <Chapter
          chapter={chapter}
          chapterIndex={chapterIndex}
          key={chapter.key}
        />
      ))}
    </div>
  );
}
