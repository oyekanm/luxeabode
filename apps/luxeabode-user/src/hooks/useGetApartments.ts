import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { RoomsClientService } from "@/services/client/roomsClientService";
import { getClientError } from "@repo/helpers/getClientError";

export default function useGetApartments(filters: QueryFilters) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.rooms.list(filters),
    queryFn: () => RoomsClientService.getAll(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
  return {
    apartments: data?.data?.data,
    isLoading,
    isError,
    error: getClientError(error),
    prevCursor: data?.data?.prevCursor,
    nextCursor: data?.data?.nextCursor,
    hasMore: data?.data?.hasMore,
  };
}
