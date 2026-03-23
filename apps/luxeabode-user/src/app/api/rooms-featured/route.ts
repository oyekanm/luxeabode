import { getDb } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { rooms } from "@repo/db";
import { handleError } from "@repo/services/handle-error";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);

    const result = await db.select().from(rooms);
    return NextResponse.json({
      success: true,
      data: result,
      message: "Success",
    });
  } catch (error) {
    return handleError(error);
  }
}
