import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { relationsObj } from "./relations";
import { D1Database } from "@cloudflare/workers-types";

export function createDb(d1: D1Database) {
  return drizzle(d1, { schema: { ...schema, ...relationsObj } });
}

export type Db = ReturnType<typeof createDb>;
