import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Db } from "@repo/db";
import * as schema from "@repo/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "./db";
import { createAuthMiddleware } from "better-auth/api";
import { getSchemaConfig, getSharedAuthOptions } from "@repo/auth/configs";

export const createAuth = (db: Db) => {
  return betterAuth({
    ...getSharedAuthOptions(
      process.env.GOOGLE_CLIENT_ID as string,
      process.env.GOOGLE_CLIENT_SECRET as string,
      process.env.NODE_ENV === "production",
    ),
    database: drizzleAdapter(db, getSchemaConfig()),
    hooks: {
      //     before: createAuthMiddleware(async (ctx) => {
      // 		// Only run on email sign-in endpoint
      // 		if (ctx.path !== "/sign-in/email") {
      // 			return;
      // 		}
      // 		const { email, password } = ctx.body as { email: string;password: string };
      // 		// Look up user in your database
      // 		const user = await db.query.users.findFirst({
      // 			where: (users, { eq }) => eq(users.email, email),
      // 		});
      // 		// If user doesn't exist, let Better Auth handle the error
      // 		if (!user) {
      // 			return;
      // 		}
      // 		// Custom validations
      // 		const errors: string[] = [];
      // 		// Check if user is admin
      // 		if (user.role !== "admin") {
      // 			errors.push("Only administrators can sign in to this portal.");
      // 		}
      // 		// Check if user belongs to a registered business
      // 		const business = await db.query.businesses.findFirst({
      // 			where: (businesses, { eq }) => eq(businesses.id, user.businessId),
      // 		});
      // 		if (!business || !business.isRegistered) {
      // 			errors.push("User must belong to a registered business.");
      // 		}
      // 		// Throw error if any checks failed
      // 		if (errors.length > 0) {
      // 			throw new APIError("UNAUTHORIZED", {
      // 				message: errors.join(" "),
      // 			});
      // 		}
      // 		// Validation passed - continue with sign-in
      // 		// Better Auth will now handle password verification
      // 	}),
      // },
      after: createAuthMiddleware(async (ctx) => {
        // Check if this is a sign-up error for existing user
        if (ctx.path === "/sign-up/email" && ctx.context.returned) {
          const error = ctx.context.returned as any;
          if (error.message?.includes("User already exists")) {
            // Return a generic response instead
            throw new Error(
              "If this email is available, a verification link has been sent.",
            );
          }
        }
      }),
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
