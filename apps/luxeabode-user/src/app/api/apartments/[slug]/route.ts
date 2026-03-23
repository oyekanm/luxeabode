import { getDb } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getClientError } from "@repo/helpers/getClientError";
import { NotFoundError } from "@repo/services/errors";
import { handleError } from "@repo/services/handle-error";
import { RoomsService } from "@repo/services/rooms";
import { NextResponse } from "next/server";

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
