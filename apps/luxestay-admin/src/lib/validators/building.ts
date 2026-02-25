import z from 'zod'

export const CreateApartmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  coverImageKey: z.string().min(1, 'Add a Cover Image'),
  amenities: z.array(z.string()).min(1, 'Add atleast one Amenity available'),
  checkInTime: z.string().min(1, 'Check-in time is required'),
  checkOutTime: z.string().min(1, 'Check-out time is required'),
  minStayNights: z.number().optional(),
  rules: z.array(z.string()).optional(),
})

export type CreateApartmentInput = z.infer<typeof CreateApartmentSchema>
