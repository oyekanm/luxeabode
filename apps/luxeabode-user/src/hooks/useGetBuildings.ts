// apps/user-app/src/hooks/use-apartments.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { BuildingsClientService } from "@/services/client/buildingsClientService";
import { getClientError } from "@repo/helpers/getClientError";

export function useGetBuildings(filters: QueryFilters) {
  const data = useQuery({
    queryKey: queryKeys.buildings.list(filters), // cursor is part of the key
    queryFn: () => BuildingsClientService.getAll({ ...filters, limit: 12 }),
    staleTime: 1000 * 60 * 5,
    // keep previous page data visible while next page loads
    // prevents layout jump between page transitions
    placeholderData: (prev) => prev,
  });

  return {
    buildings: data.data?.data?.data,
    isLoading: data.isLoading,
    isError: data.isError,
    error: getClientError(data.error),
    prevCursor: data.data?.data?.prevCursor,
    nextCursor: data.data?.data?.nextCursor,
    hasMore: data.data?.data?.hasMore,
  };
}
