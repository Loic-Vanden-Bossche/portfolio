import { useTranslations } from "next-intl";

export function PortfolioFooter() {
  const t = useTranslations("Portfolio.footer");

  return (
    <footer>
      <p>{t("copyright", { year: new Date().getFullYear() })}</p>
      <p>{t("location")}</p>
      <a href="#top">
        {t("backToTop")} <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
