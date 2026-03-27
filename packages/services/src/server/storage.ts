// packages/services/src/storage.ts
import { AppError, NotFoundError } from "../errors";
import type { R2BucketLike } from "../types";

export type UploadResult = {
  key: string;
  url: string;
};

export function createStorageService(r2: R2BucketLike, baseUrl: string) {
  return {
    async upload(file: File, folder: string): Promise<UploadResult> {
      try {
        // file instanceof File
        const ext = file ? file.name.split(".").pop() : "jpg";
        const key = `${folder}/${crypto.randomUUID()}.${ext}`;

        await r2.put(key, file, {
          httpMetadata: {
            contentType: file.type,
            cacheControl: "public, max-age=31536000",
          },
        });

        return {
          key,
          url: `${baseUrl}/${key}`,
        };
      } catch (error) {
        throw new AppError("Failed to upload file", 500, "UPLOAD_FAILED");
      }
    },

    async delete(key: string): Promise<void> {
      try {
        const existing = await r2.head(key);
        if (!existing) throw new NotFoundError("File");
        await r2.delete(key);
      } catch (error) {
        console.log(error, "error");
        if (error instanceof NotFoundError) {
          throw error;
        }
        throw new AppError("Failed to delete file", 500, "DELETE_FAILED");
      }
    },

    async deleteMany(keys: string[]): Promise<void> {
      // R2 supports batch delete natively
      await r2.delete(keys);
    },

    getUrl(key: string): string {
      return `${baseUrl}/${key}`;
    },
  };
}

export type StorageService = ReturnType<typeof createStorageService>;
