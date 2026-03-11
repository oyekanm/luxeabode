import { slugify } from '@/lib/slugify'
import type { CreateApartmentInput } from '@/lib/validators/building'
import type { Db } from '@repo/db/client'
import { apartmentImages, apartments } from '@repo/db/schema'
import { createId } from '@paralleldrive/cuid2'
import { eq } from '@repo/db'
import { NotFoundError } from '@repo/services/errors'
import { createStorageService } from '@repo/services/storage'

export class BuildingsServerService {
  static async create(input: CreateApartmentInput, db: Db) {
    const id = createId()
    const {
      name,
      address,
      city,
      state,
      country,
      checkInTime,
      checkOutTime,
      minStayNights,
      rules,
      description,
      images,
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
        address: address,
        city: city,
        state: state,
        country: country,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        minStayNights,
        rules,
        name,
        description,
        slug,
        isPublished: true,
        id,
      }),

      db.insert(apartmentImages).values(imagesArray(id)),
    ])
  }
  static async update(
    slug: string,
    input: CreateApartmentInput,
    db: Db,
    r2: R2Bucket,
    r2BaseUrl: string,
  ) {
    const { images } = input
    const newSlug = slugify(input.name)

    // check if apartment with same slug exists
    const apartment = await db.query.apartments.findFirst({
      where: eq(apartments.slug, slug),
      with: { images: true },
    })

    // throw notfound error if it doesnt exist
    if (!apartment) throw new NotFoundError(`Building ${slug}`)

    const isNewImages = images.length > apartment.images.length

    // delete existing images for this apartment only if a new image is added
    if (images && isNewImages) {
      // delete old images from R2
      const oldKeys = apartment.images.map((img) => img.key)
      if (oldKeys.length > 0) {
        const storage = createStorageService(r2, r2BaseUrl)
        await storage.deleteMany(oldKeys)
      }

      // delete old image records from DB
      await db
        .delete(apartmentImages)
        .where(eq(apartmentImages.apartmentId, apartment.id))
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
        ...(input.address && { address: input.address }),
        ...(input.city && { city: input.city }),
        ...(input.state && { state: input.state }),
        ...(input.rules && { rules: input.rules }),
        ...(input.checkInTime && { checkInTime: input.checkInTime }),
        ...(input.checkOutTime && { checkOutTime: input.checkOutTime }),
        ...(input.minStayNights !== undefined && {
          minStayNights: input.minStayNights,
        }),
        slug: newSlug,
        updatedAt: new Date(),
      })
      .where(eq(apartments.slug, slug))

    // run a db transaction to update apartment and image on conditions
    if (isNewImages) {
      await db.batch([
        updateQuery,
        db.insert(apartmentImages).values(imagesArray(apartment.id)),
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
        rooms: {
          with: {
            images: true,
          },
        },
      },
    })

    // throw error if not found
    if (!building) throw new NotFoundError(`Building ${slug}`)

    //  collect all r2 keys into one flat array
    const apartmentImageKeys = building.images.map((img) => img.key)

    const roomImageKeys = building.rooms.flatMap((room) =>
      room.images.map((img) => img.key),
    )

    const allKeys = [...apartmentImageKeys, ...roomImageKeys]

    const storage = createStorageService(r2, r2BaseUrl)

    // delete all r2 objects in one  call
    if (allKeys.length > 0) {
      await storage.deleteMany(allKeys)
    }

    // delete the building — cascade handles rooms and all DB image records
    await db.delete(apartments).where(eq(apartments.id, building.id))
  }
}
