import { ApiClient } from '@repo/services/api-client'

export const apiClient = new ApiClient(
  `${process.env.NEXT_PUBLIC_APP_URL || ''}/api`,
)
