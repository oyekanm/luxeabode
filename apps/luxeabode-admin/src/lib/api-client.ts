import type { ApiResponse } from '@repo/services/types'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl || '/api'
  }

  private async request<T>(
    endpoint: string,
    token?: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    const json: ApiResponse<T> = await response.json()

    // console.log(json, 'json')

    // throw when server returns error
    if (!response.ok || !json.success) {
      throw new ApiError(
        json.error ?? 'Something went wrong',
        response.status,
        json.code ?? 'UNKNOWN_ERROR',
      )
    }

    // return only the data, not the whole wrapper
    return {
      data: json.data,
      success: json.success,
      status: json.status,
      message: json.message,
    }
  }

  async get<T>(endpoint: string, data?: any, options?: RequestInit) {
    return this.request<T>(endpoint, '', {
      method: 'GET',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit) {
    // console.log("api client",data)
    return this.request<T>(endpoint, '', {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      // body: data,
      ...options,
    })
  }

  async put<T>(
    endpoint: string,
    data?: any,
    token?: string,
    options?: RequestInit,
  ) {
    return this.request<T>(endpoint, token, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }
  async patch<T>(
    endpoint: string,
    data?: any,
    token?: string,
    options?: RequestInit,
  ) {
    return this.request<T>(endpoint, token, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  async delete<T>(endpoint: string, token?: string, options?: RequestInit) {
    return this.request<T>(endpoint, token, { method: 'DELETE', ...options })
  }
}

export const apiClient = new ApiClient(
  `${process.env.NEXT_PUBLIC_APP_URL || ''}/api`,
)
// TODO:add full url for api calls
// export const apiClient = new ApiClient(``);

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// if (error) {
//   // error is the ApiError object you threw
//   const apiError = error as ApiError
//   console.log(apiError.message)  // "Building not found"
//   console.log(apiError.status)   // 404
//   console.log(apiError.code)     // "NOT_FOUND"

//   // now you can show different UI based on the error type
//   if (apiError.status === 404) return <NotFoundMessage />
//   if (apiError.status === 401) return <LoginPrompt />
//   if (apiError.status === 500) return <ServerErrorMessage />
// }
