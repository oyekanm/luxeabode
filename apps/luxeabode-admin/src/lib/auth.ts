import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [tanstackStartCookies()],
  //  advanced: {
  //   useSecureCookies: process.env.NODE_ENV === 'production',  // HTTPS only in prod
  //   cookiePrefix: 'luxestay',
  // },
  // session: {
  //   expiresIn: 60 * 60 * 24 * 7,       // 7 days
  //   updateAge: 60 * 60 * 24,
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 60 * 5,
  //   },
  // },
})
