import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth";
import { announcementIdParamsSchema, updateAnnouncementSchema } from "@/modules/announcements/validators";
import { announcementsService } from "@/modules/announcements/services";
import { toAnnouncementResponseDto } from "@/modules/announcements/dtos";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";

type AnnouncementIdRouteParams = {
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

export const updateAnnouncementController = async (request: NextRequest, context: AnnouncementIdRouteParams): Promise<NextResponse> => {
  const authUser = await requireAuth(request);

  const paramsResult = announcementIdParamsSchema.safeParse(context.params);

  if (!paramsResult.success) {
    throw new AppError("Invalid announcement id.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: paramsResult.error.flatten()
    });
  }

  const body = await parseBody(request);
  const bodyResult = updateAnnouncementSchema.safeParse(body);

  if (!bodyResult.success) {
    throw new AppError("Invalid update announcement payload.", {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: bodyResult.error.flatten()
    });
  }

  const announcement = await announcementsService.updateAnnouncementForAuthor(authUser.userId, paramsResult.data.id, bodyResult.data);

  return ok("Announcement updated successfully.", toAnnouncementResponseDto(announcement));
};
