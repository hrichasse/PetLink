import { NextRequest, NextResponse } from "next/server";

import { bookingIdParamsSchema } from "@/modules/bookings/validators";
import { requireAuth } from "@/middleware/auth";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";
import { toBookingResponseDto } from "@/modules/bookings/dtos";
import { bookingsService } from "@/modules/bookings/services";

type BookingIdRouteParams = {
  params: {
    id: string;
  };
};

export const cancelBookingController = async (request: NextRequest, context: BookingIdRouteParams): Promise<NextResponse> => {
  const authUser = await requireAuth(request);
  const paramsValidation = bookingIdParamsSchema.safeParse(context.params);

  if (!paramsValidation.success) {
    throw new AppError("Invalid booking id.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: paramsValidation.error.flatten()
    });
  }

  const booking = await bookingsService.cancelBookingForUser(authUser.userId, paramsValidation.data.id);

  return ok("Booking cancelled successfully.", toBookingResponseDto(booking));
};