import { desc } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { deleteInquiry } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-date">Inbox</p>
      <h1 className="display mt-2 text-5xl text-forest">Inquiries</h1>
      <div className="mt-8 grid gap-4">
        {rows.length === 0 ? <p className="text-muted">No inquiries yet.</p> : null}
        {rows.map((row) => (
          <article key={row.id} className="rounded-3xl bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-forest">{row.name}</h2>
                <p className="text-sm text-muted">
                  {row.email} {row.phone ? `· ${row.phone}` : ""}
                </p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await deleteInquiry(row.id);
                }}
              >
                <button className="text-sm text-date">Delete</button>
              </form>
            </div>
            <p className="mt-4 text-sm leading-7">{row.message}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">
              {row.createdAt.toLocaleString()} · {row.locale}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
