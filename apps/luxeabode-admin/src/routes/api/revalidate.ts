// routes/api/revalidate.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/revalidate')({
  server: {
    handlers: {
      //   POST: async ({ request }) => {
      //     const { path, secret } = await request.json()
      //     // Verify secret token
      //     if (secret !== process.env.REVALIDATE_SECRET) {
      //       return Response.json({ error: 'Invalid token' }, { status: 401 })
      //     }
      //     // Trigger CDN purge via your CDN's API
      //     await fetch(
      //       `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`,
      //       {
      //         method: 'POST',
      //         headers: {
      //           Authorization: `Bearer ${CF_API_TOKEN}`,
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({
      //           files: [`https://yoursite.com${path}`],
      //         }),
      //       },
      //     )
      //     return Response.json({ revalidated: true })
      //   },
    },
  },
})
