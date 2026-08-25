"use client";

import { useState } from "react";
import { LocalizedInput } from "@/components/admin/LocalizedInput";
import { deleteStore, saveStore } from "@/lib/actions";
import { emptyLocalized, type Localized, type StoreItem } from "@/lib/types";

export function StoresManager({ stores }: { stores: StoreItem[] }) {
  return (
    <div className="grid gap-6">
      <p className="rounded-3xl bg-gold/15 p-5 text-sm text-forest">
        A platform only appears on the public website when it has a URL and is enabled.
      </p>
      {stores.map((store) => (
        <StoreEditor key={store.id} store={store} />
      ))}
      <StoreEditor />
    </div>
  );
}

function StoreEditor({ store }: { store?: StoreItem }) {
  const [platform, setPlatform] = useState(store?.platform || "shopee");
  const [label, setLabel] = useState<Localized>(store?.label || emptyLocalized());
  const [url, setUrl] = useState(store?.url || "");
  const [enabled, setEnabled] = useState(store?.enabled ?? false);
  const [sortOrder, setSortOrder] = useState(store?.sortOrder || 0);
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="grid gap-4 rounded-3xl bg-white p-6"
      action={async () => {
        await saveStore({ id: store?.id, platform, label, url, enabled, sortOrder });
        setSaved(true);
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="display text-2xl text-forest">{store ? store.platform : "Add store"}</h2>
        {store ? (
          <button
            type="button"
            className="text-sm text-date"
            onClick={async () => {
              if (confirm("Remove this store?")) await deleteStore(store.id);
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
      <select value={platform} onChange={(event) => setPlatform(event.target.value)} className="rounded-2xl border border-forest/10 px-4 py-3">
        <option value="shopee">Shopee</option>
        <option value="lazada">Lazada</option>
        <option value="tiktok">TikTok Shop</option>
      </select>
      <LocalizedInput label="Label" value={label} onChange={setLabel} />
      <input
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://"
        className="rounded-2xl border border-forest/10 px-4 py-3"
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />
        Enable on website
      </label>
      <input type="number" value={sortOrder} onChange={(event) => setSortOrder(Number(event.target.value))} className="rounded-2xl border border-forest/10 px-4 py-3" />
      <button className="rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
        Save store
      </button>
      {saved ? <p className="text-sm text-forest">Saved.</p> : null}
    </form>
  );
}
