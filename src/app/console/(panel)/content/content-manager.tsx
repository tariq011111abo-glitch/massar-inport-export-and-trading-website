"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { LocalizedInput } from "@/components/admin/LocalizedInput";
import { saveCountry, saveHighlight, updateNavItem, updateSection } from "@/lib/actions";
import { emptyLocalized, type CountryItem, type HighlightItem, type Localized, type NavItem, type SiteSection } from "@/lib/types";

export function ContentManager({
  sections,
  navItems,
  highlights,
  countries,
}: {
  sections: SiteSection[];
  navItems: NavItem[];
  highlights: HighlightItem[];
  countries: CountryItem[];
}) {
  return (
    <div className="grid gap-10">
      <section>
        <h2 className="display text-3xl text-forest">Navigation</h2>
        <div className="mt-4 grid gap-4">
          {navItems.map((item) => (
            <NavEditor key={item.id} item={item} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="display text-3xl text-forest">Page sections</h2>
        <div className="mt-4 grid gap-6">
          {sections.map((section) => (
            <SectionEditor key={section.id} section={section} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="display text-3xl text-forest">Why Massar</h2>
        <div className="mt-4 grid gap-4">
          {highlights.map((item) => (
            <HighlightEditor key={item.id} item={item} />
          ))}
          <HighlightEditor />
        </div>
      </section>
      <section>
        <h2 className="display text-3xl text-forest">Countries & routes</h2>
        <div className="mt-4 grid gap-4">
          {countries.map((item) => (
            <CountryEditor key={item.id} item={item} />
          ))}
          <CountryEditor />
        </div>
      </section>
    </div>
  );
}

function NavEditor({ item }: { item: NavItem }) {
  const [label, setLabel] = useState<Localized>(item.label);
  const [href, setHref] = useState(item.href);
  const [visible, setVisible] = useState(item.visible);
  const [sortOrder, setSortOrder] = useState(item.sortOrder);
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="grid gap-3 rounded-3xl bg-white p-5"
      action={async () => {
        await updateNavItem({ id: item.id, label, href, visible, sortOrder });
        setSaved(true);
      }}
    >
      <div className="flex items-center justify-between">
        <p className="font-medium text-forest">{item.key}</p>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={visible} onChange={(event) => setVisible(event.target.checked)} />
          Visible
        </label>
      </div>
      <LocalizedInput label="Label" value={label} onChange={setLabel} />
      <input
        value={href}
        onChange={(event) => setHref(event.target.value)}
        className="rounded-2xl border border-forest/10 px-4 py-3"
      />
      <input
        type="number"
        value={sortOrder}
        onChange={(event) => setSortOrder(Number(event.target.value))}
        className="rounded-2xl border border-forest/10 px-4 py-3"
      />
      <button className="rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
        Save navigation
      </button>
      {saved ? <p className="text-sm text-forest">Saved.</p> : null}
    </form>
  );
}

function SectionEditor({ section }: { section: SiteSection }) {
  const [title, setTitle] = useState<Localized>(section.title);
  const [subtitle, setSubtitle] = useState<Localized>(section.subtitle);
  const [content, setContent] = useState<Localized>(section.content);
  const [ctaPrimary, setCtaPrimary] = useState<Localized>(section.ctaPrimary || emptyLocalized());
  const [ctaSecondary, setCtaSecondary] = useState<Localized>(section.ctaSecondary || emptyLocalized());
  const [imageUrl, setImageUrl] = useState(section.imageUrl || "");
  const [visible, setVisible] = useState(section.visible);
  const [sortOrder, setSortOrder] = useState(section.sortOrder);
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="grid gap-4 rounded-3xl bg-white p-6"
      action={async () => {
        await updateSection({
          id: section.id,
          title,
          subtitle,
          content,
          imageUrl,
          ctaPrimary,
          ctaSecondary,
          visible,
          sortOrder,
        });
        setSaved(true);
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="display text-2xl text-forest">{section.key}</h3>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={visible} onChange={(event) => setVisible(event.target.checked)} />
          Show section
        </label>
      </div>
      <LocalizedInput label="Eyebrow / subtitle" value={subtitle} onChange={setSubtitle} />
      <LocalizedInput label="Title" value={title} onChange={setTitle} />
      <LocalizedInput label="Content" value={content} onChange={setContent} multiline rows={6} />
      {section.key === "hero" ? (
        <>
          <LocalizedInput label="Primary button" value={ctaPrimary} onChange={setCtaPrimary} />
          <LocalizedInput label="Secondary button" value={ctaSecondary} onChange={setCtaSecondary} />
        </>
      ) : null}
      <ImageUpload label="Section image" value={imageUrl} onChange={setImageUrl} />
      <input
        type="number"
        value={sortOrder}
        onChange={(event) => setSortOrder(Number(event.target.value))}
        className="rounded-2xl border border-forest/10 px-4 py-3"
      />
      <button className="rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
        Save section
      </button>
      {saved ? <p className="text-sm text-forest">Saved.</p> : null}
    </form>
  );
}

function HighlightEditor({ item }: { item?: HighlightItem }) {
  const [title, setTitle] = useState<Localized>(item?.title || emptyLocalized());
  const [description, setDescription] = useState<Localized>(item?.description || emptyLocalized());
  const [icon, setIcon] = useState(item?.icon || "spark");
  const [visible, setVisible] = useState(item?.visible ?? true);
  const [sortOrder, setSortOrder] = useState(item?.sortOrder || 0);
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="grid gap-3 rounded-3xl bg-white p-5"
      action={async () => {
        await saveHighlight({ id: item?.id, title, description, icon, visible, sortOrder });
        setSaved(true);
      }}
    >
      <LocalizedInput label={item ? "Highlight" : "New highlight"} value={title} onChange={setTitle} />
      <LocalizedInput label="Description" value={description} onChange={setDescription} multiline />
      <input value={icon} onChange={(event) => setIcon(event.target.value)} className="rounded-2xl border border-forest/10 px-4 py-3" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={visible} onChange={(event) => setVisible(event.target.checked)} />
        Visible
      </label>
      <input type="number" value={sortOrder} onChange={(event) => setSortOrder(Number(event.target.value))} className="rounded-2xl border border-forest/10 px-4 py-3" />
      <button className="rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
        {item ? "Save highlight" : "Add highlight"}
      </button>
      {saved ? <p className="text-sm text-forest">Saved.</p> : null}
    </form>
  );
}

function CountryEditor({ item }: { item?: CountryItem }) {
  const [name, setName] = useState<Localized>(item?.name || emptyLocalized());
  const [description, setDescription] = useState<Localized>(item?.description || emptyLocalized());
  const [role, setRole] = useState(item?.role || "source");
  const [code, setCode] = useState(item?.code || "");
  const [visible, setVisible] = useState(item?.visible ?? true);
  const [sortOrder, setSortOrder] = useState(item?.sortOrder || 0);
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="grid gap-3 rounded-3xl bg-white p-5"
      action={async () => {
        await saveCountry({ id: item?.id, name, description, role, code, visible, sortOrder });
        setSaved(true);
      }}
    >
      <LocalizedInput label={item ? "Country" : "New country"} value={name} onChange={setName} />
      <LocalizedInput label="Description" value={description} onChange={setDescription} multiline />
      <select value={role} onChange={(event) => setRole(event.target.value)} className="rounded-2xl border border-forest/10 px-4 py-3">
        <option value="source">Source</option>
        <option value="destination">Destination</option>
      </select>
      <input value={code} onChange={(event) => setCode(event.target.value)} placeholder="SA / PS / MY" className="rounded-2xl border border-forest/10 px-4 py-3" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={visible} onChange={(event) => setVisible(event.target.checked)} />
        Visible
      </label>
      <input type="number" value={sortOrder} onChange={(event) => setSortOrder(Number(event.target.value))} className="rounded-2xl border border-forest/10 px-4 py-3" />
      <button className="rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
        {item ? "Save country" : "Add country"}
      </button>
      {saved ? <p className="text-sm text-forest">Saved.</p> : null}
    </form>
  );
}
