import { useQuery } from '@tanstack/react-query'
import { BuildingsClientService } from '../buildingClientService'
import { queryKeys } from '@/lib/query-keys'
import { getClientError } from '@repo/helpers/getClientError'

export default function useSingleBuilding(slug: string) {
  const list = useQuery({
    queryKey: queryKeys.buildings.detail(slug),
    queryFn: () => BuildingsClientService.getOne(slug),
    staleTime: 1000 * 60 * 60,
    placeholderData: (prev) => prev,
  })

  // console.log(list)

  return {
    building: list.data,
    isLoading: list.isLoading,
    listError: getClientError(list.error),
  }
}
