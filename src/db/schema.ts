import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export type Locale = "en" | "ar" | "ms";

export type Localized = {
  en: string;
  ar: string;
  ms: string;
};

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  logoUrl: text("logo_url"),
  companyName: jsonb("company_name").$type<Localized>().notNull(),
  tagline: jsonb("tagline").$type<Localized>().notNull(),
  phone: text("phone"),
  email: text("email"),
  whatsapp: text("whatsapp"),
  address: jsonb("address").$type<Localized>().notNull(),
  mapsEmbedUrl: text("maps_embed_url"),
  mapsLink: text("maps_link"),
  facebook: text("facebook"),
  instagram: text("instagram"),
  twitter: text("twitter"),
  linkedin: text("linkedin"),
  youtube: text("youtube"),
  tiktok: text("tiktok"),
  seoTitle: jsonb("seo_title").$type<Localized>().notNull(),
  seoDescription: jsonb("seo_description").$type<Localized>().notNull(),
  ogImage: text("og_image"),
  searchConsoleCode: text("search_console_code"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const siteSections = pgTable("site_sections", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 50 }).notNull().unique(),
  title: jsonb("title").$type<Localized>().notNull(),
  subtitle: jsonb("subtitle").$type<Localized>().notNull(),
  content: jsonb("content").$type<Localized>().notNull(),
  imageUrl: text("image_url"),
  ctaPrimary: jsonb("cta_primary").$type<Localized>(),
  ctaSecondary: jsonb("cta_secondary").$type<Localized>(),
  visible: boolean("visible").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const navItems = pgTable("nav_items", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 50 }).notNull().unique(),
  label: jsonb("label").$type<Localized>().notNull(),
  href: text("href").notNull(),
  visible: boolean("visible").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: jsonb("title").$type<Localized>().notNull(),
  description: jsonb("description").$type<Localized>().notNull(),
  imageUrl: text("image_url"),
  icon: text("icon"),
  visible: boolean("visible").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: jsonb("name").$type<Localized>().notNull(),
  description: jsonb("description").$type<Localized>().notNull(),
  imageUrl: text("image_url"),
  category: varchar("category", { length: 50 }).notNull(),
  originCountry: varchar("origin_country", { length: 80 }).notNull(),
  productStatus: varchar("product_status", { length: 40 }).notNull(),
  visible: boolean("visible").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 40 }).notNull(),
  label: jsonb("label").$type<Localized>().notNull(),
  url: text("url").notNull().default(""),
  enabled: boolean("enabled").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const highlights = pgTable("highlights", {
  id: serial("id").primaryKey(),
  title: jsonb("title").$type<Localized>().notNull(),
  description: jsonb("description").$type<Localized>().notNull(),
  icon: text("icon"),
  visible: boolean("visible").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: jsonb("name").$type<Localized>().notNull(),
  role: varchar("role", { length: 30 }).notNull(),
  code: varchar("code", { length: 8 }).notNull(),
  description: jsonb("description").$type<Localized>().notNull(),
  imageUrl: text("image_url"),
  visible: boolean("visible").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  locale: varchar("locale", { length: 8 }).default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  data: text("data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
