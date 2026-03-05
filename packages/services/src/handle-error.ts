// packages/services/src/handle-error.ts
// import { ZodError } from "zod";
import { AppError, RateLimitError } from "./errors";

export function handleError(error: unknown): Response {
  console.error(error, "handle error here");

  if (error instanceof RateLimitError) {
    return Response.json(
      { error: error.message, code: error.code },
      {
        status: 429,
        headers: {
          ...(error.retryAfter
            ? { "Retry-After": String(error.retryAfter) }
            : {}),
        },
      },
    );
  }

  if (error instanceof AppError) {
    return Response.json(
      { error: error.message, code: error.code },
      { status: error.statusCode },
    );
  }

  //   if (error instanceof ZodError) {
  //     return Response.json(
  //       {
  //         error: "Validation failed",
  //         code: "VALIDATION_ERROR",
  //         fields: error.flatten().fieldErrors,
  //       },
  //       { status: 400 }
  //     );
  //   }

  if (error instanceof Error) {
    if (error.message.includes("UNIQUE constraint")) {
      return Response.json(
        { error: "Resource already exists", code: "CONFLICT" },
        { status: 409 },
      );
    }

    if (error.message.includes("FOREIGN KEY constraint")) {
      return Response.json(
        {
          error: "Referenced resource does not exist",
          code: "INVALID_REFERENCE",
        },
        { status: 400 },
      );
    }
  }

  return Response.json(
    { error: "Internal server error", code: "INTERNAL_ERROR" },
    { status: 500 },
  );
}
