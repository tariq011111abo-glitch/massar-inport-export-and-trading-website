import Link from "next/link";
import { t, ui } from "@/lib/i18n";
import type { Locale, NavItem, SiteSettings, StoreItem } from "@/lib/types";

export function Footer({
  locale,
  settings,
  navItems,
  stores,
}: {
  locale: Locale;
  settings: SiteSettings;
  navItems: NavItem[];
  stores: StoreItem[];
}) {
  const socials = [
    { href: settings.facebook, label: "Facebook" },
    { href: settings.instagram, label: "Instagram" },
    { href: settings.twitter, label: "X" },
    { href: settings.linkedin, label: "LinkedIn" },
    { href: settings.youtube, label: "YouTube" },
    { href: settings.tiktok, label: "TikTok" },
  ].filter((item) => item.href);

  return (
    <footer className="bg-forest-deep text-cream">
      <div className="gold-rule" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="" className="h-12 w-12 rounded-full object-cover" />
            ) : null}
            <div>
              <p className="display text-3xl">Massar</p>
              <p className="text-xs uppercase tracking-[0.22em] text-gold">{ui.basedIn[locale]}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-cream/70">{t(settings.tagline, locale)}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Menu</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/80">
            {navItems.map((item) => (
              <a key={item.id} href={`/${locale}${item.href}`}>
                {t(item.label, locale)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{ui.shopNow[locale]}</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/80">
            {stores.map((store) => (
              <a key={store.id} href={store.url} target="_blank" rel="noreferrer">
                {t(store.label, locale)}
              </a>
            ))}
            {settings.email ? <a href={`mailto:${settings.email}`}>{settings.email}</a> : null}
            {settings.phone ? <p>{settings.phone}</p> : null}
          </div>
          {socials.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-gold/30 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-gold-soft"
                >
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/5 px-5 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {t(settings.companyName, locale)}. {ui.rights[locale]}
        <Link href={`/${locale}`} className="sr-only">
          Massar
        </Link>
      </div>
    </footer>
  );
}
