import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Db } from "@repo/db";
import * as schema from "@repo/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "./db";

export const createAuth = (db: Db) => {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: {
        ...schema,
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
      },
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    user: {
      fields: {
        emailVerified: "isEmailVerified",
      },
      modelName: "user",
    },

    session: {
      expiresIn: 60 * 60 * 24 * 3,
      updateAge: 60 * 60 * 24,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 60,
      },
    },

    advanced: {
      useSecureCookies: process.env.NODE_ENV === "production",
      cookiePrefix: "luxeabode",
    },
    plugins: [nextCookies()],
  });
};

function getAuth() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  return createAuth(db);
}

// // For direct imports (API routes)
export const auth = getAuth();
