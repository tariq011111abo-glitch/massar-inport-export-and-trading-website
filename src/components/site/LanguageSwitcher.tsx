"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/types";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/en";
  const router = useRouter();

  function switchTo(next: Locale) {
    const parts = pathname.split("/");
    parts[1] = next;
    const href = parts.join("/") || `/${next}`;
    document.cookie = `massar_locale=${next}; path=/; max-age=31536000`;
    router.push(href);
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-gold/25 bg-forest-deep/40 p-1 text-[11px] uppercase tracking-[0.16em] text-gold-soft">
      {LOCALES.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => switchTo(item)}
          className={`rounded-full px-2.5 py-1 transition ${
            item === locale ? "bg-gold text-forest-deep" : "hover:text-cream"
          }`}
        >
          {item === "en" ? "EN" : item === "ar" ? "AR" : "BM"}
          <span className="sr-only">{LOCALE_LABELS[item]}</span>
        </button>
      ))}
    </div>
  );
}
