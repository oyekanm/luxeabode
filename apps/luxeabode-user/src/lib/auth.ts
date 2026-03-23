import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Db } from "@repo/db";

export const createAuth = (db: Db) => {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: {
        "": "",
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
  });
};
