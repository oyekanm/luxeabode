import z from 'zod'

export const CreateApartmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  checkInTime: z.string().min(1, 'Check-in time is required'),
  checkOutTime: z.string().min(1, 'Check-out time is required'),
  minStayNights: z.coerce.number().optional(),
  rules: z.array(z.string()).optional(),
  images: z
    .array(
      z.object({
        url: z.string().min(1, 'Image URL is required'),
        key: z.string().min(1, 'R2 Key is required'),
      }),
    )
    .min(5, 'Add atleast 5 Images'),
})

export type CreateApartmentInput = z.infer<typeof CreateApartmentSchema>
