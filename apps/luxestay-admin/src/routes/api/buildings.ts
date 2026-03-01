import { getDb } from '@/lib/db'
import { CreateApartmentSchema } from '@/lib/validators/building'
import { BuildingsServerService } from '@/services/server/buildings'
import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/api/buildings')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // TODO: add authentication check

        const db = getDb(env.DB)
        const r2 = env.R2
        const apartments = await db.query.apartments.findMany({
          with: {
            images: true,
          },
        })
        const kv = env.KV
        return new Response('Hello, World!')
      },
      POST: async ({ request, context }) => {
        const body = await request.json()
        const validated = CreateApartmentSchema.safeParse(body)

        const db = getDb(env.DB)

        if (!validated.success) {
          return new Response('Invalid request', { status: 400 })
        }

        // const response = await BuildingsServerService.create(validated.data, db)
        return new Response(JSON.stringify('response'), { status: 201 })
      },
    },
  },
})
