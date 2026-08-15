"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef } from "react";

import { StoryTransitionLink } from "@/components/motion/story-transition-link";
import { useStoryTransition } from "@/components/motion/story-transition-provider";
import { PhotoAtmosphere } from "@/components/portfolio/photo-atmosphere";
import { PhotoCategoryIcon } from "@/components/portfolio/photo-category-icon";
import {
  getPhotoAsset,
  getPhotoCategory,
  getPhotoCategoryHero,
  photoCategories,
  type PhotoCategorySlug,
} from "@/components/portfolio/photo-library";
import {
  storyHeroWash,
  storyImageFilter,
  storyImagePosition,
  storyImageScale,
} from "@/components/portfolio/photo-presentation-vars.css";
import * as styles from "@/components/portfolio/photo-story.css";
import { PhotoStoryHeader } from "@/components/portfolio/photo-story-header";
import {
  atmosphereAccent,
  essayBackground,
} from "@/components/portfolio/photo-style-vars.css";
import { usePhotoViewer } from "@/components/portfolio/photo-viewer-provider";
import { PortfolioFooter } from "@/components/portfolio/portfolio-footer";
import { ReturnToTop } from "@/components/ui/return-to-top";
import { usePhotoStoryMotion } from "@/hooks/use-photo-story-motion";
import { accent } from "@/styles/runtime.css";

type PhotoStoryExperienceProps = { categorySlug: PhotoCategorySlug };

export function PhotoStoryExperience({
  categorySlug,
}: PhotoStoryExperienceProps) {
  const root = useRef<HTMLDivElement>(null);
  const heroTexture = useRef<HTMLButtonElement>(null);
  const heroImage = useRef<HTMLImageElement>(null);
  const t = useTranslations("PhotographyArchive");
  const category = getPhotoCategory(categorySlug);
  const heroAsset = getPhotoCategoryHero(category);
  const chapterPhotoIds = category.photoIds.slice(1);
  const categoryIndex = photoCategories.findIndex(
    (item) => item.slug === categorySlug,
  );
  const previous =
    photoCategories.at(categoryIndex - 1) ?? photoCategories.at(-1)!;
  const next = photoCategories.at(
    (categoryIndex + 1) % photoCategories.length,
  )!;
  const { activeCategory, phase, registerDestinationReady } =
    useStoryTransition();
  const { openPhoto } = usePhotoViewer();
  const isTransitionEntry = activeCategory === categorySlug;

  usePhotoStoryMotion(root, category.motion, {
    isTransitionEntry,
    transitionPhase: phase,
  });

  const markHeroReady = useCallback(() => {
    const texture = heroTexture.current;
    if (!isTransitionEntry || !texture) return;
    registerDestinationReady(categorySlug, texture);
  }, [categorySlug, isTransitionEntry, registerDestinationReady]);

  useEffect(() => {
    const image = heroImage.current;
    if (!image?.complete) return;
    let cancelled = false;
    void image
      .decode()
      .catch(() => undefined)
      .then(() => {
        if (!cancelled) markHeroReady();
      });
    return () => {
      cancelled = true;
    };
  }, [markHeroReady]);

  const heroTitle = t(`categories.${categorySlug}.title`);
  const heroWords = heroTitle.split(" ");

  return (
    <div
      className={styles.root}
      data-story-motion={category.motion}
      id="top"
      ref={root}
      style={assignInlineVars({
        [atmosphereAccent]: category.accent,
        [essayBackground]: category.background,
        [accent]: category.accent,
        [storyHeroWash]: category.presentation.wash,
        [storyImageFilter]: category.presentation.filter,
        [storyImagePosition]: category.presentation.position,
        [storyImageScale]: category.presentation.scale,
      })}
    >
      <PhotoAtmosphere />
      <PhotoStoryHeader category={categorySlug} />
      <ReturnToTop />

      <div className={styles.content}>
        <main>
          <header className={styles.hero}>
            <button
              aria-label={t("viewer.open", {
                title: t(`images.${heroAsset.id}.title`),
              })}
              className={styles.heroTexture}
              data-cursor="view"
              data-story-hero-texture=""
              onClick={(event) =>
                openPhoto({
                  asset: heroAsset,
                  sourceElement: event.currentTarget,
                })
              }
              ref={heroTexture}
              type="button"
            >
              <Image
                alt={t(`images.${heroAsset.id}.alt`)}
                className={styles.heroImage}
                fill
                loading="eager"
                onLoad={(event) => {
                  void event.currentTarget
                    .decode()
                    .catch(() => undefined)
                    .then(markHeroReady);
                }}
                priority
                quality={72}
                ref={heroImage}
                sizes="100vw"
                src={`/img/sections/${heroAsset.file}`}
              />
            </button>
            <div className={styles.heroIdentity}>
              <span className={styles.heroIcon} data-story-hero-icon="">
                <PhotoCategoryIcon icon={category.icon} size={28} />
              </span>
              <span className={styles.heroIndex} data-story-hero-index="">
                {t("storyLabel", {
                  current: String(categoryIndex + 1).padStart(2, "0"),
                  total: String(photoCategories.length).padStart(2, "0"),
                })}
              </span>
              <h1 className={styles.heroTitle}>
                {heroWords.map((word, index) => (
                  <span
                    className={styles.heroWordClip}
                    key={`${word}-${index}`}
                  >
                    <span className={styles.heroWord} data-story-hero-word="">
                      {word}
                    </span>
                  </span>
                ))}
              </h1>
            </div>
            <div className={styles.heroCopy} data-story-hero-intro="">
              <p className={styles.heroIntro}>
                {t(`categories.${categorySlug}.introduction`)}
              </p>
              <span className={styles.heroPhotoNumber}>
                01 / {t(`categories.${categorySlug}.title`)}
              </span>
              <h2 className={styles.heroPhotoTitle}>
                {t(`images.${heroAsset.id}.title`)}
              </h2>
              <p className={styles.heroNarrative}>
                {t(`images.${heroAsset.id}.narrative`)}
              </p>
              {heroAsset.placeholder ? (
                <span className={styles.placeholder}>
                  {t("placeholderDisclosure")}
                </span>
              ) : null}
              {heroAsset.credit ? (
                <p className={styles.credit}>
                  {heroAsset.credit.title} — {heroAsset.credit.creator}.{" "}
                  {heroAsset.credit.license}.{" "}
                  <a
                    className={styles.creditLink}
                    href={heroAsset.credit.sourceUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t("source")}
                  </a>
                </p>
              ) : null}
            </div>
          </header>

          {chapterPhotoIds.length ? (
            <div className={styles.story}>
              {chapterPhotoIds.map((photoId, index) => {
                const asset = getPhotoAsset(photoId)!;
                return (
                  <article
                    className={styles.chapter}
                    data-story-accent={asset.accent}
                    data-story-background={asset.background}
                    data-story-chapter=""
                    key={asset.id}
                  >
                    <button
                      aria-label={t("viewer.open", {
                        title: t(`images.${asset.id}.title`),
                      })}
                      className={styles.frame}
                      data-cursor="view"
                      data-story-frame=""
                      onClick={(event) =>
                        openPhoto({
                          asset,
                          sourceElement: event.currentTarget,
                        })
                      }
                      type="button"
                    >
                      <Image
                        alt={t(`images.${asset.id}.alt`)}
                        className={styles.image}
                        data-story-image=""
                        fill
                        quality={72}
                        sizes="(max-width: 720px) 92vw, 64vw"
                        src={`/img/sections/${asset.file}`}
                      />
                    </button>
                    <div className={styles.copy} data-story-copy="">
                      <span className={styles.chapterNumber}>
                        {String(index + 2).padStart(2, "0")} /{" "}
                        {t(`categories.${categorySlug}.title`)}
                      </span>
                      <h2 className={styles.chapterTitle}>
                        {t(`images.${asset.id}.title`)}
                      </h2>
                      <p className={styles.narrative}>
                        {t(`images.${asset.id}.narrative`)}
                      </p>
                      {asset.placeholder ? (
                        <span className={styles.placeholder}>
                          {t("placeholderDisclosure")}
                        </span>
                      ) : null}
                      {asset.credit ? (
                        <p className={styles.credit}>
                          {asset.credit.title} — {asset.credit.creator}.{" "}
                          {asset.credit.license}.{" "}
                          <a
                            className={styles.creditLink}
                            href={asset.credit.sourceUrl}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {t("source")}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}

          <nav
            className={styles.pagination}
            aria-label={t("navigation.adjacentStories")}
          >
            <StoryLink category={previous} direction="previous" />
            <StoryLink category={next} direction="next" />
          </nav>
        </main>
        <PortfolioFooter />
      </div>
    </div>
  );
}

function StoryLink({
  category,
  direction,
}: {
  category: (typeof photoCategories)[number];
  direction: "next" | "previous";
}) {
  const t = useTranslations("PhotographyArchive");

  return (
    <StoryTransitionLink
      category={category.slug}
      className={styles.paginationLink}
      href={`/photography/${category.slug}`}
    >
      <span className={styles.paginationDirection}>
        {direction === "previous" ? "← " : ""}
        {t(`navigation.${direction}`)}
        {direction === "next" ? " →" : ""}
      </span>
      <span className={styles.paginationTitle}>
        <PhotoCategoryIcon icon={category.icon} size={24} />
        {t(`categories.${category.slug}.title`)}
      </span>
    </StoryTransitionLink>
  );
}
