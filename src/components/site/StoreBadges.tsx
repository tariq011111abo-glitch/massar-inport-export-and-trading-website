import { t, ui } from "@/lib/i18n";
import type { Locale, StoreItem } from "@/lib/types";

function PlatformMark({ platform }: { platform: string }) {
  if (platform === "shopee") {
    return (
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#ee4d2d] text-lg font-bold text-white">
        S
      </span>
    );
  }
  if (platform === "lazada") {
    return (
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0f146d] text-lg font-bold text-[#f8d12f]">
        L
      </span>
    );
  }
  return (
    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-black text-lg font-bold text-white">
      TT
    </span>
  );
}

export function StoreBadges({ stores, locale }: { stores: StoreItem[]; locale: Locale }) {
  if (stores.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stores.map((store) => (
        <a
          key={store.id}
          href={store.url}
          target="_blank"
          rel="noreferrer"
          className="surface-card group flex items-center gap-4 rounded-3xl p-5 transition hover:-translate-y-1"
        >
          <PlatformMark platform={store.platform} />
          <span>
            <span className="block text-lg font-semibold text-forest">{t(store.label, locale)}</span>
            <span className="text-sm text-muted">{ui.visitStore[locale]}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
