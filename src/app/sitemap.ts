import type { MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { LOCALES } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // وضع رابط موقعك الفعلي مباشرة هنا لضمان خروج الروابط بشكل صحيح دائماً
  const base = "https://massartrading.com"; 
  
  await ensureSeeded();
  const rows = await db.select().from(products).where(eq(products.visible, true));

  const entries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages: {
        en: `${base}/en`,
        ar: `${base}/ar`,
        ms: `${base}/ms`,
      },
    },
  }));

  for (const product of rows) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${base}/${locale}/products/${product.slug}`,
        lastModified: product.createdAt ? new Date(product.createdAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
