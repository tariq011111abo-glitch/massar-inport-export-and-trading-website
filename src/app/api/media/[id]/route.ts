import { eq } from "drizzle-orm";
import { db } from "@/db";
import { media } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const mediaId = Number(id);
  if (!Number.isFinite(mediaId)) {
    return new Response("Not found", { status: 404 });
  }

  const [row] = await db.select().from(media).where(eq(media.id, mediaId)).limit(1);
  if (!row) {
    return new Response("Not found", { status: 404 });
  }

  const body = Buffer.from(row.data, "base64");
  return new Response(body, {
    headers: {
      "Content-Type": row.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
