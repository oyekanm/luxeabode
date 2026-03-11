// // apps/luxestay-admin/src/hooks/use-permission.ts
// import { useRouteContext } from '@tanstack/react-router'
// import type { AdminPermission } from '@repo/db'

// export function usePermission() {
//   const { user } = useRouteContext({ from: '/_authenticated' })

//   const can = (permission: AdminPermission): boolean => {
//     if (!user) return false
//     if (user.role === 'super_admin') return true // super admin can do everything
//     return user.permissions?.includes(permission) ?? false
//   }

//   const canAny = (permissions: AdminPermission[]): boolean => {
//     return permissions.some(can)
//   }

//   const canAll = (permissions: AdminPermission[]): boolean => {
//     return permissions.every(can)
//   }

//   return { can, canAny, canAll, user }
// }
