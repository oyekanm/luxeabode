import { createFileRoute } from '@tanstack/react-router'
import { createDb } from '@repo/db/client'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/api/buildings/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const db = createDb(env.DB)

        return new Response(JSON.stringify('cachedData'), {
          headers: { 'Content-Type': 'application/json' },
        })
      },
    },
  },
})
