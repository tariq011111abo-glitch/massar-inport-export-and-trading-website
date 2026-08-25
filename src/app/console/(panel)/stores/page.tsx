import { StoresManager } from "./stores-manager";
import { getSiteData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function StoresAdminPage() {
  const data = await getSiteData();
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-date">Marketplaces</p>
      <h1 className="display mt-2 text-5xl text-forest">Shop our stores</h1>
      <p className="mt-3 mb-8 max-w-2xl text-muted">
        Add Shopee, Lazada or TikTok Shop URLs. Empty or disabled platforms stay hidden from visitors.
      </p>
      <StoresManager stores={data.stores} />
    </div>
  );
}
