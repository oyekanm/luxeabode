import type { KVNamespaceLike } from "./types";

// packages/db/cache.ts
export async function getCachedData<T>(
  kv: KVNamespaceLike,
  key: string,
): Promise<T | null> {
  const cached = await kv.get(key, "json");
  if (cached) return cached as T;
  return null;
  // const fresh = await fetcher();
  // await kv.put(key, JSON.stringify(fresh), { expirationTtl: ttl });
  // return fresh;
}

export async function addCachedData<T>(
  kv: KVNamespaceLike,
  key: string,
  data: T,
  ttl = 3600,
) {
  await kv.put(key, JSON.stringify(data), { expirationTtl: ttl });
}

export async function deleteCachedData(kv: KVNamespaceLike, key: string) {
  await kv.delete(key);
}
