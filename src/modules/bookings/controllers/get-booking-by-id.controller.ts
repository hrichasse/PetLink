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

export const getBookingByIdController = async (request: NextRequest, context: BookingIdRouteParams): Promise<NextResponse> => {
  const authUser = await requireAuth(request);
  const validationResult = bookingIdParamsSchema.safeParse(context.params);

  if (!validationResult.success) {
    throw new AppError("Invalid booking id.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: validationResult.error.flatten()
    });
  }

  const booking = await bookingsService.getBookingByIdForUser(authUser.userId, validationResult.data.id);

  return ok("Booking fetched successfully.", toBookingResponseDto(booking));
};