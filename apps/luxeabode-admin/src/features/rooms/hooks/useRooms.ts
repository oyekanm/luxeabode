import { getClientError } from '@repo/helpers/getClientError'
import { RoomsClientService } from '../roomClientService'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'

export const useRooms = (filters?: {
  page?: number
  isPublished?: boolean
}) => {
  const list = useQuery({
    queryKey: queryKeys.rooms.list(filters ?? {}),
    queryFn: () => RoomsClientService.getAll(filters),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  })

  return {
    rooms: list.data,
    isLoading: list.isLoading,
    listError: getClientError(list.error),
  }
}
