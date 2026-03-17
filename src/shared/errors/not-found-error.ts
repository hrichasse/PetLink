import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

export class NotFoundError extends AppError {
  public constructor(message = "Resource not found.", details?: unknown) {
    super(message, {
      statusCode: HTTP_STATUS.NOT_FOUND,
      code: ERROR_CODES.RESOURCE_NOT_FOUND,
      details
    });
  }
}