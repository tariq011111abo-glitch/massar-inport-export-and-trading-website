
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/console", label: "Overview", ar: "نظرة عامة" },
  { href: "/console/content", label: "Homepage & sections", ar: "الرئيسية والأقسام" },
  { href: "/console/services", label: "Services", ar: "الخدمات" },
  { href: "/console/products", label: "Products", ar: "المنتجات" },
  { href: "/console/stores", label: "Marketplace stores", ar: "المتاجر" },
  { href: "/console/contact", label: "Contact & SEO", ar: "التواصل" },
  { href: "/console/brand", label: "Logo & brand", ar: "الشعار" },
  { href: "/console/inquiries", label: "Inquiries", ar: "الرسائل" },
];

export function AdminShell({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const [uiLang, setUiLang] = useState<"en" | "ar" | "ms">("en");
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/console/login");
    router.refresh();
  }

  return (
    <div dir={uiLang === "ar" ? "rtl" : "ltr"} lang={uiLang} className="min-h-screen bg-[#f3eee4] text-ink">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="bg-forest-deep text-cream">
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Private console</p>
            <p className="display mt-2 text-3xl">Massar</p>
            <p className="mt-1 text-xs text-cream/60">Content control centre</p>
          </div>
          <nav className="grid gap-1 p-4">
            {links.map((link) => {
              const active = pathname === link.href;
              const displayLabel = uiLang === "ar" ? link.ar : link.label;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    active ? "bg-gold text-forest-deep" : "text-cream/80 hover:bg-white/5"
                  }`}
                >
                  {displayLabel}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto px-6 py-6 text-xs text-cream/50">
            Signed in as {name}
            <button type="button" onClick={logout} className="mt-3 block text-gold">
              Sign out
            </button>
          </div>
        </aside>
        <div className="admin-grid">
          <header className="flex items-center justify-between border-b border-forest/10 bg-white/70 px-6 py-4 backdrop-blur">
            <p className="text-sm text-muted">Changes appear on the public site immediately.</p>
            <div className="flex items-center gap-3 relative group">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("lang-dropdown");
                  if (el) el.classList.toggle("hidden");
                }}
                className="rounded-full bg-forest px-3 py-1.5 text-xs text-cream flex items-center gap-1"
              >
                Language ▼
              </button>
              <div
                id="lang-dropdown"
                className="hidden absolute top-full right-0 mt-2 rounded-2xl border border-white/20 bg-forest text-cream shadow-2xl overflow-hidden min-w-[120px] z-50"
              >
                <button onClick={() => setUiLang("en")} className="block w-full text-left px-4 py-2 text-xs hover:bg-white/10">English</button>
                <button onClick={() => setUiLang("ar")} className="block w-full text-left px-4 py-2 text-xs hover:bg-white/10">العربية</button>
                <button onClick={() => setUiLang("ms")} className="block w-full text-left px-4 py-2 text-xs hover:bg-white/10">Bahasa Melayu</button>
              </div>
              <a href="/en" target="_blank" className="text-sm text-forest underline">
                View website
              </a>
            </div>
          </header>
          <main className="px-5 py-8 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
