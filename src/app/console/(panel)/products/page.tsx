import { ProductsManager } from "./products-manager";
import { getSiteData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function ProductsAdminPage() {
  const data = await getSiteData();
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-date">Catalogue</p>
      <h1 className="display mt-2 text-5xl text-forest">Products</h1>
      <p className="mt-3 mb-8 max-w-2xl text-muted">
        Products are for display only. Customers are sent to Shopee, Lazada or TikTok Shop to purchase.
      </p>
      <ProductsManager products={data.products} />
    </div>
  );
}
