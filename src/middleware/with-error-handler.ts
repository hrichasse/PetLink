import { NextResponse } from "next/server";

import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { fail } from "@/shared/responses/api-response";

export const withErrorHandler = async <T>(fn: () => Promise<NextResponse<T>>): Promise<NextResponse> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof AppError) {
      return fail(error.message, error.code, error.details, error.statusCode);
    }

    return fail("Error interno del servidor.", ERROR_CODES.INTERNAL_ERROR, undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};
