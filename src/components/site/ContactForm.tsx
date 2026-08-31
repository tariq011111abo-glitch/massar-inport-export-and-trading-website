"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/actions";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const sendingText: Record<Locale, string> = {
  en: "Sending...",
  ar: "جاري الإرسال...",
  ms: "Menghantar...",
};

export function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(formData: FormData) {
    if (status === "sending") return;

    const data = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      locale,
    };

    setStatus("sending");

    try {
      await submitInquiry(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-gold/30 bg-white/80 p-8 text-forest">
        <p className="display text-3xl">{ui.messageSent[locale]}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full bg-forest px-5 py-2 text-xs uppercase tracking-[0.14em] text-cream"
        >
          {locale === "ar" ? "إرسال رسالة أخرى" : locale === "ms" ? "Hantar mesej lain" : "Send another message"}
        </button>
      </div>
    );
  }

  const fieldClass =
    "rounded-2xl border border-forest/10 bg-white px-4 py-3 outline-none ring-gold/40 focus:ring-2";

  return (
    <form action={onSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm">
        <span>{ui.name[locale]}</span>
        <input name="name" required disabled={status === "sending"} className={fieldClass} />
      </label>
      <label className="grid gap-2 text-sm">
        <span>{ui.email[locale]}</span>
        <input name="email" type="email" required disabled={status === "sending"} className={fieldClass} />
      </label>
      <label className="grid gap-2 text-sm">
        <span>{ui.phone[locale]}</span>
        <input name="phone" disabled={status === "sending"} className={fieldClass} />
      </label>
      <label className="grid gap-2 text-sm">
        <span>{ui.message[locale]}</span>
        <textarea
          name="message"
          required
          rows={5}
          disabled={status === "sending"}
          className={fieldClass}
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-forest px-6 py-3 text-sm uppercase tracking-[0.16em] text-cream transition hover:bg-forest-mid disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? sendingText[locale] : ui.sendMessage[locale]}
      </button>
      {status === "error" ? (
        <p className="text-sm text-date">
          {locale === "ar"
            ? "تعذر الإرسال. جرّب واتساب أو البريد الإلكتروني."
            : locale === "ms"
              ? "Penghantaran gagal. Cuba WhatsApp atau e-mel."
              : "Unable to send. Please try WhatsApp or email."}
        </p>
      ) : null}
    </form>
  );
}
