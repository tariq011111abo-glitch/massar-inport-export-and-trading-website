import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { Cormorant_Garamond, Manrope, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { isLocale } from "@/lib/types";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Massar for Import Export and Trading",
    template: "%s | Massar",
  },
  description:
    "Massar imports and trades premium dates and oils from Saudi Arabia and Palestine into Malaysia.",
  openGraph: {
    type: "website",
    siteName: "Massar",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const store = await cookies();
  const localeCookie = store.get("massar_locale")?.value || "en";
  const locale = isLocale(localeCookie) ? localeCookie : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${display.variable} ${sans.variable} ${arabic.variable}`}>
      <body className="bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
