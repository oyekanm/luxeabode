import {
  and,
  apartmentImages,
  apartments,
  type Db,
  eq,
  desc,
  roomImages,
  Room,
  gt,
  rooms,
  lt,
  inArray,
} from "@repo/db";
import { NotFoundError } from "./errors";
import { createStorageService } from "./storage";
import type { GetRoomsFilters, PaginatedResult, R2BucketLike } from "./types";
import { buildRoomPaginatedResult } from "./build-paginated-result";

//TODO: add cache to the service and rate limiting

export class RoomsService {
  static async getAll(
    db: Db,
    filters?: GetRoomsFilters,
  ): Promise<PaginatedResult<Room>> {
    const limit = filters?.limit ?? 15;
    const cursor = filters?.cursor;
    const published = filters?.isPublished ?? true;
    const hasLocationFilter = !!(filters?.city || filters?.state);

    // fetch one extra to know if there are more pages
    // check if city and state filter is true to determine what query to call
    if (hasLocationFilter) {
      return getRoomsWithLocationFilter(db, limit, cursor, filters);
    }
    const rows = await db.query.rooms.findMany({
      where: and(
        // published ? eq(rooms.isPublished, published) : undefined,
        cursor ? lt(rooms.id, cursor) : undefined,
      ),
      with: {
        images: true,
        apartment: {
          columns: {
            name: true,
          },
        },
      },
      orderBy: desc(rooms.id),
      limit: limit + 1,
    });

    return buildRoomPaginatedResult(rows, limit, cursor, db, filters);
  }
  static async getBySlug(db: Db, slug: string) {
    return db.query.rooms.findFirst({
      where: eq(apartments.slug, slug),
      with: {
        images: true,
        pricingRules: true,
        apartment: true,
      },
    });
  }
  static async deleteImage(
    db: Db,
    imagekey: string,
    r2: R2BucketLike,
    r2BaseUrl: string,
  ) {
    const image = await db.query.roomImages.findFirst({
      where: eq(roomImages.key, imagekey),
    });

    if (!image) throw new NotFoundError(`Image ${imagekey}`);

    const storage = createStorageService(r2, r2BaseUrl);

    // delete from R2 first, then from DB
    // if R2 delete fails the DB record stays intact (safer than the reverse)
    await storage.delete(image.key);
    await db.delete(roomImages).where(eq(roomImages.key, imagekey));
  }
}

const getRoomsWithLocationFilter = async (
  db: Db,
  limit: number,
  cursor?: string,
  filters?: GetRoomsFilters,
): Promise<PaginatedResult<Room>> => {
  // get buildings that beong to the location filters
  const buildings = await db.query.apartments.findMany({
    where: and(
      filters?.city ? eq(apartments.city, filters.city) : undefined,
      filters?.state ? eq(apartments.state, filters.state) : undefined,
    ),
    columns: {
      id: true,
    },
  });

  if (buildings.length === 0)
    return {
      data: [],
      nextCursor: null,
      hasMore: false,
      prevCursor: null,
    };

  const allIds = buildings.map((b) => b.id);
  const rows = await db.query.rooms.findMany({
    where: and(
      cursor ? lt(rooms.id, cursor) : undefined,
      inArray(rooms.apartmentId, allIds),
    ),
    with: {
      images: true,
      apartment: {
        columns: {
          name: true,
        },
      },
    },
    orderBy: desc(rooms.id),
    limit: limit + 1,
  });

  return buildRoomPaginatedResult(rows, limit, cursor, db, filters);
};
