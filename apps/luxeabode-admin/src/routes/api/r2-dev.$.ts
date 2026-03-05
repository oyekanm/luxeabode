// This entire route only exists in development

import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/api/r2-dev/$')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        // this route should never be reachable in production
        if (process.env.NODE_ENV === 'production') {
          return new Response('Not found', { status: 404 })
        }

        try {
          const key = params._splat // everything after /api/r2-dev/
          const object = await env.R2.get(key!)

          if (!object) {
            return new Response('Not found', { status: 404 })
          }

          const headers = new Headers()
          object.writeHttpMetadata(headers)
          headers.set('etag', object.httpEtag)
          headers.set('cache-control', 'no-store')

          return new Response(object.body, { headers })
        } catch {
          return new Response('Error reading file', { status: 500 })
        }
      },
    },
  },
})
