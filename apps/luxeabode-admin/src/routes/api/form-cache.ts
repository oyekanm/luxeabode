import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'
import type { CreateApartmentInput } from '@/lib/validators/building'
import {
  addCachedData,
  deleteCachedData,
  getCachedData,
} from '@repo/services/cache'

//TODO: create a server route to get all name to check if room or apartment already exists

export const Route = createFileRoute('/api/form-cache')({
  server: {
    middleware: [],
    handlers: {
      GET: async ({ request }) => {
        try {
          const kv = env.KV
          const url = new URL(request.url)
          const searchParams = url.searchParams
          const userId = searchParams.get('userId')

          if (!userId) {
            return new Response(
              JSON.stringify({ error: 'No user id provided' }),
              { status: 400 },
            )
          }
          const cacheForm = await getCachedData<CreateApartmentInput>(
            kv,
            `form-${userId}`,
          )
          // const cacheForm = await kv.get(`form-${userId}`, 'json')

          console.log(cacheForm, 'noform')

          return new Response(JSON.stringify(cacheForm || {}), { status: 200 })
        } catch (error) {
          console.log(error, 'issue')
          return new Response(JSON.stringify({ error: 'Form not found' }), {
            status: 404,
          })
        }
      },
      POST: async ({ request }) => {
        const kv = env.KV
        const body = (await request.json()) as {
          userId: string
          values: CreateApartmentInput
        }
        const userId = body.userId

        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'No user id provided' }),
            { status: 400 },
          )
        }

        console.log(body, 'body')

        await addCachedData(kv, `form-${userId}`, body.values, 1800)
        return new Response(JSON.stringify({ success: true }), { status: 200 })
      },
      DELETE: async ({ request }) => {
        const kv = env.KV
        const url = new URL(request.url)
        const searchParams = url.searchParams
        const userId = searchParams.get('userId')

        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'No user id provided' }),
            { status: 400 },
          )
        }
        await deleteCachedData(kv, `form-${userId}`)

        return new Response(JSON.stringify({ success: true }), { status: 200 })
      },
    },
  },
})
