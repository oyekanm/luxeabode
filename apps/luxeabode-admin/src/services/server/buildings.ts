import { slugify } from '@/lib/slugify'
import type { CreateApartmentInput } from '@/lib/validators/building'
import type { Db } from '@repo/db/client'
import { apartmentImages, apartments } from '@repo/db/schema'
import { createId } from '@paralleldrive/cuid2'
import { eq } from '@repo/db'

export class BuildingsServerService {
  static async getAll(db: Db) {
    return db
      .select({
        // images: apartmentImages,
      })
      .from(apartments)
      .where(eq(apartments.isPublished, true))
  }
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

    console.log(slug, 'name slug')

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
  // static async update(id: string, input: UpdateApartmentInput, db: Db) {
  //   const { name, address, city, state, country, checkInTime, checkOutTime, minStayNights, rules, description, images } = input
  //   const slug = slugify(name)

  //   console.log(slug, 'name slug')

  //   const imagesArray = (id: string) => {
  //     return images.map((image) => ({
  //       apartmentId: id,
  //       key: image.key,
  //       url: image.url,
  //       altText: image.url,
  //     }))
  //   }

  //   // run a db transaction to create apartment and image
  //   await db.batch([
  //     db.update(apartments).set({
  //       address: address,
  //       city: city,
  //       state: state,
  //       country: country,
  //       checkInTime: checkInTime,
  //       checkOutTime: checkOutTime,
  //       minStayNights,
  //       rules,
  //       name,
  //       description,
  //       slug,
  //       isPublished: true,
  //     }).where(eq(apartments.id, id)),

  //     db.insert(apartmentImages).values(imagesArray(id)),
  //   ])
  // }
}
