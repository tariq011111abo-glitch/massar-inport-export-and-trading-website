"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { LocalizedInput } from "@/components/admin/LocalizedInput";
import { deleteService, saveService } from "@/lib/actions";
import { emptyLocalized, type Localized, type ServiceItem } from "@/lib/types";

export function ServicesManager({ services }: { services: ServiceItem[] }) {
  return (
    <div className="grid gap-6">
      {services.map((service) => (
        <ServiceEditor key={service.id} service={service} />
      ))}
      <ServiceEditor />
    </div>
  );
}

function ServiceEditor({ service }: { service?: ServiceItem }) {
  const [title, setTitle] = useState<Localized>(service?.title || emptyLocalized());
  const [description, setDescription] = useState<Localized>(service?.description || emptyLocalized());
  const [imageUrl, setImageUrl] = useState(service?.imageUrl || "");
  const [icon, setIcon] = useState(service?.icon || "import");
  const [visible, setVisible] = useState(service?.visible ?? true);
  const [sortOrder, setSortOrder] = useState(service?.sortOrder || 0);
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="grid gap-4 rounded-3xl bg-white p-6"
      action={async () => {
        await saveService({ id: service?.id, title, description, imageUrl, icon, visible, sortOrder });
        setSaved(true);
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="display text-2xl text-forest">{service ? "Edit service" : "Add service"}</h2>
        {service ? (
          <button
            type="button"
            className="text-sm text-date"
            onClick={async () => {
              if (confirm("Delete this service?")) await deleteService(service.id);
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
      <LocalizedInput label="Title" value={title} onChange={setTitle} />
      <LocalizedInput label="Description" value={description} onChange={setDescription} multiline />
      <input value={icon} onChange={(event) => setIcon(event.target.value)} className="rounded-2xl border border-forest/10 px-4 py-3" />
      <ImageUpload label="Service image" value={imageUrl} onChange={setImageUrl} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={visible} onChange={(event) => setVisible(event.target.checked)} />
        Visible
      </label>
      <input type="number" value={sortOrder} onChange={(event) => setSortOrder(Number(event.target.value))} className="rounded-2xl border border-forest/10 px-4 py-3" />
      <button className="rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
        Save service
      </button>
      {saved ? <p className="text-sm text-forest">Saved.</p> : null}
    </form>
  );
}
