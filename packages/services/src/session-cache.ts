// packages/services/src/session-cache.ts

import type { AdminPermission } from "@repo/db";
import type { KVNamespaceLike } from "./types";

export type CachedSession = {
  userId: string;
  role: string;
  permissions: AdminPermission[];
  email: string;
  name: string;
};

export async function cacheSession(
  kv: KVNamespaceLike,
  sessionId: string,
  user: CachedSession,
): Promise<void> {
  await kv.put(
    `session:${sessionId}`,
    JSON.stringify(user),
    { expirationTtl: 60 * 60 * 24 * 7 }, // match session expiry
  );
}

export async function getCachedSession(
  kv: KVNamespaceLike,
  sessionId: string,
): Promise<CachedSession | null> {
  const resp = await kv.get(`session:${sessionId}`, "json");
  return resp as CachedSession | null;
}

export async function invalidateSession(
  kv: KVNamespaceLike,
  sessionId: string,
): Promise<void> {
  await kv.delete(`session:${sessionId}`);
}
