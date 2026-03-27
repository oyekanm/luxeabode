// apps/admin/src/routes/api/upload/index.ts
import { BadRequestError } from '@repo/services/errors'
import { handleError } from '@repo/services/handle-error'
import { createStorageService } from '@repo/services/server/storage'
import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/api/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          //   if (!context.user) throw new UnauthorizedError();

          const formData = await request.formData()
          const file = formData.get('file') as File
          const folder = (formData.get('folder') as string) ?? 'general'

          if (!file) {
            return Response.json(
              { error: 'No file provided', code: 'NO_FILE' },
              { status: 400 },
            )
          }

          // baseUrl comes from env so it differs between local and production
          const storage = createStorageService(env.R2, env.R2_BASE_URL)
          const result = await storage.upload(file, folder)

          return Response.json(result, { status: 201 })
        } catch (error) {
          return handleError(error)
        }
      },
      DELETE: async ({ request }) => {
        try {
          // if (!context.user) throw new UnauthorizedError();

          const body = await request.json()
          const { key } = body as { key: string }

          console.log(key, 'key')

          if (!key || typeof key !== 'string') {
            throw new BadRequestError(
              'File key is required and must be a string',
            )
          }
          // if (!key) throw new Error('File key is required')

          const storage = createStorageService(env.R2, env.R2_BASE_URL)
          await storage.delete(key)

          return Response.json(
            { success: true, message: 'File deleted successfully' },
            { status: 200 },
          )
        } catch (error) {
          return handleError(error)
          // console.log(error, 'errors here')
        }
      },
    },
  },
})
