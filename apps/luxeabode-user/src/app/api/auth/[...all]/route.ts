import { auth, createAuth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);

// create auth inside the handler — not at module level
// export async function GET(request: Request) {
//   const auth = await getAuth();
//   return auth.handler(request);
// }

// export async function POST(request: Request) {
//   const auth = await getAuth();
//   return auth.handler(request);
// }
