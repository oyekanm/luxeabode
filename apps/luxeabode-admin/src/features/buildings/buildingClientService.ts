import { apiClient } from '@/lib/api-client'
import type { CreateApartmentInput } from '@/lib/validators/building'

export class BuildingsClientService {
  static async getAll(filters?: { page?: number; isPublished?: boolean }) {
    const params = new URLSearchParams()
    if (filters?.page) params.set('page', filters.page.toString())
    if (filters?.isPublished)
      params.set('isPublished', filters.isPublished.toString())
    return apiClient.get('/buildings')
  }

  static async getOne(id: string) {
    return apiClient.get(`/buildings/${id}`)
  }

  static async createBuilding(data: CreateApartmentInput) {
    return apiClient.post<CreateApartmentInput>('/buildings', data)
  }

  static async updateBuilding(id: string, data: CreateApartmentInput) {
    return apiClient.put<CreateApartmentInput>(`/buildings/${id}`, data)
  }

  static async delete(id: string) {
    return apiClient.delete(`/buildings/${id}`)
  }
}
