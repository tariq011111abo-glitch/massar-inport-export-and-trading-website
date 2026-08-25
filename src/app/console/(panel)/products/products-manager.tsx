// "use client";

// import { useState } from "react";
// import { ImageUpload } from "@/components/admin/ImageUpload";
// import { LocalizedInput } from "@/components/admin/LocalizedInput";
// import { deleteProduct, saveProduct } from "@/lib/actions";
// import { emptyLocalized, type Localized, type ProductItem } from "@/lib/types";

// export function ProductsManager({ products }: { products: ProductItem[] }) {
//   return (
//     <div className="grid gap-6">
//       {products.map((product) => (
//         <ProductEditor key={product.id} product={product} />
//       ))}
//       <ProductEditor />
//     </div>
//   );
// }

// function ProductEditor({ product }: { product?: ProductItem }) {
//   const [name, setName] = useState<Localized>(product?.name || emptyLocalized());
//   const [description, setDescription] = useState<Localized>(product?.description || emptyLocalized());
//   const [slug, setSlug] = useState(product?.slug || "");
//   const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
//   const [category, setCategory] = useState(product?.category || "dates");
//   const [originCountry, setOriginCountry] = useState(product?.originCountry || "Saudi Arabia");
//   const [productStatus, setProductStatus] = useState(product?.productStatus || "both");
//   const [visible, setVisible] = useState(product?.visible ?? true);
//   const [sortOrder, setSortOrder] = useState(product?.sortOrder || 0);
//   const [saved, setSaved] = useState(false);

//   return (
//     <form
//       className="grid gap-4 rounded-3xl bg-white p-6"
//       action={async () => {
//         await saveProduct({
//           id: product?.id,
//           slug,
//           name,
//           description,
//           imageUrl,
//           category,
//           originCountry,
//           productStatus,
//           visible,
//           sortOrder,
//         });
//         setSaved(true);
//       }}
//     >
//       <div className="flex items-center justify-between">
//         <h2 className="display text-2xl text-forest">{product ? "Edit product" : "Add product"}</h2>
//         {product ? (
//           <button
//             type="button"
//             className="text-sm text-date"
//             onClick={async () => {
//               if (confirm("Delete this product?")) await deleteProduct(product.id);
//             }}
//           >
//             Delete
//           </button>
//         ) : null}
//       </div>
//       <LocalizedInput label="Product name" value={name} onChange={setName} />
//       <LocalizedInput label="Description" value={description} onChange={setDescription} multiline rows={5} />
//       <input
//         value={slug}
//         onChange={(event) => setSlug(event.target.value)}
//         placeholder="URL slug (optional)"
//         className="rounded-2xl border border-forest/10 px-4 py-3"
//       />
//       <div className="grid gap-3 md:grid-cols-3">
//         <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-2xl border border-forest/10 px-4 py-3">
//           <option value="dates">Dates</option>
//           <option value="oils">Oils</option>
//           <option value="other">Other food</option>
//         </select>
//         <select value={originCountry} onChange={(event) => setOriginCountry(event.target.value)} className="rounded-2xl border border-forest/10 px-4 py-3">
//           <option value="Saudi Arabia">Saudi Arabia</option>
//           <option value="Palestine">Palestine</option>
//           <option value="Malaysia">Malaysia</option>
//         </select>
//         <select value={productStatus} onChange={(event) => setProductStatus(event.target.value)} className="rounded-2xl border border-forest/10 px-4 py-3">
//           <option value="imported">Imported</option>
//           <option value="sold">Sold / distributed</option>
//           <option value="both">Imported & sold</option>
//         </select>
//       </div>
//       <ImageUpload label="Product image" value={imageUrl} onChange={setImageUrl} />
//       <label className="flex items-center gap-2 text-sm">
//         <input type="checkbox" checked={visible} onChange={(event) => setVisible(event.target.checked)} />
//         Visible on website
//       </label>
//       <input type="number" value={sortOrder} onChange={(event) => setSortOrder(Number(event.target.value))} className="rounded-2xl border border-forest/10 px-4 py-3" />
//       <button className="rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
//         {product ? "Save product" : "Create product"}
//       </button>
//       {saved ? <p className="text-sm text-forest">Saved.</p> : null}
//     </form>
//   );
// }
"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { LocalizedInput } from "@/components/admin/LocalizedInput";
import { deleteProduct, saveProduct } from "@/lib/actions";
import { emptyLocalized, type Localized, type ProductItem } from "@/lib/types";

export function ProductsManager({ products }: { products: ProductItem[] }) {
  return (
    <div className="grid gap-6">
      {products.map((product) => (
        <ProductEditor key={product.id} product={product} />
      ))}
      <ProductEditor />
    </div>
  );
}

function ProductEditor({ product }: { product?: ProductItem }) {
  const [name, setName] = useState<Localized>(product?.name || emptyLocalized());
  const [description, setDescription] = useState<Localized>(product?.description || emptyLocalized());
  const [slug, setSlug] = useState(product?.slug || "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [category, setCategory] = useState(product?.category || "dates");
  const [originCountry, setOriginCountry] = useState(product?.originCountry || "Saudi Arabia");
  const [productStatus, setProductStatus] = useState(product?.productStatus || "both");
  const [visible, setVisible] = useState(product?.visible ?? true);
  const [sortOrder, setSortOrder] = useState(product?.sortOrder || 0);
  const [weights, setWeights] = useState(product?.weights || "");
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="grid gap-4 rounded-3xl bg-white p-6"
      action={async () => {
        await saveProduct({
          id: product?.id,
          slug,
          name,
          description,
          imageUrl,
          category,
          originCountry,
          productStatus,
          weights,
          visible,
          sortOrder,
        });
        setSaved(true);
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="display text-2xl text-forest">{product ? "Edit product" : "Add product"}</h2>
        {product ? (
          <button
            type="button"
            className="text-sm text-date"
            onClick={async () => {
              if (confirm("Delete this product?")) await deleteProduct(product.id);
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
      <LocalizedInput label="Product name" value={name} onChange={setName} />
      <LocalizedInput label="Description" value={description} onChange={setDescription} multiline rows={5} />
      <input
        value={slug}
        onChange={(event) => setSlug(event.target.value)}
        placeholder="URL slug (optional)"
        className="rounded-2xl border border-forest/10 px-4 py-3"
      />
      <div className="grid gap-3 md:grid-cols-3">
        <input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category (e.g. Dates)" className="rounded-2xl border border-forest/10 px-4 py-3" />
        <input value={originCountry} onChange={(event) => setOriginCountry(event.target.value)} placeholder="Origin country" className="rounded-2xl border border-forest/10 px-4 py-3" />
        <input value={productStatus} onChange={(event) => setProductStatus(event.target.value)} placeholder="Status (e.g. Imported)" className="rounded-2xl border border-forest/10 px-4 py-3" />
      </div>
      <input value={weights || ""} onChange={(event) => setWeights(event.target.value)} placeholder="Weights (e.g. 500g, 1kg, 2kg)" className="rounded-2xl border border-forest/10 px-4 py-3" />
      <ImageUpload label="Product image" value={imageUrl} onChange={setImageUrl} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={visible} onChange={(event) => setVisible(event.target.checked)} />
        Visible on website
      </label>
      <input type="number" value={sortOrder} onChange={(event) => setSortOrder(Number(event.target.value))} className="rounded-2xl border border-forest/10 px-4 py-3" />
      <button className="rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
        {product ? "Save product" : "Create product"}
      </button>
      {saved ? <p className="text-sm text-forest">Saved.</p> : null}
    </form>
  );
}
