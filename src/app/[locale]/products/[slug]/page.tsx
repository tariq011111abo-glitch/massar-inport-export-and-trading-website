import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { StoreBadges } from "@/components/site/StoreBadges";
import { db } from "@/db";
import { products } from "@/db/schema";
import { labelForCategory, labelForOrigin, labelForStatus, t, ui } from "@/lib/i18n";
import { getSiteData, publicNav, publicStores } from "@/lib/site";
import { isLocale } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!product) return {};
  return {
    title: t(product.name, locale),
    description: t(product.description, locale),
    openGraph: {
      images: [product.imageUrl || "/images/hero.jpg"],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const data = await getSiteData();
  const product = data.products.find((item) => item.slug === slug && item.visible);
  if (!product) notFound();
  const nav = publicNav(data);
  const stores = publicStores(data);

  return (
    <div className="bg-cream">
      <div className="relative bg-forest-deep pb-8">
        <Header locale={locale} settings={data.settings} navItems={nav} />
        <div className="h-28" />
      </div>
      <article className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <img
          src={product.imageUrl || "/images/product-ajwa.jpg"}
          alt={t(product.name, locale)}
          className="h-[520px] w-full rounded-[2rem] object-cover"
        />
        <div>
          <Link href={`/${locale}#products`} className="text-xs uppercase tracking-[0.2em] text-date">
            {ui.backHome[locale]}
          </Link>
          <h1 className="display mt-4 text-5xl text-forest">{t(product.name, locale)}</h1>
          <p className="mt-6 text-base leading-8 text-muted">{t(product.description, locale)}</p>
          <dl className="mt-8 grid gap-4 text-sm">
            <div>
              <dt className="uppercase tracking-[0.16em] text-muted">{ui.origin[locale]}</dt>
              <dd className="mt-1 text-lg text-forest">{labelForOrigin(product.originCountry, locale)}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-muted">{ui.category[locale]}</dt>
              <dd className="mt-1 text-lg text-forest">{labelForCategory(product.category, locale)}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-muted">{ui.availability[locale]}</dt>
              <dd className="mt-1 text-lg text-forest">{labelForStatus(product.productStatus, locale)}</dd>
            </div>
          </dl>
          <a
            href={`/${locale}#contact`}
            className="mt-8 inline-flex rounded-full bg-forest px-6 py-3 text-sm uppercase tracking-[0.16em] text-cream"
          >
            {ui.productInquiry[locale]}
          </a>
          {stores.length > 0 ? (
            <div className="mt-10">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-date">{ui.shopNow[locale]}</p>
              <StoreBadges stores={stores} locale={locale} />
            </div>
          ) : null}
        </div>
      </article>
      <Footer locale={locale} settings={data.settings} navItems={nav} stores={stores} />
    </div>
  );
}
