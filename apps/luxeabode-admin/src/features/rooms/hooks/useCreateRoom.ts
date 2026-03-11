import { getClientError } from '@repo/helpers/getClientError'
import { queryKeys } from '@/lib/query-keys'
import type { CreateApartmentInput } from '@/lib/validators/building'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { RoomsClientService } from '../roomClientService'
import type { CreateRoomInput } from '@/lib/validators/room'

export default function useCreateRoom(resets: () => void) {
  const queryClient = useQueryClient()

  //   // stable references across rerenders
  const invalidateList = useMemo(
    () => () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.buildings.lists() }),
    [queryClient],
  )

  const create = useMutation({
    mutationFn: async (form: CreateRoomInput) =>
      await RoomsClientService.createRoom(form),
    onSuccess: (data) => {
      invalidateList()
      toast.success(data.message || 'Room created successfully')
      // clear form and cache
      resets()
    },
    onError: (err) => {
      const apiError = getClientError(err)
      // console.log(apiError)
      toast.error(apiError?.message || 'failed')
    },
  })

  const handleCreateRoom = async (input: CreateRoomInput) => {
    await create.mutateAsync(input)
  }

  return {
    createRoom: handleCreateRoom,
  }
}
