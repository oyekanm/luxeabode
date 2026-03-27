"use client";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export function useCurrentUser() {
  const { data: session } = authClient.useSession();

  return useQuery({
    queryKey: ["account", "me"],
    queryFn: () => fetch("/api/account/me").then((r) => r.json()),
    // only run when session exists — exactly what you described
    enabled: !!session?.user,
    staleTime: 1000 * 60 * 10, // 10 mins — KV handles freshness server-side
  });
}
