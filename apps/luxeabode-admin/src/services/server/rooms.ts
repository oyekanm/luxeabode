import { slugify } from '@/lib/slugify'
import type { CreateRoomInput } from '@/lib/validators/room'
import { createId } from '@paralleldrive/cuid2'
import { apartmentImages, apartments, eq, type Db } from '@repo/db'
import { NotFoundError } from '@repo/services/errors'
import { createStorageService } from '@repo/services/server/storage'

export class RoomsServerService {
  static async create(input: CreateRoomInput, db: Db) {
    const id = createId()
    const {
      name,
      amenities,
      buildingId,
      rules,
      description,
      images,
      bathrooms,
      bedrooms,
      bookingMode,
      hasSittingRoom,
      maxGuests,
      nightlyRate,
      type,
      monthlyRate,
    } = input
    const slug = slugify(name)

    const imagesArray = (id: string) => {
      return images.map((image) => ({
        apartmentId: id,
        key: image.key,
        url: image.url,
        altText: image.url,
      }))
    }

    // run a db transaction to create apartment and image
    await db.batch([
      db.insert(apartments).values({
        rules,
        name,
        description,
        slug,
        id,
        bathrooms,
        bedrooms,
        bookingMode,
        hasSittingRoom,
        maxGuests,
        nightlyRate,
        type,
        monthlyRate,
        amenities,
        buildingId,
      }),

      db.insert(apartmentImages).values(imagesArray(id)),
    ])
  }
  static async update(
    slug: string,
    input: CreateRoomInput,
    db: Db,
    r2: R2Bucket,
    r2BaseUrl: string,
  ) {
    const { images } = input
    const newSlug = slugify(input.name)

    // check if apartment with same slug exists
    const room = await db.query.apartments.findFirst({
      where: eq(apartments.slug, slug),
      with: { images: true },
    })

    // throw notfound error if it doesnt exist
    if (!room) throw new NotFoundError(`Room ${slug}`)

    const isNewImages = images.length > room.images.length

    // delete existing images for this apartment only if a new image is added
    if (images && isNewImages) {
      // delete old images from R2
      const oldKeys = room.images.map((img) => img.key)
      if (oldKeys.length > 0) {
        const storage = createStorageService(r2, r2BaseUrl)
        await storage.deleteMany(oldKeys)
      }

      // delete old image records from DB
      await db
        .delete(apartmentImages)
        .where(eq(apartmentImages.apartmentId, room.id))
    }

    const imagesArray = (id: string) => {
      return images.map((image) => ({
        apartmentId: id,
        key: image.key,
        url: image.url,
        altText: image.url,
      }))
    }

    const updateQuery = db
      .update(apartments)
      .set({
        ...(input.name && { name: input.name }),
        ...(input.description && { description: input.description }),
        ...(input.description && { description: input.description }),
        ...(input.amenities && { amenities: input.amenities }),
        ...(input.bookingMode && { bookingMode: input.bookingMode }),
        ...(input.hasSittingRoom && { hasSittingRoom: input.hasSittingRoom }),
        ...(input.maxGuests !== undefined && { maxGuests: input.maxGuests }),
        ...(input.nightlyRate !== undefined && {
          nightlyRate: input.nightlyRate,
        }),
        ...(input.monthlyRate !== undefined && {
          monthlyRate: input.monthlyRate,
        }),
        ...(input.type && { type: input.type }),
        ...(input.bathrooms !== undefined && { bathrooms: input.bathrooms }),
        ...(input.bedrooms !== undefined && { bedrooms: input.bedrooms }),
        ...(input.rules && { rules: input.rules }),
        slug: newSlug,
        updatedAt: new Date(),
        buildingId: room.buildingId,
      })
      .where(eq(apartments.slug, slug))

    // run a db transaction to update apartment and image on conditions
    if (isNewImages) {
      await db.batch([
        updateQuery,
        db.insert(apartmentImages).values(imagesArray(room.id)),
      ])
    } else {
      db.batch([updateQuery])
    }
  }
  static async delete(slug: string, db: Db, r2: R2Bucket, r2BaseUrl: string) {
    // fetch the building with all rooms and their images before deleting
    const building = await db.query.apartments.findFirst({
      where: eq(apartments.slug, slug),
      with: {
        images: true,
      },
    })

    // throw error if not found
    if (!building) throw new NotFoundError(`Building ${slug}`)

    //  collect all r2 keys into one flat array
    const roomImageKeys = building.images.map((img) => img.key)

    const allKeys = [...roomImageKeys]

    const storage = createStorageService(r2, r2BaseUrl)

    // delete all r2 objects in one  call
    if (allKeys.length > 0) {
      await storage.deleteMany(allKeys)
    }

    // delete the building — cascade handles rooms and all DB image records
    await db.delete(apartments).where(eq(apartments.id, building.id))
  }
}
