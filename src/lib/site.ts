import { asc } from "drizzle-orm";
import { db } from "@/db";
import {
  countries,
  highlights,
  navItems,
  products,
  services,
  siteSections,
  siteSettings,
  stores,
} from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import type { SiteData } from "@/lib/types";

export async function getSiteData(): Promise<SiteData> {
  await ensureSeeded();

  const [settings] = await db.select().from(siteSettings).limit(1);
  if (!settings) {
    throw new Error("Site settings are missing");
  }

  const [sectionRows, navRows, serviceRows, productRows, storeRows, highlightRows, countryRows] =
    await Promise.all([
      db.select().from(siteSections).orderBy(asc(siteSections.sortOrder)),
      db.select().from(navItems).orderBy(asc(navItems.sortOrder)),
      db.select().from(services).orderBy(asc(services.sortOrder)),
      db.select().from(products).orderBy(asc(products.sortOrder)),
      db.select().from(stores).orderBy(asc(stores.sortOrder)),
      db.select().from(highlights).orderBy(asc(highlights.sortOrder)),
      db.select().from(countries).orderBy(asc(countries.sortOrder)),
    ]);

  return {
    settings,
    sections: sectionRows,
    navItems: navRows,
    services: serviceRows,
    products: productRows,
    stores: storeRows,
    highlights: highlightRows,
    countries: countryRows,
  };
}

export function sectionByKey(data: SiteData, key: string) {
  return data.sections.find((section) => section.key === key) || null;
}

export function publicStores(data: SiteData) {
  return data.stores.filter((store) => store.enabled && store.url.trim().length > 0);
}

export function publicNav(data: SiteData) {
  return data.navItems.filter((item) => {
    if (!item.visible) return false;
    if (item.key === "stores" && publicStores(data).length === 0) return false;
    return true;
  });
}
