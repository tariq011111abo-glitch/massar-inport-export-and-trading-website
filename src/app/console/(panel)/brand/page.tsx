import { BrandManager } from "./brand-manager";
import { getSiteData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function BrandAdminPage() {
  const data = await getSiteData();
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-date">Identity</p>
      <h1 className="display mt-2 text-5xl text-forest">Logo & brand</h1>
      <p className="mt-3 mb-8 max-w-2xl text-muted">
        Upload, replace or remove the logo. It updates automatically in the header and footer.
      </p>
      <BrandManager settings={data.settings} />
    </div>
  );
}
