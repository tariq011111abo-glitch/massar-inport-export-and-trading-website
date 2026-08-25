// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
// import { t } from "@/lib/i18n";
// import type { Locale, NavItem, SiteSettings } from "@/lib/types";

// export function Header({
//   locale,
//   settings,
//   navItems,
// }: {
//   locale: Locale;
//   settings: SiteSettings;
//   navItems: NavItem[];
// }) {
//   const [open, setOpen] = useState(false);
//   const name = t(settings.companyName, locale);

//   return (
//     <header className="absolute inset-x-0 top-0 z-40">
//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
//         <Link href={`/${locale}`} className="flex items-center gap-3 text-cream">
//           {settings.logoUrl ? (
//             <img
//               src={settings.logoUrl}
//               alt={name}
//               className="h-12 w-12 rounded-full border border-gold/40 object-cover"
//             />
//           ) : (
//             <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-gold">
//               M
//             </span>
//           )}
//           <span className="leading-tight">
//             <span className="display block text-xl text-cream md:text-2xl">Massar</span>
//             <span className="hidden text-[10px] uppercase tracking-[0.22em] text-gold-soft sm:block">
//               Import · Export · Trading
//             </span>
//           </span>
//         </Link>

//         <nav className="hidden items-center gap-3 lg:flex">
//           {navItems.map((item) => (
//             <a
//               key={item.id}
//               href={`/${locale}${item.href.startsWith("#") ? item.href : item.href}`}
//               className="rounded-full border border-cream/40 bg-cream/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream backdrop-blur transition hover:border-gold hover:bg-gold/20 hover:text-gold"
//             >
//               {t(item.label, locale)}
//             </a>
//           ))}
//         </nav>

//         <div className="flex items-center gap-3">
//           <LanguageSwitcher locale={locale} />
//           <button
//             type="button"
//             className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-cream lg:hidden"
//             onClick={() => setOpen((value) => !value)}
//             aria-label="Menu"
//           >
//             <span className="block h-px w-4 bg-current" />
//             <span className="mt-1.5 block h-px w-4 bg-current" />
//           </button>
//         </div>
//       </div>

//       {open ? (
//         <div className="mx-5 rounded-3xl border border-gold/20 bg-forest-deep/95 p-5 backdrop-blur lg:hidden">
//           <div className="flex flex-col gap-3">
//             {navItems.map((item) => (
//               <a
//                 key={item.id}
//                 href={`/${locale}${item.href.startsWith("#") ? item.href : item.href}`}
//                 onClick={() => setOpen(false)}
//                 className="border-b border-white/5 py-2 text-sm text-cream"
//               >
//                 {t(item.label, locale)}
//               </a>
//             ))}
//           </div>
//         </div>
//       ) : null}
//     </header>
//   );
// }
"use client";

import { useState } from "react";
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
  const name = t(settings.companyName, locale);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-3 text-cream">
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
            <span className="display block text-xl text-cream md:text-2xl">Massar</span>
            <span className="hidden text-[10px] uppercase tracking-[0.22em] text-gold-soft sm:block">
              Import · Export · Trading
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-3 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`/${locale}${item.href.startsWith("#") ? item.href : item.href}`}
              className="rounded-full border border-cream/40 bg-cream/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream backdrop-blur transition hover:border-gold hover:bg-gold/20 hover:text-gold"
            >
              {t(item.label, locale)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
        <div className="mx-5 rounded-3xl border border-gold/20 bg-forest-deep/95 p-5 backdrop-blur lg:hidden">
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