"use client";

import { useState } from "react";
import { LocalizedInput } from "@/components/admin/LocalizedInput";
import { updateSettings } from "@/lib/actions";
import type { Localized, SiteSettings } from "@/lib/types";

export function ContactManager({ settings }: { settings: SiteSettings }) {
  const [companyName, setCompanyName] = useState<Localized>(settings.companyName);
  const [tagline, setTagline] = useState<Localized>(settings.tagline);
  const [address, setAddress] = useState<Localized>(settings.address);
  const [seoTitle, setSeoTitle] = useState<Localized>(settings.seoTitle);
  const [seoDescription, setSeoDescription] = useState<Localized>(settings.seoDescription);
  const [phone, setPhone] = useState(settings.phone || "");
  const [email, setEmail] = useState(settings.email || "");
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp || "");
  const [mapsEmbedUrl, setMapsEmbedUrl] = useState(settings.mapsEmbedUrl || "");
  const [mapsLink, setMapsLink] = useState(settings.mapsLink || "");
  const [facebook, setFacebook] = useState(settings.facebook || "");
  const [instagram, setInstagram] = useState(settings.instagram || "");
  const [twitter, setTwitter] = useState(settings.twitter || "");
  const [linkedin, setLinkedin] = useState(settings.linkedin || "");
  const [youtube, setYoutube] = useState(settings.youtube || "");
  const [tiktok, setTiktok] = useState(settings.tiktok || "");
  const [searchConsoleCode, setSearchConsoleCode] = useState(settings.searchConsoleCode || "");
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="grid gap-4 rounded-3xl bg-white p-6"
      action={async () => {
        await updateSettings({
          logoUrl: settings.logoUrl,
          ogImage: settings.ogImage,
          companyName,
          tagline,
          address,
          seoTitle,
          seoDescription,
          phone,
          email,
          whatsapp,
          mapsEmbedUrl,
          mapsLink,
          facebook,
          instagram,
          twitter,
          linkedin,
          youtube,
          tiktok,
          searchConsoleCode,
        });
        setSaved(true);
      }}
    >
      <LocalizedInput label="Company name" value={companyName} onChange={setCompanyName} />
      <LocalizedInput label="Tagline" value={tagline} onChange={setTagline} multiline />
      <LocalizedInput label="Address" value={address} onChange={setAddress} multiline />
      <div className="grid gap-3 md:grid-cols-3">
        <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone" className="rounded-2xl border border-forest/10 px-4 py-3" />
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="rounded-2xl border border-forest/10 px-4 py-3" />
        <input value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} placeholder="WhatsApp" className="rounded-2xl border border-forest/10 px-4 py-3" />
      </div>
      <input value={mapsEmbedUrl} onChange={(event) => setMapsEmbedUrl(event.target.value)} placeholder="Google Maps embed URL" className="rounded-2xl border border-forest/10 px-4 py-3" />
      <input value={mapsLink} onChange={(event) => setMapsLink(event.target.value)} placeholder="Google Maps link" className="rounded-2xl border border-forest/10 px-4 py-3" />
      <div className="grid gap-3 md:grid-cols-2">
        <input value={facebook} onChange={(event) => setFacebook(event.target.value)} placeholder="Facebook URL" className="rounded-2xl border border-forest/10 px-4 py-3" />
        <input value={instagram} onChange={(event) => setInstagram(event.target.value)} placeholder="Instagram URL" className="rounded-2xl border border-forest/10 px-4 py-3" />
        <input value={twitter} onChange={(event) => setTwitter(event.target.value)} placeholder="X / Twitter URL" className="rounded-2xl border border-forest/10 px-4 py-3" />
        <input value={linkedin} onChange={(event) => setLinkedin(event.target.value)} placeholder="LinkedIn URL" className="rounded-2xl border border-forest/10 px-4 py-3" />
        <input value={youtube} onChange={(event) => setYoutube(event.target.value)} placeholder="YouTube URL" className="rounded-2xl border border-forest/10 px-4 py-3" />
        <input value={tiktok} onChange={(event) => setTiktok(event.target.value)} placeholder="TikTok URL" className="rounded-2xl border border-forest/10 px-4 py-3" />
      </div>
      <LocalizedInput label="SEO title" value={seoTitle} onChange={setSeoTitle} />
      <LocalizedInput label="SEO description" value={seoDescription} onChange={setSeoDescription} multiline />
      <input
        value={searchConsoleCode}
        onChange={(event) => setSearchConsoleCode(event.target.value)}
        placeholder="Google Search Console verification code"
        className="rounded-2xl border border-forest/10 px-4 py-3"
      />
      <button className="rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
        Save contact & SEO
      </button>
      {saved ? <p className="text-sm text-forest">Saved.</p> : null}
    </form>
  );
}
