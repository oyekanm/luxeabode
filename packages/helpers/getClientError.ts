import { ApiError } from "@repo/services/api-client";

//   // typed error helper so components don't cast manually
export const getClientError = (error: unknown): ApiError | null => {
  if (error instanceof ApiError) return error;

  return null;
};
