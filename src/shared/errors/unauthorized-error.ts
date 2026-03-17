import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

export class UnauthorizedError extends AppError {
  public constructor(message = "Unauthorized.", details?: unknown) {
    super(message, {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      code: ERROR_CODES.UNAUTHORIZED,
      details
    });
  }
}