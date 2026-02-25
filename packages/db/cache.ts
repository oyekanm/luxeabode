import type { KVNamespace } from "@cloudflare/workers-types";

// packages/db/cache.ts
export async function getCachedData<T>(
  kv: KVNamespace,
  key: string,
  fetcher: () => Promise<T>,
  ttl = 3600, // 1 hour default
): Promise<T> {
  const cached = await kv.get(key, "json");
  if (cached) return cached as T;
  const fresh = await fetcher();
  await kv.put(key, JSON.stringify(fresh), { expirationTtl: ttl });
  return fresh;
}

export async function addCachedData<T>(
  kv: KVNamespace,
  key: string,
  data: T,
  ttl = 3600,
) {
  await kv.put(key, JSON.stringify(data), { expirationTtl: ttl });
}
