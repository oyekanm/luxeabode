// apps/admin/src/routes/api/upload/index.ts
import { createStorageService } from '@repo/services/storage'
// import { UnauthorizedError } from "@repo/services/errors";
// import { handleError } from "@repo/services/handle-error";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/upload')({
  server: {
    handlers: {
      POST: async ({ request, context }) => {
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
          const storage = createStorageService(
            context.env.R2,
            context.env.R2_BASE_URL,
          )
          const result = await storage.upload(file, folder)

          return Response.json(result, { status: 201 })
        } catch (error) {
          //   return handleError(error);
        }
      },
    },
  },
})
