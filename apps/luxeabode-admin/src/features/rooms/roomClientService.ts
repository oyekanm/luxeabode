import { apiClient } from '@/lib/api-client'
import type { CreateRoomInput } from '@/lib/validators/room'
import type { Room } from '@repo/db'

export class RoomsClientService {
  static async getAll(filters?: { page?: number }) {
    const params = new URLSearchParams()
    if (filters?.page) params.set('page', filters.page.toString())
    return apiClient.get<Room[]>('/rooms')
  }

  static async getOne(slug: string) {
    return apiClient.get<Room>(`/rooms?slug=${slug}`)
  }

  static async createRoom(data: CreateRoomInput) {
    return apiClient.post<null>('/rooms', data)
  }

  static async updateRoom(slug: string, data: CreateRoomInput) {
    return apiClient.put<null>(`/rooms?slug=${slug}`, data)
  }

  static async delete(slug: string) {
    return apiClient.delete(`/rooms`, { slug })
  }
  static async deleteImage(key: string) {
    return apiClient.delete(`/rooms?imageKey=${key}`)
  }
}
