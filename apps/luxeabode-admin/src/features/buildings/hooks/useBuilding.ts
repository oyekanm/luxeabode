// apps/admin/src/hooks/use-buildings.ts
import { queryKeys } from '@/lib/query-keys'
import { useQuery } from '@tanstack/react-query'
import { getClientError } from '@repo/helpers/getClientError'
import { BuildingsClientService } from '../buildingClientService'

export function useBuildings(filters?: {
  page?: number
  isPublished?: boolean
}) {
  const list = useQuery({
    queryKey: queryKeys.buildings.list(filters ?? {}),
    queryFn: () => BuildingsClientService.getAll(filters),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  })

  return {
    buildings: list.data,
    isLoading: list.isLoading,
    listError: getClientError(list.error),
  }
}
