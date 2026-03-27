import {
  and,
  type Db,
  eq,
  desc,
  gt,
  asc,
  type Apartment,
  lt,
  buildings,
  buildingImages,
  Building,
} from "@repo/db";
import { NotFoundError } from "../errors";
import { createStorageService } from "./storage";
import type { PaginatedResult, R2BucketLike } from "../types";

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
  ): Promise<PaginatedResult<Building>> {
    const limit = filters?.limit ?? 12;
    const cursor = filters?.cursor;

    // fetch one extra to know if there are more pages
    const rows = await db.query.buildings.findMany({
      where: and(
        filters?.isPublished !== undefined
          ? eq(buildings.isPublished, filters.isPublished)
          : undefined,
        filters?.city ? eq(buildings.city, filters.city) : undefined,
        filters?.state ? eq(buildings.state, filters.state) : undefined,
        // if cursor exists, get records after it
        cursor ? gt(buildings.id, cursor) : undefined,
      ),
      with: {
        images: true,
        apartments: {
          with: {
            pricingRules: true,
            images: true,
          },
          limit: 10,
        },
      },
      orderBy: desc(buildings.id), // must always order by cursor field
      limit: limit + 1, // fetch one extra to determine if theres more
    });

    console.log(rows);

    const hasMore = rows.length > limit;
    const buildingsAvail = hasMore ? rows.slice(0, limit) : rows;

    return {
      data: buildingsAvail,
      nextCursor: hasMore ? buildingsAvail[buildingsAvail.length - 1].id : null,
      prevCursor: null,
      hasMore,
    };
  }
  static async getAll(db: Db, filters?: GetBuildingsFilters) {
    return db.query.buildings.findMany({
      where: and(
        filters?.isPublished !== undefined
          ? eq(buildings.isPublished, filters.isPublished)
          : undefined,
        filters?.city ? eq(buildings.city, filters.city) : undefined,
      ),
      with: { images: true, apartments: true },
      orderBy: desc(buildings.createdAt),
    });
  }
  static async getBySlug(db: Db, slug: string) {
    return db.query.buildings.findFirst({
      where: eq(buildings.slug, slug),
      with: {
        images: true,
        apartments: { with: { images: true, pricingRules: true } },
      },
    });
  }
  static async deleteImage(
    db: Db,
    imagekey: string,
    r2: R2BucketLike,
    r2BaseUrl: string,
  ) {
    const image = await db.query.buildingImages.findFirst({
      where: eq(buildingImages.key, imagekey),
    });

    if (!image) throw new NotFoundError(`Image ${imagekey}`);

    const storage = createStorageService(r2, r2BaseUrl);

    // delete from R2 first, then from DB
    // if R2 delete fails the DB record stays intact (safer than the reverse)
    await storage.delete(image.key);
    await db.delete(buildingImages).where(eq(buildingImages.key, imagekey));
  }
}
