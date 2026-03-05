// //   const remove = useMutation({
// //     mutationFn: (id: string) => BuildingClientService.delete(id),

// //     onMutate: async (id) => {
// //       await queryClient.cancelQueries({ queryKey: queryKeys.buildings.lists() })
// //       const previousList = queryClient.getQueryData(queryKeys.buildings.lists())

// //       queryClient.setQueriesData<{ data: Building[]; total: number }>(
// //         { queryKey: queryKeys.buildings.lists() },
// //         (old) => {
// //           if (!old?.data) return old
// //           return {
// //             ...old,
// //             data: old.data.filter((b) => b.id !== id),
// //             total: old.total - 1,
// //           }
// //         }
// //       )

// //       return { previousList }
// //     },

// //     onError: (_, __, context) => {
// //       if (context?.previousList) {
// //         queryClient.setQueriesData(
// //           { queryKey: queryKeys.buildings.lists() },
// //           context.previousList
// //         )
// //       }
// //     },

// //     onSettled: () => invalidateList(),
// //   })

//   // stable references across rerenders
//   const invalidateList = useMemo(
//     () => () => queryClient.invalidateQueries({ queryKey: queryKeys.buildings.lists() }),
//     [queryClient]
//   )

//   const invalidateDetail = useMemo(
//     () => (id: string) => queryClient.invalidateQueries({ queryKey: queryKeys.buildings.detail(id) }),
//     [queryClient]
//   )

//     // delete
//     deleteBuilding: remove.mutate,
//     isDeleting: remove.isPending,
//     deleteError: getError(remove.error),
//   }
