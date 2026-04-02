// apps/user-app/src/app/api/account/me/route.ts
import { auth } from "@/lib/auth";
import { NotFoundError } from "@repo/services/errors";
import { handleError } from "@repo/services/handle-error";
import { headers } from "next/headers";

export async function GET() {
  try {
    const user = await auth.api.getSession({
      headers: await headers(),
    });

    if (!user?.user) throw new NotFoundError("User");

    return Response.json(
      { data: user?.user, success: true, message: "User fetched successfully" },
      {
        headers: { "Cache-Control": "private, no-store" },
      },
    );
  } catch (error) {
    return handleError(error);
  }
}
