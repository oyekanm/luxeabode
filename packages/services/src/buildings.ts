import { Db, eq, and, sql } from "@repo/db";
// import type {
//   CreateApartmentInput,
//   UpdateApartmentInput,
// } from "@repo/validators/apartment";
import { apartments, rooms, apartmentImages } from "@repo/db";

// add cache to the service and rate limiting

export class BuildingsService {
  static async getBuildings(db: Db) {
    return await db.select().from(apartments);
  }
  static async getAll(
    db: Db,
    filters?: { city?: string; isPublished?: boolean },
  ) {
    return db.query.apartments.findMany({
      where: and(
        filters?.isPublished !== undefined
          ? eq(apartments.isPublished, filters.isPublished)
          : undefined,
        filters?.city ? eq(apartments.city, filters.city) : undefined,
      ),
      with: { images: true, rooms: true },
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
}
