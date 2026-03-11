import { queryKeys } from '@/lib/query-keys'
import type { CreateApartmentInput } from '@/lib/validators/building'
import { getClientError } from '@repo/helpers/getClientError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { BuildingsClientService } from '../buildingClientService'

interface EditProps {
  slug: string
  input: CreateApartmentInput
}

export default function useEditBuilding(resets: () => void) {
  const queryClient = useQueryClient()
  const handleDeleteImage = async (
    key: string,
    removeKey: (key: string) => void,
  ) => {
    try {
      const response = await BuildingsClientService.deleteImage(key)

      if (response.success) {
        toast.success(response.message || 'Image deleted successfully')
        removeKey(key)
      }
    } catch (error: any) {
      // console.error('Delete failed:', error)
      const clientError = getClientError(error)
      toast.error(clientError?.message || 'Failed to delete image')
    }
  }

  const invalidateList = useMemo(
    () => () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.buildings.lists() }),
    [queryClient],
  )

  const invalidateDetail = useMemo(
    () => (id: string) =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.buildings.detail(id),
      }),
    [queryClient],
  )

  const update = useMutation({
    mutationFn: async ({ slug, input }: EditProps) =>
      await BuildingsClientService.updateBuilding(slug, input),

    onSuccess(data) {
      // console.log(data, variables, onMutateResult, context)
      if (data.success) {
        toast.success(data.message || 'Building updated successfully')
        resets()
      }
    },

    onError: (error) => {
      const clientError = getClientError(error)
      toast.error(clientError?.message || 'Failed to edit building')
    },

    onSettled: (_, __, { slug }) => {
      invalidateDetail(slug)
      invalidateList()
    },
  })
  return { handleDeleteImage, editApartment: update.mutateAsync }
}
