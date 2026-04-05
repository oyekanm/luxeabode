import z from 'zod'

export const createRoomSchema = z.object({
  buildingId: z.string().min(1, 'Building ID is required'),
  name: z.string().min(1, 'Room name is required'),
  description: z.string().min(1, 'Room description is required'),
  amenities: z.array(z.string()).min(1, 'Room amenities are required'),
  rules: z.array(z.string()).optional(),
  images: z
    .array(
      z.object({
        url: z.string().min(1, 'Image URL is required'),
        key: z.string().min(1, 'R2 Key is required'),
      }),
    )
    .min(1, 'Add atleast one Image'),
  type: z
    .enum(['single', 'double', 'mini-suite', 'suite', 'studio', 'penthouse'])
    .default('single'),
  bookingMode: z
    .enum(['room_only', 'apartment_only', 'both'])
    .default('room_only'),
  maxGuests: z.coerce.number<number>().min(1, 'Max guests is required'),
  bedrooms: z.coerce.number<number>().min(1, 'Bedrooms is required'),
  bathrooms: z.coerce.number<number>().min(1, 'Bathrooms is required'),
  hasSittingRoom: z.boolean().default(false),
  nightlyRate: z.coerce.number<number>().min(1, 'Nightly rate is required'),
  monthlyRate: z.coerce.number<number>().optional(),
})

export type CreateRoomInput = z.infer<typeof createRoomSchema>
