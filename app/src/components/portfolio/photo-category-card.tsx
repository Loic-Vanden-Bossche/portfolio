import { assignInlineVars } from "@vanilla-extract/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { StoryTransitionLink } from "@/components/motion/story-transition-link";

import * as styles from "./photo-category-card.css";
import { PhotoCategoryIcon } from "./photo-category-icon";
import { getPhotoCategoryHero, type PhotoCategory } from "./photo-library";
import {
  storyImageFilter,
  storyImagePosition,
  storyImageScale,
} from "./photo-presentation-vars.css";

type PhotoCategoryCardProps = {
  category: PhotoCategory;
  compact?: boolean;
  beforeNavigate?: () => void;
};

export function PhotoCategoryCard({
  beforeNavigate,
  category,
  compact = false,
}: PhotoCategoryCardProps) {
  const t = useTranslations("PhotographyArchive");
  const hero = getPhotoCategoryHero(category);

  return (
    <StoryTransitionLink
      beforeNavigate={beforeNavigate}
      category={category.slug}
      className={`${styles.root} ${compact ? styles.compact : ""}`}
      data-category-card=""
      href={`/photography/${category.slug}`}
      style={assignInlineVars({
        [styles.categoryAccent]: category.accent,
        [storyImageFilter]: category.presentation.filter,
        [storyImagePosition]: category.presentation.position,
        [storyImageScale]: category.presentation.scale,
      })}
    >
      <Image
        alt=""
        className={styles.image}
        fill
        quality={72}
        sizes={
          compact
            ? "(max-width: 700px) 90vw, 28vw"
            : "(max-width: 700px) 90vw, 30vw"
        }
        src={`/img/sections/${hero.file}`}
      />
      <span className={styles.veil} aria-hidden="true" />
      <span className={styles.header}>
        <span className={styles.icon} data-category-icon="">
          <PhotoCategoryIcon icon={category.icon} size={20} />
        </span>
        <span className={styles.number}>
          {String(photoCategoryNumber(category.slug)).padStart(2, "0")}
        </span>
      </span>
      <span className={styles.copy}>
        <span className={styles.title}>
          {t(`categories.${category.slug}.title`)}
        </span>
        {!compact ? (
          <span className={styles.description}>
            {t(`categories.${category.slug}.short`)}
          </span>
        ) : null}
      </span>
    </StoryTransitionLink>
  );
}

function photoCategoryNumber(slug: PhotoCategory["slug"]) {
  const order: readonly PhotoCategory["slug"][] = [
    "animals",
    "birds",
    "architecture",
    "street",
    "landscape",
    "portraits",
    "nature-macro",
    "abstract-details",
    "culture-events",
    "still-life",
  ];

  return order.indexOf(slug) + 1;
}
