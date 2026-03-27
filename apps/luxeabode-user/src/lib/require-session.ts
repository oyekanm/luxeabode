import { headers } from "next/headers";
import { auth } from "./auth";
import { UnauthorizedError } from "@repo/services/errors";

export async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new UnauthorizedError("You are not Authorized");
  }
  return session;
}
