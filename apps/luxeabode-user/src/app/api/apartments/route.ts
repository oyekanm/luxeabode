import { getDb } from "@/lib/db";
import { apartmentFiltersSchema } from "@/lib/validators/filtersSchema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { ValidationError } from "@repo/services/errors";
import { handleError } from "@repo/services/handle-error";
import { RoomsService } from "@repo/services/rooms";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env.DB);
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor") || undefined;
    const state = searchParams.get("state") || undefined;
    const city = searchParams.get("city") || undefined;
    const minPrice = searchParams.get("minPrice") || undefined;
    const maxPrice = searchParams.get("maxPrice") || undefined;

    const validated = apartmentFiltersSchema.safeParse({
      cursor,
      state,
      city,
      minPrice,
      maxPrice,
    });

    if (!validated.success) {
      throw new ValidationError("Invalid filters");
    }

    const result = await RoomsService.getAll(db, validated.data);

    //   return Response.json(result, {
    //   headers: {
    // 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    //     'Cache-Tag': 'rooms-list',
    //   },
    // })

    return NextResponse.json({
      success: true,
      message: "Buildings fetched successfully",
      data: result,
    });
  } catch (error) {
    // console.log(error, "error");
    return handleError(error);
  }
}
