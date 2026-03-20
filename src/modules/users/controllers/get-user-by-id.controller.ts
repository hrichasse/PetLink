import { NextResponse } from "next/server";

import { toPublicUserProfileResponseDto } from "@/modules/users/dtos";
import { usersService } from "@/modules/users/services";
import { getUserByIdParamsSchema } from "@/modules/users/validators";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";

type UserIdRouteParams = {
  params: {
    id: string;
  };
};

export const getUserByIdController = async ({ params }: UserIdRouteParams): Promise<NextResponse> => {
  const validationResult = getUserByIdParamsSchema.safeParse(params);

  if (!validationResult.success) {
    throw new AppError("Invalid user id.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: validationResult.error.flatten()
    });
  }

  const profile = await usersService.getProfileById(validationResult.data.id);

  return ok("User profile fetched successfully.", toPublicUserProfileResponseDto(profile));
};