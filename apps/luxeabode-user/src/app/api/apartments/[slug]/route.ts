import { getDb } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { handleError } from "@repo/services/handle-error";
import { NextResponse } from "next/server";
import { RoomsService } from "@repo/services/server/rooms";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);
    const { slug } = await params;

    // throw new NotFoundError("Not implemented");

    const result = await RoomsService.getBySlug(db, slug);

    return NextResponse.json({
      success: true,
      message: "Apartment fetched successfully",
      data: result,
    });
  } catch (error) {
    return handleError(error);
  }
}
