import { ServicesManager } from "./services-manager";
import { getSiteData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const data = await getSiteData();
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-date">Offer</p>
      <h1 className="display mt-2 text-5xl text-forest">Services</h1>
      <p className="mt-3 mb-8 max-w-2xl text-muted">Add, edit or hide import, export, trading and distribution services.</p>
      <ServicesManager services={data.services} />
    </div>
  );
}
