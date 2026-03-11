import {
  and,
  apartmentImages,
  apartments,
  type Db,
  eq,
  desc,
  roomImages,
} from "@repo/db";
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

export class RoomsService {
  static async getAll(db: Db, filters?: GetBuildingsFilters) {
    return db.query.rooms.findMany({
      where: and(
        filters?.isPublished !== undefined
          ? eq(apartments.isPublished, filters.isPublished)
          : undefined,
        filters?.city ? eq(apartments.city, filters.city) : undefined,
      ),
      with: { images: true, pricingRules: true, apartment: true },
      orderBy: desc(apartments.createdAt),
    });
  }
  static async getBySlug(db: Db, slug: string) {
    return db.query.rooms.findFirst({
      where: eq(apartments.slug, slug),
      with: {
        images: true,
        pricingRules: true,
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
