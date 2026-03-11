import { queryKeys } from '@/lib/query-keys'
import type { Apartment } from '@repo/db'
import { getClientError } from '@repo/helpers/getClientError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { RoomsClientService } from '../roomClientService'

export default function useDeleteRoom() {
  const queryClient = useQueryClient()

  const remove = useMutation({
    mutationFn: (slug: string) => RoomsClientService.delete(slug),

    onMutate: async (slug) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.rooms.lists() })
      const previousList = queryClient.getQueryData(queryKeys.rooms.lists())

      queryClient.setQueriesData<{ data: Apartment[]; total: number }>(
        { queryKey: queryKeys.buildings.lists() },
        (old) => {
          if (!old?.data) return old
          return {
            ...old,
            data: old.data.filter((b) => b.slug !== slug),
            total: old.total - 1,
          }
        },
      )

      return { previousList }
    },

    onError: (error, __, context) => {
      if (context?.previousList) {
        queryClient.setQueriesData(
          { queryKey: queryKeys.rooms.lists() },
          context.previousList,
        )
      }

      const apiError = getClientError(error)
      toast.error(apiError?.message || 'failed')
    },

    onSettled: (_, __, slug) => {
      invalidateList()
      invalidateDetail(slug)
    },
  })

  // stable references across rerenders
  const invalidateList = useMemo(
    () => () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.rooms.lists() }),
    [queryClient],
  )

  const invalidateDetail = useMemo(
    () => (id: string) =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.rooms.detail(id),
      }),
    [queryClient],
  )

  const handleDeleteRoom = (slug: string) => {
    remove.mutateAsync(slug)
  }

  return {
    // delete
    deleteRoom: handleDeleteRoom,
    isDeleting: remove.isPending,
  }
}
