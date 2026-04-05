"use client";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { UserAccountClientService } from "@/services/client/userAccountClientService";
import { getClientError } from "@repo/helpers/getClientError";

export function useCurrentUser() {
  const user = useQuery({
    queryKey: ["account", "me"],
    queryFn: async () => await UserAccountClientService.getMe(),
    staleTime: 1000 * 60 * 60 * 5, // 5 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: false,
    refetchOnMount: false,
    placeholderData: (prev) => prev,
  });

  return {
    session: user.data?.data,
    error: getClientError(user.error),
  };
}
