import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import englishMessages from "../../messages/en.json";
import frenchMessages from "../../messages/fr.json";
import { routing } from "./routing";

const messages = {
  en: englishMessages,
  fr: frenchMessages,
} as const;

export default getRequestConfig(async ({ locale }) => {
  const requestedLocale = locale ?? (await rootParams.locale());

  if (!hasLocale(routing.locales, requestedLocale)) {
    notFound();
  }

  return {
    locale: requestedLocale,
    // Static imports let Next.js track catalog edits during development HMR.
    messages: messages[requestedLocale],
  };
});
