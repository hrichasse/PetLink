import { NextRequest, NextResponse } from "next/server";

import { createHealthRecordSchema } from "@/modules/health-records/validators";
import { requireAuth } from "@/middleware/auth";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { created } from "@/shared/responses/api-response";
import { toHealthRecordResponseDto } from "@/modules/health-records/dtos";
import { healthRecordsService } from "@/modules/health-records/services";

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

export const createHealthRecordController = async (request: NextRequest): Promise<NextResponse> => {
  const authUser = await requireAuth(request);
  const body = await parseBody(request);
  const validationResult = createHealthRecordSchema.safeParse(body);

  if (!validationResult.success) {
    throw new AppError("Invalid create health record payload.", {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: validationResult.error.flatten()
    });
  }

  const record = await healthRecordsService.createHealthRecord(authUser.userId, validationResult.data);

  return created("Health record created successfully.", toHealthRecordResponseDto(record));
};