// packages/services/src/errors.ts

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

// 400
export class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400, "BAD_REQUEST");
  }
}

// 401
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

// 403
export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, 403, "FORBIDDEN");
  }
}

// 404
export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}

// 409
export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(message, 409, "CONFLICT");
  }
}

// 410
export class GoneError extends AppError {
  constructor(message = "Resource no longer available") {
    super(message, 410, "GONE");
  }
}

// 422
export class UnprocessableError extends AppError {
  constructor(message = "Unable to process request") {
    super(message, 422, "UNPROCESSABLE");
  }
}

// 429
export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    super("Too many requests", 429, "RATE_LIMITED");
    this.retryAfter = retryAfter;
  }
  retryAfter?: number;
}

// 500
export class InternalError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500, "INTERNAL_ERROR");
  }
}

// 503
export class ServiceUnavailableError extends AppError {
  constructor(service = "Service") {
    super(`${service} is currently unavailable`, 503, "SERVICE_UNAVAILABLE");
  }
}

// domain specific
export class BookingConflictError extends AppError {
  constructor() {
    super(
      "Room is not available for the selected dates",
      409,
      "BOOKING_CONFLICT",
    );
  }
}

export class PaymentFailedError extends AppError {
  constructor(reason?: string) {
    super(reason ?? "Payment could not be processed", 402, "PAYMENT_FAILED");
  }
}

export class BookingCancelledError extends AppError {
  constructor() {
    super(
      "This booking has already been cancelled",
      409,
      "BOOKING_ALREADY_CANCELLED",
    );
  }
}

export class ReviewAlreadyExistsError extends AppError {
  constructor() {
    super("You have already reviewed this booking", 409, "REVIEW_EXISTS");
  }
}

export class InvalidDateRangeError extends AppError {
  constructor() {
    super(
      "Check-out date must be after check-in date",
      400,
      "INVALID_DATE_RANGE",
    );
  }
}

export class UploadError extends AppError {
  constructor(message = "File upload failed") {
    super(message, 500, "UPLOAD_FAILED");
  }
}

export class FileTooLargeError extends AppError {
  constructor(maxMb: number) {
    super(`File exceeds maximum size of ${maxMb}MB`, 413, "FILE_TOO_LARGE");
  }
}

export class InvalidFileTypeError extends AppError {
  constructor(allowed: string[]) {
    super(
      `Invalid file type. Allowed: ${allowed.join(", ")}`,
      415,
      "INVALID_FILE_TYPE",
    );
  }
}
