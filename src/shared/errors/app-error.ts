import { HTTP_STATUS } from "@/shared/constants/http-status";
import type { HttpStatusCode } from "@/shared/constants/http-status";
import type { ErrorCode } from "@/shared/errors/error-codes";

type AppErrorOptions = {
  statusCode?: HttpStatusCode;
  code?: ErrorCode;
  details?: unknown;
};

export class AppError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly code: ErrorCode;
  public readonly details?: unknown;

  public constructor(message: string, options: AppErrorOptions = {}) {
    super(message);
    this.name = "AppError";
    this.statusCode = options.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    this.code = options.code ?? "INTERNAL_ERROR";
    this.details = options.details;
  }
}
