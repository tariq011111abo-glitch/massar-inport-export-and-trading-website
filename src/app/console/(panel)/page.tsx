import Link from "next/link";
import { getSiteData, publicStores } from "@/lib/site";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function ConsoleHomePage() {
  const data = await getSiteData();
  const inquiryRows = await db.select().from(inquiries);
  const cards = [
    { label: "Visible products", value: data.products.filter((item) => item.visible).length, href: "/console/products" },
    { label: "Services", value: data.services.length, href: "/console/services" },
    { label: "Live storefronts", value: publicStores(data).length, href: "/console/stores" },
    { label: "Inquiries", value: inquiryRows.length, href: "/console/inquiries" },
  ];

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-date">Dashboard</p>
      <h1 className="display mt-2 text-5xl text-forest">Massar control centre</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Manage every public section, product, service, store link and contact detail from here. The website is a
        brochure and catalogue — not a checkout.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">{card.label}</p>
            <p className="display mt-3 text-5xl text-forest">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-3xl bg-forest p-8 text-cream">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Default access</p>
        <p className="mt-3 text-lg">admin@massar-group.com</p>
        <p className="text-sm text-cream/70">Change this password after first deployment.</p>
      </div>
    </div>
  );
}
