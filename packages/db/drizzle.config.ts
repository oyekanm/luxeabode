import { defineConfig } from "drizzle-kit";

// config({ path: ['.env.local', '.env'] })

export default defineConfig({
  out: "./drizzle",
  schema: "./schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
});
