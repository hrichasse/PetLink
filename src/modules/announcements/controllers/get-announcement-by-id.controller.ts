import { NextResponse } from "next/server";

import { announcementIdParamsSchema } from "@/modules/announcements/validators";
import { announcementsService } from "@/modules/announcements/services";
import { toAnnouncementResponseDto } from "@/modules/announcements/dtos";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";

type AnnouncementIdRouteParams = {
  params: { id: string };
};

export const getAnnouncementByIdController = async (context: AnnouncementIdRouteParams): Promise<NextResponse> => {
  const validationResult = announcementIdParamsSchema.safeParse(context.params);

  if (!validationResult.success) {
    throw new AppError("Invalid announcement id.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: validationResult.error.flatten()
    });
  }

  const announcement = await announcementsService.getAnnouncementById(validationResult.data.id);

  return ok("Announcement fetched successfully.", toAnnouncementResponseDto(announcement));
};
