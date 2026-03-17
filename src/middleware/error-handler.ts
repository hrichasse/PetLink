import { NextResponse } from "next/server";

import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { fail } from "@/shared/responses/api-response";

type RouteHandlerResponse<T> = Promise<NextResponse<T>>;

export const withErrorHandler = async <T>(fn: () => RouteHandlerResponse<T>): Promise<NextResponse> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code, error.details, error.statusCode);
    }

    return fail(
      "Internal server error.",
      ERROR_CODES.INTERNAL_ERROR,
      process.env.NODE_ENV === "development" ? String(error) : undefined,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};