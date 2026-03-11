import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BuildingsClientService } from '../buildingClientService'
import { queryKeys } from '@/lib/query-keys'
import type { Apartment } from '@repo/db'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { getClientError } from '@repo/helpers/getClientError'

export default function useDeleteBuilding() {
  const queryClient = useQueryClient()

  const deleteBuilding = async (slug: string) => {
    try {
      const resp = await BuildingsClientService.delete(slug)

      toast.success(resp.message || 'Building deleted successfully')
      // clear form and cache
      //   resets()
    } catch (error: any) {
      const apiError = getClientError(error)

      toast.error(apiError?.message || 'failed')
    }
  }
  const remove = useMutation({
    mutationFn: (slug: string) => deleteBuilding(slug),

    onMutate: async (slug) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.buildings.lists() })
      const previousList = queryClient.getQueryData(queryKeys.buildings.lists())

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

    onError: (_, __, context) => {
      if (context?.previousList) {
        queryClient.setQueriesData(
          { queryKey: queryKeys.buildings.lists() },
          context.previousList,
        )
      }
    },

    onSettled: () => invalidateList(),
  })

  // stable references across rerenders
  const invalidateList = useMemo(
    () => () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.buildings.lists() }),
    [queryClient],
  )

  const handleDeleteBuilding = (slug: string) => {
    remove.mutateAsync(slug)
  }

  return {
    // delete
    deleteBuilding: handleDeleteBuilding,
    isDeleting: remove.isPending,
  }
}
