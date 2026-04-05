// packages/auth/src/config.ts
import type { BetterAuthOptions } from "better-auth";
import type { DrizzleAdapterConfig } from "better-auth/adapters/drizzle";
import { users, sessions, accounts, verifications } from "@repo/db/schema";
// import { sendEmail, verifyEmailTemplate, resetPasswordTemplate } from './email'

// shared schema mapping — points better-auth to existing tables
export function getSchemaConfig(): DrizzleAdapterConfig {
  return {
    provider: "sqlite",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  };
}

// shared options that are identical across both apps
// plugins array is intentionally left out — each app adds its own
export function getSharedAuthOptions(
  clientId?: string,
  clientSecret?: string,
  secureCookies?: boolean,
): Omit<BetterAuthOptions, "database" | "plugins"> {
  return {
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      //   sendResetPassword: async ({ user, url }) => {
      //     await sendEmail({
      //       to:      user.email,
      //       subject: 'Reset your LuxeStay password',
      //       html:    resetPasswordTemplate(user.name, url),
      //     })
      //   },
    },

    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      //   sendVerificationEmail: async ({ user, url }) => {
      //     await sendEmail({
      //       to:      user.email,
      //       subject: 'Verify your LuxeStay account',
      //       html:    verifyEmailTemplate(user.name, url),
      //     })
      //   },
    },

    user: {
      fields: {
        emailVerified: "isEmailVerified",
      },
      modelName: "user",
    },

    socialProviders: {
      google: {
        clientId: clientId || "",
        clientSecret: clientSecret || "",
      },
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
      //   useSecureCookies: process.env.NODE_ENV === "production",
      useSecureCookies: secureCookies || true,
      cookiePrefix: "luxeabode",
    },
  };
}
