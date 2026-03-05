import { Db, eq, and, sql, R2Bucket } from "@repo/db";
// import type {
//   CreateApartmentInput,
//   UpdateApartmentInput,
// } from "@repo/validators/apartment";
import { apartments, rooms, apartmentImages } from "@repo/db";
import { NotFoundError } from "./errors";
import { createStorageService } from "./storage";

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
  static async deleteImage(
    db: Db,
    imageId: string,
    r2: R2Bucket,
    r2BaseUrl: string,
  ) {
    const image = await db.query.apartmentImages.findFirst({
      where: eq(apartmentImages.id, imageId),
    });

    if (!image) throw new NotFoundError("Image");

    const storage = createStorageService(r2, r2BaseUrl);

    // delete from R2 first, then from DB
    // if R2 delete fails the DB record stays intact (safer than the reverse)
    await storage.delete(image.r2Key);
    await db.delete(apartmentImages).where(eq(apartmentImages.id, imageId));
  }
}
