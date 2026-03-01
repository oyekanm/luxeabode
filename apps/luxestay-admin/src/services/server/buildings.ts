//    async create(input: CreateApartmentInput, createdBy: string) {
//       const [apartment] = await db
//         .insert(apartments)
//         .values({ ...input, createdBy })
//         .returning();
//       return apartment;
//     },
//     async update(id: string, input: UpdateApartmentInput) {
//       const [updated] = await db
//         .update(apartments)
//         .set({ ...input, updatedAt: new Date() })
//         .where(eq(apartments.id, id))
//         .returning();
//       return updated;
//     },
//     async delete(id: string) {
//       await db.delete(apartments).where(eq(apartments.id, id));
//     },

import type { CreateApartmentInput } from '@/lib/validators/building'
import type { Db } from '@repo/db/client'
import { apartmentImages, apartments } from '@repo/db/schema'
import { slugify } from 'zod'

export class BuildingsServerService {
  static async create(input: CreateApartmentInput, db: Db) {
    // const {
    //   name,
    //   address,
    //   city,
    //   state,
    //   country,
    //   coverImageKey,
    //   amenities,
    //   checkInTime,
    //   checkOutTime,
    //   minStayNights,
    //   rules,
    //   description
    // } = input
    const slug = slugify()

    console.log(slug)

    // run a db transaction to create apartment and image
    // await db.transaction(async(tx)=>{

    // })

    // const query = await db.insert(apartments).values({
    //  address:address,
    //  city:city,
    //  state:state,
    //  country:country,
    //  coverImageKey:coverImageKey,
    //  amenities:amenities,
    //  checkInTime:checkInTime,
    //  checkOutTime:checkOutTime,
    //  minStayNights,
    //  rules,
    //  name,
    //  description,
    //  slug:slug,

    // })
    // .returning()

    // db.insert(apartmentImages).values([
    //   {

    //   }])

    return 'data'
  }
}
