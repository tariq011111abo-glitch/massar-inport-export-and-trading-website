"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConsoleLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    if (!response.ok) {
      setError("Invalid email or password.");
      setBusy(false);
      return;
    }
    router.push("/console");
    router.refresh();
  }

  return (
    <div dir="ltr" className="grid min-h-screen place-items-center bg-forest-deep px-5 text-cream">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-[2rem] border border-gold/20 bg-white/5 p-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Massar private access</p>
        <h1 className="display mt-3 text-4xl">Sign in</h1>
        <p className="mt-2 text-sm text-cream/70">Authorized administrators only.</p>
        <label className="mt-8 grid gap-2 text-sm">
          Email
          <input
            name="email"
            type="email"
            required
            defaultValue="admin@massar-group.com"
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-cream outline-none"
          />
        </label>
        <label className="mt-4 grid gap-2 text-sm">
          Password
          <input
            name="password"
            type="password"
            required
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-cream outline-none"
          />
        </label>
        {error ? <p className="mt-4 text-sm text-gold-soft">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-gold py-3 text-sm uppercase tracking-[0.16em] text-forest-deep disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Enter console"}
        </button>
      </form>
    </div>
  );
}
