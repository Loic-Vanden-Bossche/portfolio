import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "en",
  locales: ["en", "fr"],
});

export type AppLocale = (typeof routing.locales)[number];
