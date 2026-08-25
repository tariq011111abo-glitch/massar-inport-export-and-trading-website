"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { updateSettings } from "@/lib/actions";
import type { SiteSettings } from "@/lib/types";

export function BrandManager({ settings }: { settings: SiteSettings }) {
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || "");
  const [ogImage, setOgImage] = useState(settings.ogImage || "");
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="grid gap-6 rounded-3xl bg-white p-6"
      action={async () => {
        await updateSettings({
          ...settings,
          logoUrl,
          ogImage,
        });
        setSaved(true);
      }}
    >
      <ImageUpload label="Company logo" value={logoUrl} onChange={setLogoUrl} />
      <ImageUpload label="Open Graph / social share image" value={ogImage} onChange={setOgImage} />
      <button className="rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
        Save brand assets
      </button>
      {saved ? <p className="text-sm text-forest">Saved. The public logo updates immediately.</p> : null}
    </form>
  );
}
