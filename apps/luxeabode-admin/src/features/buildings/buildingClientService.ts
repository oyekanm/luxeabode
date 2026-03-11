import { apiClient } from '@/lib/api-client'
import type { CreateApartmentInput } from '@/lib/validators/building'
import type { Apartment } from '@repo/db'

export class BuildingsClientService {
  static async getAll(filters?: { page?: number; isPublished?: boolean }) {
    const params = new URLSearchParams()
    if (filters?.page) params.set('page', filters.page.toString())
    if (filters?.isPublished)
      params.set('isPublished', filters.isPublished.toString())
    return apiClient.get<Apartment[]>('/buildings')
  }

  static async getOne(slug: string) {
    return apiClient.get<Apartment>(`/buildings?slug=${slug}`)
  }

  static async createBuilding(data: CreateApartmentInput) {
    return apiClient.post<CreateApartmentInput>('/buildings', data)
  }

  static async updateBuilding(slug: string, data: CreateApartmentInput) {
    return apiClient.put<CreateApartmentInput>(`/buildings?slug=${slug}`, data)
  }

  static async delete(slug: string) {
    return apiClient.delete(`/buildings`, { slug })
  }
  static async deleteImage(key: string) {
    return apiClient.delete(`/buildings?imageKey=${key}`)
  }
}
