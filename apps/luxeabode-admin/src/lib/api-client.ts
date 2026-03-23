import { ApiClient } from '@repo/services/api-client'
import { redirectTo } from './helpers/redirectTo'

export const apiClient = new ApiClient(
  `${process.env.NEXT_PUBLIC_APP_URL || ''}/api`,
  redirectTo,
)
