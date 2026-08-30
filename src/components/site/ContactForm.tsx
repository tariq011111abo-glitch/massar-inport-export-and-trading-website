"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/actions";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(formData: FormData) {
    setStatus("sending");
    try {
      await submitInquiry({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        message: String(formData.get("message") || ""),
        locale,
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-gold/20 bg-white/70 p-8 text-forest">
        <p className="display text-3xl">{ui.messageSent[locale]}</p>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm">
        <span>{ui.name[locale]}</span>
        <input
          name="name"
          required
          className="rounded-2xl border border-forest/10 bg-white px-4 py-3 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span>{ui.email[locale]}</span>
        <input
          name="email"
          type="email"
          required
          className="rounded-2xl border border-forest/10 bg-white px-4 py-3 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span>{ui.phone[locale]}</span>
        <input
          name="phone"
          className="rounded-2xl border border-forest/10 bg-white px-4 py-3 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span>{ui.message[locale]}</span>
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-2xl border border-forest/10 bg-white px-4 py-3 outline-none ring-gold/40 focus:ring-2"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        onClick={() => setStatus("sending")}
        className="rounded-full bg-forest px-6 py-3 text-sm uppercase tracking-[0.16em] text-cream transition hover:bg-forest-mid disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (locale === "ar" ? "جاري الإرسال..." : locale === "ms" ? "Menghantar..." : "Sending...") : ui.sendMessage[locale]}
      </button>
      {status === "error" ? (
        <p className="text-sm text-date">Unable to send. Please try WhatsApp or email.</p>
      ) : null}
    </form>
  );
}