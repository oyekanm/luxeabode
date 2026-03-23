import { z } from "zod";

export const buildingFiltersSchema = z.object({
  cursor: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

export const apartmentFiltersSchema = z.object({
  cursor: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
});
