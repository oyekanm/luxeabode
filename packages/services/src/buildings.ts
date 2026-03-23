import {
  and,
  apartmentImages,
  apartments,
  type Db,
  eq,
  desc,
  gt,
  asc,
  type Apartment,
  lt,
} from "@repo/db";
import { NotFoundError } from "./errors";
import { createStorageService } from "./storage";
import type { PaginatedResult, R2BucketLike } from "./types";

//TODO: add cache to the service and rate limiting

interface GetBuildingsFilters {
  city?: string;
  state?: string;
  isPublished?: boolean;
  cursor?: string;
  limit?: number;
}

export class BuildingsService {
  static async getAlls(
    db: Db,
    filters?: GetBuildingsFilters,
  ): Promise<PaginatedResult<Apartment>> {
    const limit = filters?.limit ?? 12;
    const cursor = filters?.cursor;

    // fetch one extra to know if there are more pages
    const rows = await db.query.apartments.findMany({
      where: and(
        filters?.isPublished !== undefined
          ? eq(apartments.isPublished, filters.isPublished)
          : undefined,
        filters?.city ? eq(apartments.city, filters.city) : undefined,
        filters?.state ? eq(apartments.state, filters.state) : undefined,
        // if cursor exists, get records after it
        cursor ? gt(apartments.id, cursor) : undefined,
      ),
      with: {
        images: true,
        rooms: {
          with: {
            pricingRules: true,
            images: true,
          },
          limit: 10,
        },
      },
      orderBy: desc(apartments.id), // must always order by cursor field
      limit: limit + 1, // fetch one extra to determine if theres more
    });

    const hasMore = rows.length > limit;
    const buildings = hasMore ? rows.slice(0, limit) : rows;

    // check if there are items before the first item on this page
    // this tells us whether to enable the prev button
    let prevCursor: string | null = null;

    if (buildings.length > 0 && cursor) {
      const firstItem = buildings[0];

      console.log(firstItem.id, cursor, "testing cursor");

      const prevRow = await db.query.apartments.findFirst({
        where: and(
          filters?.isPublished !== undefined
            ? eq(apartments.isPublished, filters.isPublished)
            : undefined,
          filters?.city ? eq(apartments.city, filters.city) : undefined,
          filters?.state ? eq(apartments.state, filters.state) : undefined,

          lt(apartments.id, firstItem.id), // items before current page
        ),
        orderBy: desc(apartments.id), // get the one immediately before
      });

      prevCursor = prevRow?.id ?? null;
    }

    return {
      data: buildings,
      nextCursor: hasMore ? buildings[buildings.length - 1].id : null,
      prevCursor,
      hasMore,
    };
  }
  static async getAll(db: Db, filters?: GetBuildingsFilters) {
    return db.query.apartments.findMany({
      where: and(
        filters?.isPublished !== undefined
          ? eq(apartments.isPublished, filters.isPublished)
          : undefined,
        filters?.city ? eq(apartments.city, filters.city) : undefined,
      ),
      with: { images: true, rooms: true },
      orderBy: desc(apartments.createdAt),
    });
  }
  static async getBySlug(db: Db, slug: string) {
    return db.query.apartments.findFirst({
      where: eq(apartments.slug, slug),
      with: {
        images: true,
        rooms: { with: { images: true, pricingRules: true } },
      },
    });
  }
  static async deleteImage(
    db: Db,
    imagekey: string,
    r2: R2BucketLike,
    r2BaseUrl: string,
  ) {
    const image = await db.query.apartmentImages.findFirst({
      where: eq(apartmentImages.key, imagekey),
    });

    if (!image) throw new NotFoundError(`Image ${imagekey}`);

    const storage = createStorageService(r2, r2BaseUrl);

    // delete from R2 first, then from DB
    // if R2 delete fails the DB record stays intact (safer than the reverse)
    await storage.delete(image.key);
    await db.delete(apartmentImages).where(eq(apartmentImages.key, imagekey));
  }
}
