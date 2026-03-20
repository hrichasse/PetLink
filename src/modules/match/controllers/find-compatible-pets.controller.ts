import { NextRequest, NextResponse } from "next/server";

import { findCompatiblePetsQuerySchema } from "@/modules/match/validators";
import { requireAuth } from "@/middleware/auth";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";
import { toCompatiblePetResponseDto } from "@/modules/match/dtos";
import { matchService } from "@/modules/match/services";

export const findCompatiblePetsController = async (request: NextRequest): Promise<NextResponse> => {
  const authUser = await requireAuth(request);
  const rawQuery = Object.fromEntries(request.nextUrl.searchParams.entries());
  const validationResult = findCompatiblePetsQuerySchema.safeParse(rawQuery);

  if (!validationResult.success) {
    throw new AppError("Invalid match query.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: validationResult.error.flatten()
    });
  }

  const matches = await matchService.findCompatiblePets(authUser.userId, validationResult.data);

  return ok(
    "Compatible pets fetched successfully for responsible breeding guidance.",
    matches.map((match) => {
      return toCompatiblePetResponseDto(match);
    })
  );
};