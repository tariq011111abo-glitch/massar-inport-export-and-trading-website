import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Script from "next/script";
import { isLocale } from "@/lib/types";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }, { locale: "ms" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-WMECMKNP4N"

        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WMECMKNP4N');
        `}
      </Script>
      {children}
    </>
  );
}
