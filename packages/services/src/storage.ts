// // packages/services/src/storage.ts
// import { R2Bucket } from "@cloudflare/workers-types";
// import { AppError } from "./errors";

// export type UploadResult = {
//   key: string;
//   url: string;
// };

// export function createStorageService(r2: R2Bucket, baseUrl: string) {
//   return {
//     async upload(
//       //   file: File | Blob,
//       file: File,
//       folder: string,
//       filename?: string,
//     ): Promise<UploadResult> {
//       try {
//         // file instanceof File
//         const ext = file ? file.name.split(".").pop() : "jpg";
//         const key = `${folder}/${crypto.randomUUID()}.${ext}`;

//         await r2.put(key, file, {
//           httpMetadata: {
//             contentType: file.type,
//             cacheControl: "public, max-age=31536000",
//           },
//         });

//         return {
//           key,
//           url: `${baseUrl}/${key}`,
//         };
//       } catch (error) {
//         throw new AppError("Failed to upload file", 500, "UPLOAD_FAILED");
//       }
//     },

//     async delete(key: string): Promise<void> {
//       try {
//         await r2.delete(key);
//       } catch (error) {
//         throw new AppError("Failed to delete file", 500, "DELETE_FAILED");
//       }
//     },

//     getUrl(key: string): string {
//       return `${baseUrl}/${key}`;
//     },
//   };
// }

// export type StorageService = ReturnType<typeof createStorageService>;
