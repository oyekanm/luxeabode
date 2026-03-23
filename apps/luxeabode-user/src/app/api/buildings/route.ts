import { buildingFiltersSchema } from "@/lib/validators/filtersSchema";
import { BuildingsService } from "@repo/services/buildings";
import { ValidationError } from "@repo/services/errors";
import { handleError } from "@repo/services/handle-error";
import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);
    const { searchParams } = new URL(request.url);

    const cursor = searchParams.get("cursor") || undefined;
    const state = searchParams.get("state") || undefined;
    const city = searchParams.get("city") || undefined;

    const validated = buildingFiltersSchema.safeParse({
      cursor,
      state,
      city,
    });

    if (!validated.success) {
      throw new ValidationError("Invalid filters");
    }

    const result = await BuildingsService.getAlls(db, validated.data);

    console.log(result);

    return NextResponse.json({
      success: true,
      message: "Buildings fetched successfully",
      data: result,
    });
  } catch (error) {
    return handleError(error);
  }
}
