import { headers } from "next/headers";

export async function getUserFromHeaders() {
  const headersList = await headers();

  const userId = headersList.get("x-user-id");
  if (!userId) return null;

  return {
    userId,
    email: headersList.get("x-user-email") ?? "",
    name: headersList.get("x-user-name") ?? "",
    role: headersList.get("x-user-role") ?? "user",
    permissions: JSON.parse(
      headersList.get("x-user-permissions") ?? "[]",
    ) as string[],
  };
}
