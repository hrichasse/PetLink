import { NextRequest, NextResponse } from "next/server";

import { upsertMatchPreferenceSchema } from "@/modules/match/validators";
import { requireAuth } from "@/middleware/auth";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";
import { toMatchPreferenceResponseDto } from "@/modules/match/dtos";
import { matchService } from "@/modules/match/services";

const parseBody = async (request: NextRequest): Promise<unknown> => {
  try {
    return await request.json();
  } catch {
    throw new AppError("Request body must be valid JSON.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR
    });
  }
};

export const upsertMatchPreferenceController = async (request: NextRequest): Promise<NextResponse> => {
  const authUser = await requireAuth(request);
  const body = await parseBody(request);
  const validationResult = upsertMatchPreferenceSchema.safeParse(body);

  if (!validationResult.success) {
    throw new AppError("Invalid match preference payload.", {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: validationResult.error.flatten()
    });
  }

  const preference = await matchService.upsertPreference(authUser.userId, validationResult.data);

  return ok("Match preference saved successfully.", toMatchPreferenceResponseDto(preference));
};