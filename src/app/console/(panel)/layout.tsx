import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSession } from "@/lib/auth";
import { ensureSeeded } from "@/db/seed";

export default async function ConsolePanelLayout({ children }: { children: ReactNode }) {
  await ensureSeeded();
  const session = await getSession();
  if (!session) redirect("/console/login");
  return <AdminShell name={session.name || session.email}>{children}</AdminShell>;
}
