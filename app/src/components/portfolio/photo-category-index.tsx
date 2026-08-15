import { useTranslations } from "next-intl";

import { PhotoCategoryCard } from "./photo-category-card";
import * as styles from "./photo-category-index.css";
import { photoCategories } from "./photo-library";

export function PhotoCategoryIndex() {
  const t = useTranslations("PhotographyArchive.index");

  return (
    <section className={styles.root} aria-labelledby="stories-index-title">
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2 className={styles.title} id="stories-index-title">
            {t("title")}
          </h2>
        </div>
        <p className={styles.introduction}>{t("introduction")}</p>
      </header>
      <div className={styles.grid}>
        {photoCategories.map((category) => (
          <PhotoCategoryCard category={category} key={category.slug} />
        ))}
      </div>
    </section>
  );
}
