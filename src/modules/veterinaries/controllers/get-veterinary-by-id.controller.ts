import { NextResponse } from "next/server";

import { veterinaryIdParamsSchema } from "@/modules/veterinaries/validators";
import { veterinariesService } from "@/modules/veterinaries/services";
import { toVeterinaryResponseDto } from "@/modules/veterinaries/dtos";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";

type VeterinaryIdRouteParams = {
  params: { id: string };
};

export const getVeterinaryByIdController = async (context: VeterinaryIdRouteParams): Promise<NextResponse> => {
  const validationResult = veterinaryIdParamsSchema.safeParse(context.params);

  if (!validationResult.success) {
    throw new AppError("Invalid veterinary id.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: validationResult.error.flatten()
    });
  }

  const vet = await veterinariesService.getVeterinaryById(validationResult.data.id);

  return ok("Veterinary fetched successfully.", toVeterinaryResponseDto(vet));
};
