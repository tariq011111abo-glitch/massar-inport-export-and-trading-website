"use client";

import { useState } from "react";
import { LOCALES, LOCALE_LABELS, type Locale, type Localized } from "@/lib/types";

export function LocalizedInput({
  label,
  value,
  onChange,
  multiline = false,
  rows = 4,
}: {
  label: string;
  value: Localized;
  onChange: (value: Localized) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const [tab, setTab] = useState<Locale>("en");

  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-forest">{label}</span>
      <div className="flex gap-1">
        {LOCALES.map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => setTab(locale)}
            className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em] ${
              tab === locale ? "bg-forest text-cream" : "bg-sand text-forest"
            }`}
          >
            {LOCALE_LABELS[locale]}
          </button>
        ))}
      </div>
      {multiline ? (
        <textarea
          value={value[tab]}
          rows={rows}
          onChange={(event) => onChange({ ...value, [tab]: event.target.value })}
          className="rounded-2xl border border-forest/10 bg-white px-4 py-3 outline-none ring-gold/40 focus:ring-2"
        />
      ) : (
        <input
          value={value[tab]}
          onChange={(event) => onChange({ ...value, [tab]: event.target.value })}
          className="rounded-2xl border border-forest/10 bg-white px-4 py-3 outline-none ring-gold/40 focus:ring-2"
        />
      )}
    </label>
  );
}
