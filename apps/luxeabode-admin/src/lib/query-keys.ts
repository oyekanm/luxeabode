// apps/admin/src/lib/query-keys.ts
export const queryKeys = {
  buildings: {
    all: ['buildings'] as const,
    lists: () => [...queryKeys.buildings.all, 'list'] as const,
    list: (filters: object) =>
      [...queryKeys.buildings.lists(), filters] as const,
    details: () => [...queryKeys.buildings.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.buildings.details(), id] as const,
  },
  rooms: {
    all: ['rooms'] as const,
    lists: () => [...queryKeys.rooms.all, 'list'] as const,
    list: (filters: object) => [...queryKeys.rooms.lists(), filters] as const,
    byBuilding: (buildingId: string) =>
      [...queryKeys.rooms.all, buildingId] as const,
    detail: (id: string) => [...queryKeys.rooms.all, 'detail', id] as const,
  },
  bookings: {
    all: ['bookings'] as const,
    lists: () => [...queryKeys.bookings.all, 'list'] as const,
    list: (filters: object) =>
      [...queryKeys.bookings.lists(), filters] as const,
    detail: (id: string) => [...queryKeys.bookings.all, 'detail', id] as const,
  },
} as const
