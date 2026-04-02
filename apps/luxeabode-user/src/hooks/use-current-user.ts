"use client";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { UserAccountClientService } from "@/services/client/userAccountClientService";
import { getClientError } from "@repo/helpers/getClientError";

export function useCurrentUser() {
  // const { data: session } = authClient.useSession();

  const user = useQuery({
    queryKey: ["account", "me"],
    queryFn: async () => await UserAccountClientService.getMe(),
    // only run when session exists — exactly what you described
    // enabled: !!session?.user,
    staleTime: 1000 * 60 * 60 * 5, // 5 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: false,
    refetchOnMount: false,
  });

  console.log(user.error);

  return {
    session: user.data?.data,
    error: getClientError(user.error),
  };
}
