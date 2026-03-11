import { and, apartmentImages, apartments, type Db, eq, desc } from "@repo/db";
import { NotFoundError } from "./errors";
import { createStorageService } from "./storage";
import type { R2BucketLike } from "./types";

//TODO: add cache to the service and rate limiting

interface GetBuildingsFilters {
  city?: string;
  isPublished?: boolean;
  cursor?: string;
  limit?: number;
}

export class BuildingsService {
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
