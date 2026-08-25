import { ContactManager } from "./contact-manager";
import { getSiteData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function ContactAdminPage() {
  const data = await getSiteData();
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-date">Company</p>
      <h1 className="display mt-2 text-5xl text-forest">Contact & SEO</h1>
      <p className="mt-3 mb-8 max-w-2xl text-muted">
        Phone, email, WhatsApp, maps, social profiles and search metadata — all editable without code.
      </p>
      <ContactManager settings={data.settings} />
    </div>
  );
}
