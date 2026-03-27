import { getDb } from '@/lib/db'
import { createRoomSchema } from '@/lib/validators/room'
import { RoomsServerService } from '@/services/server/rooms'
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
} from '@repo/services/errors'
import { handleError } from '@repo/services/handle-error'
import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'
import { RoomsService } from '@repo/services/server/rooms'

export const Route = createFileRoute('/api/rooms')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const db = getDb(env.DB)
          const url = new URL(request.url)
          const slug = url.searchParams.get('slug')

          // TODO: add authentication check

          // single apartment building query
          if (slug) {
            const response = await RoomsService.getBySlug(db, slug)
            if (!response) throw new NotFoundError(slug)
            return new Response(
              JSON.stringify({
                data: response,
                success: true,
                message: `${response?.name} detail fetched successfully`,
              }),
              { status: 200 },
            )
          }

          const response = await RoomsService.getAll(db)
          return new Response(
            JSON.stringify({
              data: response,
              success: true,
              message: 'Rooms fetched successfully',
            }),
            { status: 200 },
          )
        } catch (error) {
          return handleError(error)
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const validated = createRoomSchema.safeParse(body)

          const db = getDb(env.DB)

          if (!validated.success) {
            throw new ValidationError(
              'Invalid request, please fill out the required fields',
            )
          }

          await RoomsServerService.create(validated.data, db)
          return new Response(
            JSON.stringify({
              message: 'Room created successfully',
              success: true,
            }),
            { status: 201 },
          )
        } catch (error) {
          return handleError(error)
        }
      },
      PUT: async ({ request }) => {
        try {
          const url = new URL(request.url)
          const slug = url.searchParams.get('slug')
          const body = await request.json()
          const validated = createRoomSchema.safeParse(body)

          const db = getDb(env.DB)
          const r2 = env.R2

          if (!slug || typeof slug !== 'string') {
            throw new BadRequestError(
              'Invalid request, please provide the building slug',
            )
          }

          if (!validated.success) {
            throw new ValidationError(
              'Invalid request, please fill out the required fields',
            )
          }

          await RoomsServerService.update(
            slug,
            validated.data,
            db,
            r2,
            env.R2_BASE_URL,
          )
          return new Response(
            JSON.stringify({
              message: 'Room updated successfully',
              success: true,
            }),
            { status: 200 },
          )
        } catch (error) {
          return handleError(error)
        }
      },
      DELETE: async ({ request }) => {
        const db = getDb(env.DB)
        const r2 = env.R2
        const url = new URL(request.url)
        const imageKey = url.searchParams.get('imageKey')
        try {
          if (imageKey) {
            if (typeof imageKey !== 'string') {
              throw new BadRequestError(
                'Invalid request, please provide the image key',
              )
            }
            await RoomsService.deleteImage(db, imageKey, r2, env.R2_BASE_URL)
            return new Response(
              JSON.stringify({
                message: 'image deleted successfully',
                success: true,
              }),
              { status: 200 },
            )
          }

          const body = await request.json()
          const { slug } = body as { slug: string }
          if (!slug || typeof slug !== 'string') {
            throw new BadRequestError(
              'Invalid request, please provide the building slug',
            )
          }

          await RoomsServerService.delete(slug, db, r2, env.R2_BASE_URL)
          return new Response(
            JSON.stringify({
              message: `${slug} deleted successfully`,
              success: true,
            }),
            { status: 200 },
          )
        } catch (error) {
          handleError(error)
        }
      },
    },
  },
})
