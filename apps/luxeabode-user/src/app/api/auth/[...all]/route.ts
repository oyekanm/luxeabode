import { toNextJsHandler } from "better-auth/next-js";
import { createAuth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";

function getAuth() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  return createAuth(db);
}

export const { POST, GET } = toNextJsHandler(getAuth());
