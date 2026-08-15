import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { Link } from "@/i18n/navigation";

import type { PhotoCategorySlug } from "./photo-library";
import * as styles from "./photo-story-header.css";
import { StoriesDialog } from "./stories-dialog";

type PhotoStoryHeaderProps = { category: PhotoCategorySlug };

export function PhotoStoryHeader({ category }: PhotoStoryHeaderProps) {
  const t = useTranslations("PhotographyArchive");

  return (
    <header className={styles.root}>
      <div className={styles.identity}>
        <Link
          className={styles.brand}
          href="/"
          aria-label={t("navigation.home")}
        >
          LP<span aria-hidden="true">.</span>
        </Link>
        <span className={styles.divider} aria-hidden="true" />
        <span className={styles.story}>
          {t(`categories.${category}.title`)}
        </span>
      </div>
      <nav
        className={styles.actions}
        aria-label={t("navigation.storyNavigation")}
      >
        <StoriesDialog />
        <Link className={styles.development} href="/?mode=development">
          {t("navigation.development")}
        </Link>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
