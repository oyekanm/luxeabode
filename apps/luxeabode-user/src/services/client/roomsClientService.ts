import { apiClient } from "@/lib/api-client";
import { Apartment } from "@repo/db";
import { PaginatedResult } from "@repo/services/types";

export class RoomsClientService {
  static async getAll(filters: QueryFilters) {
    const query = new URLSearchParams();
    if (filters.city) query.set("city", filters.city);
    if (filters.state) query.set("state", filters.state);
    if (filters.cursor) query.set("cursor", filters.cursor);
    if (filters.maxPrice) query.set("maxPrice", filters.maxPrice.toString());
    if (filters.minPrice) query.set("minPrice", filters.minPrice.toString());

    return apiClient.get<PaginatedResult<Apartment>>(
      `/apartments?${query.toString()}`,
    );
  }
  static async getOne(slug: string) {
    return apiClient.get<Apartment>(`/apartments/${slug}`);
  }
}
