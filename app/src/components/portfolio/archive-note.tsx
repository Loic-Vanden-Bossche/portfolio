import { useTranslations } from "next-intl";

import * as styles from "./archive-note.css";

export function ArchiveNote() {
  const t = useTranslations("Portfolio.archive");

  return (
    <section className={styles.root} data-animate="reveal">
      <p className={styles.label}>{t("label")}</p>
      <p className={styles.copy}>{t("copy")}</p>
    </section>
  );
}
