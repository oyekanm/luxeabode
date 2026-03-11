import { queryKeys } from '@/lib/query-keys'
import type { CreateRoomInput } from '@/lib/validators/room'
import { getClientError } from '@repo/helpers/getClientError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { RoomsClientService } from '../roomClientService'

interface EditProps {
  slug: string
  input: CreateRoomInput
}

export default function useEditBuilding(resets: () => void) {
  const queryClient = useQueryClient()

  const handleDeleteImage = async (
    key: string,
    removeKey: (key: string) => void,
  ) => {
    try {
      const response = await RoomsClientService.deleteImage(key)

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

  const update = useMutation({
    mutationFn: async ({ slug, input }: EditProps) =>
      await RoomsClientService.updateRoom(slug, input),

    onSuccess(data) {
      if (data.success) {
        toast.success(data.message || 'Room updated successfully')
        resets()
      }
    },

    onError: (error) => {
      const clientError = getClientError(error)
      toast.error(clientError?.message || 'Failed to edit room')
    },

    onSettled: (_, __, { slug }) => {
      invalidateDetail(slug)
      invalidateList()
    },
  })
  return { handleDeleteImage, editRoom: update.mutateAsync }
}
