import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeView } from "@/components/site/HomeView";
import { t } from "@/lib/i18n";
import { getSiteData } from "@/lib/site";
import { isLocale } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const data = await getSiteData();
  return {
    title: t(data.settings.seoTitle, locale),
    description: t(data.settings.seoDescription, locale),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "ms-MY": "/ms",
      },
    },
    openGraph: {
      title: t(data.settings.seoTitle, locale),
      description: t(data.settings.seoDescription, locale),
      images: [data.settings.ogImage || "/images/hero.jpg"],
      locale,
    },
    other: data.settings.searchConsoleCode
      ? { "google-site-verification": data.settings.searchConsoleCode }
      : undefined,
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const data = await getSiteData();
  return <HomeView data={data} locale={locale} />;
}
