// apps/user-app/src/app/api/account/me/route.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { requireSession } from "@/lib/get-session";
import { createDb } from "@repo/db";
import { handleError } from "@repo/services/handle-error";
import { UnauthorizedError } from "@repo/services/errors";

const CACHE_TTL = 60 * 60; // 1 hour — matches cookie cache

export async function GET() {
  try {
    const session = await requireSession();
    const { env } = await getCloudflareContext();

    const cacheKey = `user:${session.user.id}`;

    // check KV first
    const cached = (await env.KV.get(cacheKey, "json")) as UserProfile | null;

    if (cached) {
      return Response.json(cached, {
        headers: {
          // private — never cache user data at edge
          "Cache-Control": "private, no-store",
        },
      });
    }

    // KV miss — fetch from DB
    const db = createDb(env.DB);
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
      columns: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
        // never return hashedPassword
        hashedPassword: false,
      },
    });

    if (!user) throw new UnauthorizedError();

    // write to KV for next request
    await env.KV.put(cacheKey, JSON.stringify(user), {
      expirationTtl: CACHE_TTL,
    });

    return Response.json(user, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    return handleError(error);
  }
}
