"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { t } from "@/lib/i18n";
import type { Locale, NavItem, SiteSettings } from "@/lib/types";

export function Header({
  locale,
  settings,
  navItems,
}: {
  locale: Locale;
  settings: SiteSettings;
  navItems: NavItem[];
}) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const name = t(settings.companyName, locale);

  // دالة لمراقبة نزول المستخدم وتغيير حالة الخلفية فوراً
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // التعديل الذكي هنا: إذا نزل المستخدم لأسفل (isScrolled) تصبح الخلفية داكنة ومحمية بالتأثير الزجاجي، وإذا كان بالأعلى تظل مدمجة وخفيفة
    <header 
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        isScrolled 
          ? "bg-neutral-950/90 backdrop-blur-xl border-white/[0.08] py-3 shadow-lg" 
          : "bg-black/10 backdrop-blur-sm border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-3 text-cream shrink-0">
          {settings.logoUrl ? (
            <img
              src={settings.logoUrl}
              alt={name}
              className="h-12 w-12 rounded-full border border-gold/40 object-cover"
            />
          ) : (
            <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-gold">
              M
            </span>
          )}
          <span className="leading-tight">
            <span className="display block text-xl text-cream md:text-2xl font-medium tracking-wide">Massar</span>
            <span className="hidden text-[9px] uppercase tracking-[0.22em] text-gold-soft sm:block mt-0.5">
              Import · Export · Trading
            </span>
          </span>
        </Link>

        {/* تم تحسين الأزرار لتبديل تباينها تلقائياً عند نزول الشاشة */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`/${locale}${item.href.startsWith("#") ? item.href : item.href}`}
              className={`rounded-full border px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] transition duration-200 ${
                isScrolled 
                  ? "border-white/10 bg-white/[0.02] text-cream hover:border-gold/60 hover:bg-gold/10 hover:text-gold"
                  : "border-cream/20 bg-black/20 text-cream hover:border-gold hover:bg-gold/20 hover:text-gold"
              }`}
            >
              {t(item.label, locale)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-cream lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
          >
            <span className="block h-px w-4 bg-current" />
            <span className="mt-1.5 block h-px w-4 bg-current" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-5 mb-5 rounded-3xl border border-gold/20 bg-forest-deep/95 p-5 backdrop-blur lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/${locale}${item.href.startsWith("#") ? item.href : item.href}`}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-2 text-sm text-cream"
              >
                {t(item.label, locale)}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
