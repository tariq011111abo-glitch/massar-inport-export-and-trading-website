import type { Locale, Localized } from "@/db/schema";
import type {
  countries,
  highlights,
  inquiries,
  navItems,
  products,
  services,
  siteSections,
  siteSettings,
  stores,
} from "@/db/schema";

export type { Locale, Localized };

export type SiteSettings = typeof siteSettings.$inferSelect;
export type SiteSection = typeof siteSections.$inferSelect;
export type NavItem = typeof navItems.$inferSelect;
export type ServiceItem = typeof services.$inferSelect;
export type ProductItem = typeof products.$inferSelect & { weights?: string | null };
export type StoreItem = typeof stores.$inferSelect;
export type HighlightItem = typeof highlights.$inferSelect;
export type CountryItem = typeof countries.$inferSelect;
export type InquiryItem = typeof inquiries.$inferSelect;

export type SiteData = {
  settings: SiteSettings;
  sections: SiteSection[];
  navItems: NavItem[];
  services: ServiceItem[];
  products: ProductItem[];
  stores: StoreItem[];
  highlights: HighlightItem[];
  countries: CountryItem[];
};

export const LOCALES: Locale[] = ["en", "ar", "ms"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ms: "Bahasa Melayu",
};

export function emptyLocalized(): Localized {
  return { en: "", ar: "", ms: "" };
}

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
