import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth";
import { veterinaryIdParamsSchema, updateVeterinarySchema } from "@/modules/veterinaries/validators";
import { veterinariesService } from "@/modules/veterinaries/services";
import { toVeterinaryResponseDto } from "@/modules/veterinaries/dtos";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";

type VeterinaryIdRouteParams = {
  params: { id: string };
};

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

export const updateVeterinaryController = async (request: NextRequest, context: VeterinaryIdRouteParams): Promise<NextResponse> => {
  await requireAuth(request);

  const paramsResult = veterinaryIdParamsSchema.safeParse(context.params);

  if (!paramsResult.success) {
    throw new AppError("Invalid veterinary id.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: paramsResult.error.flatten()
    });
  }

  const body = await parseBody(request);
  const bodyResult = updateVeterinarySchema.safeParse(body);

  if (!bodyResult.success) {
    throw new AppError("Invalid update veterinary payload.", {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: bodyResult.error.flatten()
    });
  }

  const vet = await veterinariesService.updateVeterinary(paramsResult.data.id, bodyResult.data);

  return ok("Veterinary updated successfully.", toVeterinaryResponseDto(vet));
};
