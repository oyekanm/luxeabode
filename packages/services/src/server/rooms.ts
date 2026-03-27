import {
  and,
  Apartment,
  apartmentImages,
  apartments,
  buildings,
  type Db,
  desc,
  eq,
  inArray,
  lt,
} from "@repo/db";
import { buildRoomPaginatedResult } from "../build-paginated-result";
import { NotFoundError } from "../errors";
import type { GetRoomsFilters, PaginatedResult, R2BucketLike } from "../types";
import { createStorageService } from "./storage";

//TODO: add cache to the service and rate limiting

export class RoomsService {
  static async getAll(
    db: Db,
    filters?: GetRoomsFilters,
  ): Promise<PaginatedResult<Apartment>> {
    const limit = filters?.limit ?? 15;
    const cursor = filters?.cursor;
    const published = filters?.isPublished ?? true;
    const hasLocationFilter = !!(filters?.city || filters?.state);

    // fetch one extra to know if there are more pages
    // check if city and state filter is true to determine what query to call
    if (hasLocationFilter) {
      return getRoomsWithLocationFilter(db, limit, cursor, filters);
    }
    const rows = await db.query.apartments.findMany({
      where: and(
        // published ? eq(rooms.isPublished, published) : undefined,
        cursor ? lt(apartments.id, cursor) : undefined,
      ),
      with: {
        images: true,
        building: {
          columns: {
            name: true,
          },
        },
      },
      orderBy: desc(apartments.id),
      limit: limit + 1,
    });

    return buildRoomPaginatedResult(rows, limit, cursor, db, filters);
  }
  static async getBySlug(db: Db, slug: string) {
    return db.query.apartments.findFirst({
      where: eq(apartments.slug, slug),
      with: {
        images: true,
        pricingRules: true,
        building: true,
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

const getRoomsWithLocationFilter = async (
  db: Db,
  limit: number,
  cursor?: string,
  filters?: GetRoomsFilters,
): Promise<PaginatedResult<Apartment>> => {
  // get buildings that beong to the location filters
  const buildingsAvail = await db.query.buildings.findMany({
    where: and(
      filters?.city ? eq(buildings.city, filters.city) : undefined,
      filters?.state ? eq(buildings.state, filters.state) : undefined,
    ),
    columns: {
      id: true,
    },
  });

  if (buildingsAvail.length === 0)
    return {
      data: [],
      nextCursor: null,
      hasMore: false,
      prevCursor: null,
    };

  const allIds = buildingsAvail.map((b) => b.id);
  const rows = await db.query.apartments.findMany({
    where: and(
      cursor ? lt(apartments.id, cursor) : undefined,
      inArray(apartments.id, allIds),
    ),
    with: {
      images: true,
      building: {
        columns: {
          name: true,
        },
      },
    },
    orderBy: desc(apartments.id),
    limit: limit + 1,
  });

  return buildRoomPaginatedResult(rows, limit, cursor, db, filters);
};
