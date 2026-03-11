import { getClientError } from '@repo/helpers/getClientError'
import { queryKeys } from '@/lib/query-keys'
import type { CreateApartmentInput } from '@/lib/validators/building'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { BuildingsClientService } from '../buildingClientService'

export default function useCreateBuilding() {
  const queryClient = useQueryClient()

  //   // stable references across rerenders
  const invalidateList = useMemo(
    () => () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.buildings.lists() }),
    [queryClient],
  )

  const createCategories = async (
    form: CreateApartmentInput,
    resets: () => void,
  ) => {
    try {
      const resp = await BuildingsClientService.createBuilding(form)
      // console.log(resp)
      // if (resp.error) throw new Error(resp.error || "Error fetching data");
      toast.success(resp.message || 'Building created successfully')
      // clear form and cache
      resets()
    } catch (error: any) {
      const apiError = getClientError(error)
      // console.log(apiError)
      toast.error(apiError?.message || 'failed')
    }
  }

  const create = useMutation({
    mutationFn: (v: { form: CreateApartmentInput; resets: () => void }) =>
      createCategories(v.form, v.resets),
    onSuccess: () => invalidateList(),
    // onMutate: async (newCate) => {
    //   await queryClient.cancelQueries({ queryKey: ['categories'] })
    //   const previousPosts = queryClient.getQueryData(['categories'])
    //   queryClient.setQueryData(['categories'], (old: Category[]) => [
    //     {
    //       id: Date.now(),
    //       ...newCate,
    //       subCategories: [],
    //       slug: slugify(newCate.name),
    //       _count: {
    //         products: 0,
    //         subcategories: 0,
    //       },
    //     },
    //     ...old,
    //   ])
    //   return { previousPosts }
    // },
    // onError: (err, newCate, context) => {
    //   queryClient.setQueryData(['categories'], context?.previousPosts)
    // },
  })

  const handleCreateBuilding = async (
    input: CreateApartmentInput,
    resets: () => void,
  ) => {
    await create.mutateAsync({ form: input, resets })
  }

  return {
    createBuilding: handleCreateBuilding,
    isCreating: create.isPending,
    createError: getClientError(create.error),
  }
}
