import { apiClient } from "@/lib/api-client";
import type { User } from "@repo/db";

export class UserAccountClientService {
  static async getMe() {
    return apiClient.get<User>(`/account/me`);
  }
}
