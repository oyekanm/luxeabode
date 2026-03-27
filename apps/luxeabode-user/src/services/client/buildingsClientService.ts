import { apiClient } from "@/lib/api-client";
import type { Building } from "@repo/db";
import { PaginatedResult } from "@repo/services/types";

interface Filters {
  cursor?: string;
  city?: string;
  state?: string;
  limit?: number;
}

export class BuildingsClientService {
  static async getAll(filters?: Filters) {
    const params = new URLSearchParams();
    if (filters?.cursor) params.set("cursor", filters.cursor);
    if (filters?.city) params.set("city", filters.city);
    if (filters?.state) params.set("state", filters.state);
    if (filters?.limit) params.set("limit", filters.limit.toString());
    return apiClient.get<PaginatedResult<Building>>(
      `/buildings?${params.toString()}`,
    );
  }

  static async getOne(slug: string) {
    return apiClient.get<Building>(`/buildings/${slug}`);
  }
}
