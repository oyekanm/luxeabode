import { getDb } from '@/lib/db'
import { CreateApartmentSchema } from '@/lib/validators/building'
import { BuildingsServerService } from '@/services/server/buildings'
import { ValidationError } from '@repo/services/errors'
import { handleError } from '@repo/services/handle-error'
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
        const response = await BuildingsServerService.getAll(db)
        return new Response(JSON.stringify(response), { status: 200 })
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const validated = CreateApartmentSchema.safeParse(body)

          const db = getDb(env.DB)

          if (!validated.success) {
            throw new ValidationError(
              'Invalid request, please fill out the required fields',
            )
          }

          await BuildingsServerService.create(validated.data, db)
          return new Response(
            JSON.stringify({ message: 'Building created successfully' }),
            { status: 201 },
          )
        } catch (error) {
          return handleError(error)
        }
      },
    },
  },
})
