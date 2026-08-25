import Link from "next/link";
import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { serviceIcon, IconMail, IconPhone, IconPin } from "@/components/site/Icons";
import { StoreBadges } from "@/components/site/StoreBadges";
import { labelForCategory, labelForOrigin, labelForStatus, t, ui } from "@/lib/i18n";
import { publicNav, publicStores, sectionByKey } from "@/lib/site";
import type { Locale, SiteData } from "@/lib/types";

export function HomeView({ data, locale }: { data: SiteData; locale: Locale }) {
  const hero = sectionByKey(data, "hero");
  const about = sectionByKey(data, "about");
  const services = sectionByKey(data, "services");
  const products = sectionByKey(data, "products");
  const why = sectionByKey(data, "why");
  const countries = sectionByKey(data, "countries");
  const stores = sectionByKey(data, "stores");
  const contact = sectionByKey(data, "contact");
  const nav = publicNav(data);
  const liveStores = publicStores(data);
  const visibleServices = data.services.filter((item) => item.visible);
  const visibleProducts = data.products.filter((item) => item.visible);
  const visibleHighlights = data.highlights.filter((item) => item.visible);
  const sources = data.countries.filter((item) => item.visible && item.role === "source");
  const destinations = data.countries.filter((item) => item.visible && item.role === "destination");

  return (
    <div className="bg-cream text-ink">
      <Header locale={locale} settings={data.settings} navItems={nav} />

      {hero?.visible ? (
        <section id="home" className="relative min-h-[100svh] overflow-hidden bg-forest-deep text-cream">
          <img
            src={hero.imageUrl || "/images/hero.jpg"}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-36 lg:px-8 lg:pb-24">
            <p className="text-xs uppercase tracking-[0.32em] text-gold-soft">{t(hero.subtitle, locale)}</p>
            <h1 className="display mt-4 max-w-4xl text-5xl leading-[0.95] text-cream md:text-7xl">
              {t(hero.title, locale)}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-cream/80 md:text-lg">
              {t(hero.content, locale)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-full bg-gold px-6 py-3 text-sm uppercase tracking-[0.16em] text-forest-deep"
              >
                {t(hero.ctaPrimary, locale) || ui.exploreProducts[locale]}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-cream/30 px-6 py-3 text-sm uppercase tracking-[0.16em] text-cream"
              >
                {t(hero.ctaSecondary, locale) || ui.contactUs[locale]}
              </a>
            </div>
            <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 text-sm text-cream/70 sm:grid-cols-3">
              <p>Saudi Arabia → Malaysia</p>
              <p>Palestine → Malaysia</p>
              <p>{ui.basedIn[locale]}</p>
            </div>
          </div>
        </section>
      ) : null}

      {about?.visible ? (
        <section id="about" className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-24 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={about.imageUrl || "/images/about.jpg"}
              alt=""
              className="h-[520px] w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-date">{t(about.subtitle, locale)}</p>
            <h2 className="display mt-3 text-4xl text-forest md:text-5xl">{t(about.title, locale)}</h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-muted">
              {t(about.content, locale)
                .split("\n")
                .filter(Boolean)
                .map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
            </div>
          </div>
        </section>
      ) : null}

      {services?.visible ? (
        <section id="services" className="bg-forest text-cream">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">{t(services.subtitle, locale)}</p>
            <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="display max-w-3xl text-4xl md:text-5xl">{t(services.title, locale)}</h2>
              <p className="max-w-md text-sm leading-7 text-cream/70">{t(services.content, locale)}</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleServices.map((item) => {
                const Icon = serviceIcon(item.icon);
                return (
                  <article key={item.id} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
                    <Icon className="h-8 w-8 text-gold" />
                    <h3 className="display mt-5 text-2xl">{t(item.title, locale)}</h3>
                    <p className="mt-3 text-sm leading-7 text-cream/70">{t(item.description, locale)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {products?.visible ? (
        <section id="products" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <p className="text-xs uppercase tracking-[0.28em] text-date">{t(products.subtitle, locale)}</p>
          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="display max-w-3xl text-4xl text-forest md:text-5xl">{t(products.title, locale)}</h2>
            <p className="max-w-md text-sm leading-7 text-muted">{t(products.content, locale)}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.slug}`}
                className="group overflow-hidden rounded-[1.8rem] bg-white shadow-[0_16px_40px_rgba(16,38,28,0.08)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.imageUrl || "/images/product-ajwa.jpg"}
                    alt={t(product.name, locale)}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute start-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-forest">
                    {labelForCategory(product.category, locale)}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">
                    {labelForOrigin(product.originCountry, locale)}
                  </p>
                  <h3 className="display mt-2 text-3xl text-forest">{t(product.name, locale)}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">
                    {t(product.description, locale)}
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-[0.16em] text-gold">
                    {labelForStatus(product.productStatus, locale)} · {ui.viewProduct[locale]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {why?.visible ? (
        <section className="bg-sand">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-date">{t(why.subtitle, locale)}</p>
            <h2 className="display mt-3 max-w-3xl text-4xl text-forest md:text-5xl">{t(why.title, locale)}</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleHighlights.map((item) => {
                const Icon = serviceIcon(item.icon);
                return (
                  <article key={item.id} className="surface-card rounded-[1.6rem] p-6">
                    <Icon className="h-8 w-8 text-date" />
                    <h3 className="display mt-4 text-2xl text-forest">{t(item.title, locale)}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{t(item.description, locale)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {countries?.visible ? (
        <section className="relative overflow-hidden bg-forest-deep text-cream">
          <img
            src={countries.imageUrl || "/images/trade-route.jpg"}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">{t(countries.subtitle, locale)}</p>
            <h2 className="display mt-3 max-w-3xl text-4xl md:text-5xl">{t(countries.title, locale)}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-cream/70">{t(countries.content, locale)}</p>
            <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="grid gap-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">{ui.sourceMarkets[locale]}</p>
                {sources.map((item) => (
                  <article key={item.id} className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur">
                    <p className="text-sm text-gold">{item.code}</p>
                    <h3 className="display text-3xl">{t(item.name, locale)}</h3>
                    <p className="mt-2 text-sm leading-7 text-cream/70">{t(item.description, locale)}</p>
                  </article>
                ))}
              </div>
              <div className="hidden text-center text-gold lg:block">
                <p className="display text-6xl">→</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em]">Massar</p>
              </div>
              <div className="grid gap-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">{ui.destination[locale]}</p>
                {destinations.map((item) => (
                  <article key={item.id} className="rounded-3xl border border-gold/30 bg-gold/10 p-6 backdrop-blur">
                    <p className="text-sm text-gold">{item.code}</p>
                    <h3 className="display text-3xl">{t(item.name, locale)}</h3>
                    <p className="mt-2 text-sm leading-7 text-cream/80">{t(item.description, locale)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {stores?.visible && liveStores.length > 0 ? (
        <section id="stores" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <p className="text-xs uppercase tracking-[0.28em] text-date">{t(stores.subtitle, locale)}</p>
          <h2 className="display mt-3 max-w-3xl text-4xl text-forest md:text-5xl">{t(stores.title, locale)}</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">{t(stores.content, locale)}</p>
          <div className="mt-10">
            <StoreBadges stores={liveStores} locale={locale} />
          </div>
        </section>
      ) : null}

      {contact?.visible ? (
        <section id="contact" className="bg-sand">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-date">{t(contact.subtitle, locale)}</p>
              <h2 className="display mt-3 text-4xl text-forest md:text-5xl">{t(contact.title, locale)}</h2>
              <p className="mt-5 text-sm leading-7 text-muted">{t(contact.content, locale)}</p>
              <div className="mt-8 space-y-4 text-sm">
                {data.settings.address ? (
                  <p className="flex items-start gap-3">
                    <IconPin className="mt-0.5 h-5 w-5 text-date" />
                    <span>{t(data.settings.address, locale)}</span>
                  </p>
                ) : null}
                {data.settings.phone ? (
                  <p className="flex items-center gap-3">
                    <IconPhone className="h-5 w-5 text-date" />
                    <a href={`tel:${data.settings.phone}`}>{data.settings.phone}</a>
                  </p>
                ) : null}
                {data.settings.email ? (
                  <p className="flex items-center gap-3">
                    <IconMail className="h-5 w-5 text-date" />
                    <a href={`mailto:${data.settings.email}`}>{data.settings.email}</a>
                  </p>
                ) : null}
                {data.settings.whatsapp ? (
                  <a
                    href={`https://wa.me/${data.settings.whatsapp.replace(/[^\d]/g, "")}`}
                    className="inline-flex rounded-full bg-[#128C7E] px-5 py-2 text-cream"
                  >
                    {ui.whatsapp[locale]}
                  </a>
                ) : null}
              </div>
              <div className="mt-8">
                <ContactForm locale={locale} />
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
              {data.settings.mapsEmbedUrl ? (
                <iframe
                  title="Massar map"
                  src={data.settings.mapsEmbedUrl}
                  className="h-full min-h-[520px] w-full border-0"
                  loading="lazy"
                />
              ) : (
                <img src="/images/trade-route.jpg" alt="" className="h-full min-h-[520px] w-full object-cover" />
              )}
              {data.settings.mapsLink ? (
                <a
                  href={data.settings.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-forest px-5 py-3 text-center text-xs uppercase tracking-[0.18em] text-gold"
                >
                  {ui.openMap[locale]}
                </a>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <Footer locale={locale} settings={data.settings} navItems={nav} stores={liveStores} />
    </div>
  );
}
