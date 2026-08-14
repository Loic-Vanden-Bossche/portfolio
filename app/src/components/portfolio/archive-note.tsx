import { useTranslations } from "next-intl";

export function ArchiveNote() {
  const t = useTranslations("Portfolio.archive");

  return (
    <section className="archive-note reveal">
      <p className="section-label">{t("label")}</p>
      <p>{t("copy")}</p>
    </section>
  );
}
