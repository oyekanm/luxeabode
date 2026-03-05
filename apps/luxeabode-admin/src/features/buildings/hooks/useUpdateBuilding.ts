//     updateBuilding: update.mutate,
//     updateAsync: update.mutateAsync,
//     isUpdating: update.isPending,
//     updateError: getError(update.error),

//   // stable references across rerenders
//   const invalidateList = useMemo(
//     () => () => queryClient.invalidateQueries({ queryKey: queryKeys.buildings.lists() }),
//     [queryClient]
//   )

//   const invalidateDetail = useMemo(
//     () => (id: string) => queryClient.invalidateQueries({ queryKey: queryKeys.buildings.detail(id) }),
//     [queryClient]
//   )

// //   const update = useMutation({
// //     mutationFn: ({ id, input }: { id: string; input: UpdateBuildingInput }) =>
// //       BuildingClientService.update(id, input),

// //     onMutate: async ({ id, input }) => {
// //       await queryClient.cancelQueries({ queryKey: queryKeys.buildings.detail(id) })
// //       const previous = queryClient.getQueryData<Building>(queryKeys.buildings.detail(id))

// //       queryClient.setQueryData(queryKeys.buildings.detail(id), (old: Building) => ({
// //         ...old,
// //         ...input,
// //       }))

// //       queryClient.setQueriesData<{ data: Building[] }>(
// //         { queryKey: queryKeys.buildings.lists() },
// //         (old) => {
// //           if (!old?.data) return old
// //           return {
// //             ...old,
// //             data: old.data.map((b) => (b.id === id ? { ...b, ...input } : b)),
// //           }
// //         }
// //       )

// //       return { previous, id }
// //     },

// //     onError: (_, __, context) => {
// //       if (context?.previous && context?.id) {
// //         queryClient.setQueryData(
// //           queryKeys.buildings.detail(context.id),
// //           context.previous
// //         )
// //       }
// //     },

// //     onSettled: (_, __, { id }) => {
// //       invalidateDetail(id)
// //       invalidateList()
// //     },
// //   })
