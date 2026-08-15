import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { PhotoStoryExperience } from "@/components/photo-story-experience";
import {
  isPhotoCategorySlug,
  photoCategorySlugs,
} from "@/components/portfolio/photo-library";
import { routing } from "@/i18n/routing";

type PhotoStoryPageProps = {
  params: Promise<{ category: string; locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    photoCategorySlugs.map((category) => ({ category, locale })),
  );
}

export async function generateMetadata({
  params,
}: PhotoStoryPageProps): Promise<Metadata> {
  const { category, locale } = await params;
  if (!isPhotoCategorySlug(category)) return {};
  const t = await getTranslations({ locale, namespace: "PhotographyArchive" });

  return {
    description: t(`categories.${category}.metadataDescription`),
    title: t(`categories.${category}.metadataTitle`),
  };
}

export default async function PhotoStoryPage({ params }: PhotoStoryPageProps) {
  const { category } = await params;
  if (!isPhotoCategorySlug(category)) notFound();

  return <PhotoStoryExperience categorySlug={category} />;
}
