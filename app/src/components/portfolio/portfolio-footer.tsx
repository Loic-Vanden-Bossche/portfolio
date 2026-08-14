import { useTranslations } from "next-intl";

import * as styles from "./portfolio-footer.css";

export function PortfolioFooter() {
  const t = useTranslations("Portfolio.footer");

  return (
    <footer className={styles.root}>
      <p className={styles.paragraph}>
        {t("copyright", { year: new Date().getFullYear() })}
      </p>
      <p className={styles.paragraph}>{t("location")}</p>
      <a href="#top">
        {t("backToTop")} <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
