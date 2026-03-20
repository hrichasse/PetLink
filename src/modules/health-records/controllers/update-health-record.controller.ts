import { NextRequest, NextResponse } from "next/server";

import { healthRecordIdParamsSchema, updateHealthRecordSchema } from "@/modules/health-records/validators";
import { requireAuth } from "@/middleware/auth";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";
import { toHealthRecordResponseDto } from "@/modules/health-records/dtos";
import { healthRecordsService } from "@/modules/health-records/services";

type HealthRecordIdRouteParams = {
  params: {
    id: string;
  };
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

export const updateHealthRecordController = async (
  request: NextRequest,
  context: HealthRecordIdRouteParams
): Promise<NextResponse> => {
  const authUser = await requireAuth(request);
  const paramsValidation = healthRecordIdParamsSchema.safeParse(context.params);

  if (!paramsValidation.success) {
    throw new AppError("Invalid health record id.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: paramsValidation.error.flatten()
    });
  }

  const body = await parseBody(request);
  const bodyValidation = updateHealthRecordSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new AppError("Invalid update health record payload.", {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: bodyValidation.error.flatten()
    });
  }

  const record = await healthRecordsService.updateHealthRecord(authUser.userId, paramsValidation.data.id, bodyValidation.data);

  return ok("Health record updated successfully.", toHealthRecordResponseDto(record));
};