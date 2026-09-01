"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/types";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/en";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function switchTo(next: Locale) {
    const parts = pathname.split("/");
    parts[1] = next;
    const href = parts.join("/") || `/${next}`;
    document.cookie = `massar_locale=${next}; path=/; max-age=31536000`;
    router.push(href);
    setIsOpen(false);
  }

  // أسماء اللغات الكاملة مع إضافة إيموجي العلم الخاص بكل لغة لمظهر احترافي
  const languageNames: Record<Locale, string> = {
    en: "🇬🇧 English",
    ar: "🇸🇦 العربية",
    ms: "🇲🇾 Bahasa Melayu"
  };

  const buttonLabel: Record<Locale, string> = {
    en: "Language",
    ar: "اللغة",
    ms: "Bahasa"
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* تصميم فريد باللون الأزرق الفيروزي النيون المميز المنفصل تماماً عن بقية الأزرار */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-400 transition-all duration-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
      >
        <span className="flex items-center gap-1.5">
          {/* عرض إيموجي اللغة الحالية بجانب النص المكتوب */}
          <span className="text-sm leading-none">
            {locale === "en" ? "🇬🇧" : locale === "ar" ? "🇸🇦" : "🇲🇾"}
          </span>
          {buttonLabel[locale]}
        </span>
        <svg
          className={`w-3 h-3 opacity-80 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* قائمة منسدلة أنيقة متناسقة باللون الأزرق الفيروزي والإيموجي */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-48 rounded-2xl border border-cyan-500/30 bg-neutral-955/95 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl z-50">
          <div className="flex flex-col gap-1">
            {LOCALES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => switchTo(item)}
                className={`w-full text-left rounded-xl px-4 py-2.5 text-xs font-medium transition duration-150 ${
                  item === locale
                    ? "bg-cyan-500 text-neutral-950 font-bold"
                    : "text-cream/80 hover:bg-cyan-500/10 hover:text-cyan-400"
                }`}
                style={{ direction: item === 'ar' ? 'rtl' : 'ltr' }}
              >
                {languageNames[item]}
                <span className="sr-only">{LOCALE_LABELS[item]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
