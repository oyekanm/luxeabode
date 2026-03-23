import { getDb } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { BuildingsService } from "@repo/services/buildings";
import { NotFoundError, ValidationError } from "@repo/services/errors";
import { handleError } from "@repo/services/handle-error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);

    if (!slug || typeof slug !== "string") {
      throw new ValidationError("Slug is required");
    }

    const result = await BuildingsService.getBySlug(db, slug);

    if (!result) {
      throw new NotFoundError("Building not found");
    }

    return NextResponse.json({
      success: true,
      message: "Building fetched successfully",
      data: result,
    });
  } catch (error) {
    return handleError(error);
  }
}
