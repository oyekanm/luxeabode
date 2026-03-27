"use client";
import { authClient } from "@/lib/auth-client";

export default function useAuth() {
  const session = authClient.useSession();
  console.log(session);
  return { session };
}
