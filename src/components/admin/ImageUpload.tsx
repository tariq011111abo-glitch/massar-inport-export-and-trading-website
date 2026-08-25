"use client";

import { useState } from "react";

export function ImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string | null;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-2 text-sm">
      <span className="font-medium text-forest">{label}</span>
      {value ? (
        <img src={value} alt="" className="h-36 w-full rounded-2xl object-cover" />
      ) : (
        <div className="grid h-36 place-items-center rounded-2xl bg-sand text-muted">No image</div>
      )}
      <div className="flex flex-wrap gap-2">
        <label className="cursor-pointer rounded-full bg-forest px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream">
          {busy ? "Uploading..." : "Upload image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </label>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-full border border-forest/20 px-4 py-2 text-xs uppercase tracking-[0.14em]"
          >
            Remove
          </button>
        ) : null}
      </div>
      {error ? <p className="text-date">{error}</p> : null}
    </div>
  );
}
