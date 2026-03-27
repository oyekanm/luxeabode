import z from "zod";

export const bookingSchema = z.object({
  id: z.string().optional(),
  roomId: z.string().min(2),
  userId: z.string().min(5, { message: "you need to login to reserve" }),
  totalCost: z.coerce
    .number()
    .gte(1, { message: "select dates to get a price" }),
  startDate: z.string().min(5, { message: "select a check-in date" }),
  endDate: z.string().min(5, { message: "select a check-out date" }),
  guest: z.string().min(1, { message: "select a guest" }),
});

export type BookingFilters = z.infer<typeof bookingSchema>;
