"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  countries,
  highlights,
  inquiries,
  navItems,
  products,
  services,
  siteSections,
  siteSettings,
  stores,
  type Localized,
} from "@/db/schema";
import { getSession } from "@/lib/auth";
import { emptyLocalized, type Locale } from "@/lib/types";

async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/en");
  revalidatePath("/ar");
  revalidatePath("/ms");
  revalidatePath("/console");
}

function asLocalized(value: unknown): Localized {
  const record = (value || {}) as Partial<Localized>;
  return {
    en: String(record.en || ""),
    ar: String(record.ar || ""),
    ms: String(record.ms || ""),
  };
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 140);
}

export async function updateSettings(form: {
  logoUrl?: string | null;
  companyName: Localized;
  tagline: Localized;
  phone?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  address: Localized;
  mapsEmbedUrl?: string | null;
  mapsLink?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  seoTitle: Localized;
  seoDescription: Localized;
  ogImage?: string | null;
  searchConsoleCode?: string | null;
}) {
  await requireAdmin();
  const [current] = await db.select().from(siteSettings).limit(1);
  if (!current) throw new Error("Settings not found");
  await db
    .update(siteSettings)
    .set({
      logoUrl: form.logoUrl ?? null,
      companyName: asLocalized(form.companyName),
      tagline: asLocalized(form.tagline),
      phone: form.phone || null,
      email: form.email || null,
      whatsapp: form.whatsapp || null,
      address: asLocalized(form.address),
      mapsEmbedUrl: form.mapsEmbedUrl || null,
      mapsLink: form.mapsLink || null,
      facebook: form.facebook || null,
      instagram: form.instagram || null,
      twitter: form.twitter || null,
      linkedin: form.linkedin || null,
      youtube: form.youtube || null,
      tiktok: form.tiktok || null,
      seoTitle: asLocalized(form.seoTitle),
      seoDescription: asLocalized(form.seoDescription),
      ogImage: form.ogImage || null,
      searchConsoleCode: form.searchConsoleCode || null,
      updatedAt: new Date(),
    })
    .where(eq(siteSettings.id, current.id));
  revalidatePublic();
}

export async function updateSection(form: {
  id: number;
  title: Localized;
  subtitle: Localized;
  content: Localized;
  imageUrl?: string | null;
  ctaPrimary?: Localized | null;
  ctaSecondary?: Localized | null;
  visible: boolean;
  sortOrder: number;
}) {
  await requireAdmin();
  await db
    .update(siteSections)
    .set({
      title: asLocalized(form.title),
      subtitle: asLocalized(form.subtitle),
      content: asLocalized(form.content),
      imageUrl: form.imageUrl || null,
      ctaPrimary: form.ctaPrimary ? asLocalized(form.ctaPrimary) : emptyLocalized(),
      ctaSecondary: form.ctaSecondary ? asLocalized(form.ctaSecondary) : emptyLocalized(),
      visible: form.visible,
      sortOrder: Number(form.sortOrder) || 0,
    })
    .where(eq(siteSections.id, form.id));
  revalidatePublic();
}

export async function updateNavItem(form: {
  id: number;
  label: Localized;
  href: string;
  visible: boolean;
  sortOrder: number;
}) {
  await requireAdmin();
  await db
    .update(navItems)
    .set({
      label: asLocalized(form.label),
      href: form.href,
      visible: form.visible,
      sortOrder: Number(form.sortOrder) || 0,
    })
    .where(eq(navItems.id, form.id));
  revalidatePublic();
}

export async function saveService(form: {
  id?: number;
  title: Localized;
  description: Localized;
  imageUrl?: string | null;
  icon?: string | null;
  visible: boolean;
  sortOrder: number;
}) {
  await requireAdmin();
  const payload = {
    title: asLocalized(form.title),
    description: asLocalized(form.description),
    imageUrl: form.imageUrl || null,
    icon: form.icon || "spark",
    visible: form.visible,
    sortOrder: Number(form.sortOrder) || 0,
  };
  if (form.id) {
    await db.update(services).set(payload).where(eq(services.id, form.id));
  } else {
    await db.insert(services).values(payload);
  }
  revalidatePublic();
}

export async function deleteService(id: number) {
  await requireAdmin();
  await db.delete(services).where(eq(services.id, id));
  revalidatePublic();
}

export async function saveProduct(form: {
  id?: number;
  slug?: string;
  name: Localized;
  description: Localized;
  imageUrl?: string | null;
  category: string;
  originCountry: string;
  productStatus: string;
  visible: boolean;
  sortOrder: number;
}) {
  await requireAdmin();
  const slug = slugify(form.slug || form.name.en || `product-${Date.now()}`);
  const payload = {
    slug,
    name: asLocalized(form.name),
    description: asLocalized(form.description),
    imageUrl: form.imageUrl || null,
    category: form.category || "other",
    originCountry: form.originCountry || "Saudi Arabia",
    productStatus: form.productStatus || "both",
    visible: form.visible,
    sortOrder: Number(form.sortOrder) || 0,
  };
  if (form.id) {
    await db.update(products).set(payload).where(eq(products.id, form.id));
  } else {
    await db.insert(products).values(payload);
  }
  revalidatePublic();
}

export async function deleteProduct(id: number) {
  await requireAdmin();
  await db.delete(products).where(eq(products.id, id));
  revalidatePublic();
}

export async function saveStore(form: {
  id?: number;
  platform: string;
  label: Localized;
  url: string;
  enabled: boolean;
  sortOrder: number;
}) {
  await requireAdmin();
  const payload = {
    platform: form.platform,
    label: asLocalized(form.label),
    url: form.url.trim(),
    enabled: form.enabled && form.url.trim().length > 0,
    sortOrder: Number(form.sortOrder) || 0,
  };
  if (form.id) {
    await db.update(stores).set(payload).where(eq(stores.id, form.id));
  } else {
    await db.insert(stores).values(payload);
  }
  revalidatePublic();
}

export async function deleteStore(id: number) {
  await requireAdmin();
  await db.delete(stores).where(eq(stores.id, id));
  revalidatePublic();
}

export async function saveHighlight(form: {
  id?: number;
  title: Localized;
  description: Localized;
  icon?: string | null;
  visible: boolean;
  sortOrder: number;
}) {
  await requireAdmin();
  const payload = {
    title: asLocalized(form.title),
    description: asLocalized(form.description),
    icon: form.icon || "spark",
    visible: form.visible,
    sortOrder: Number(form.sortOrder) || 0,
  };
  if (form.id) {
    await db.update(highlights).set(payload).where(eq(highlights.id, form.id));
  } else {
    await db.insert(highlights).values(payload);
  }
  revalidatePublic();
}

export async function deleteHighlight(id: number) {
  await requireAdmin();
  await db.delete(highlights).where(eq(highlights.id, id));
  revalidatePublic();
}

export async function saveCountry(form: {
  id?: number;
  name: Localized;
  role: string;
  code: string;
  description: Localized;
  imageUrl?: string | null;
  visible: boolean;
  sortOrder: number;
}) {
  await requireAdmin();
  const payload = {
    name: asLocalized(form.name),
    role: form.role || "source",
    code: form.code.toUpperCase(),
    description: asLocalized(form.description),
    imageUrl: form.imageUrl || null,
    visible: form.visible,
    sortOrder: Number(form.sortOrder) || 0,
  };
  if (form.id) {
    await db.update(countries).set(payload).where(eq(countries.id, form.id));
  } else {
    await db.insert(countries).values(payload);
  }
  revalidatePublic();
}

export async function deleteCountry(id: number) {
  await requireAdmin();
  await db.delete(countries).where(eq(countries.id, id));
  revalidatePublic();
}

export async function submitInquiry(form: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale?: Locale;
}) {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    throw new Error("Missing required fields");
  }
  await db.insert(inquiries).values({
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone?.trim() || null,
    message: form.message.trim(),
    locale: form.locale || "en",
  });
  revalidatePath("/console/inquiries");
}

export async function deleteInquiry(id: number) {
  await requireAdmin();
  await db.delete(inquiries).where(eq(inquiries.id, id));
  revalidatePath("/console/inquiries");
}
