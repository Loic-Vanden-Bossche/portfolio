import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

import * as styles from "./locale-switcher.css";

const locales = ["en", "fr"] as const satisfies readonly AppLocale[];

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Portfolio.navigation");
  const [isPending, startTransition] = useTransition();

  function changeLocale(nextLocale: AppLocale) {
    if (nextLocale === locale) return;

    startTransition(() => {
      router.replace(
        `${pathname}${window.location.search}${window.location.hash}`,
        {
          locale: nextLocale,
        },
      );
    });
  }

  return (
    <div className={styles.root} aria-label={t("languageLabel")} role="group">
      {locales.map((item) => (
        <button
          aria-label={t(item === "en" ? "english" : "french")}
          aria-pressed={locale === item}
          className={`${styles.option} ${locale === item ? styles.active : ""}`}
          disabled={isPending}
          key={item}
          onClick={() => changeLocale(item)}
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
