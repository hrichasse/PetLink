import { NextRequest, NextResponse } from "next/server";

import { listBookingsQuerySchema } from "@/modules/bookings/validators";
import { requireAuth } from "@/middleware/auth";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";
import { toBookingResponseDto } from "@/modules/bookings/dtos";
import { bookingsService } from "@/modules/bookings/services";

export const listMyBookingsController = async (request: NextRequest): Promise<NextResponse> => {
  const authUser = await requireAuth(request);
  const rawQuery = Object.fromEntries(request.nextUrl.searchParams.entries());
  const validationResult = listBookingsQuerySchema.safeParse(rawQuery);

  if (!validationResult.success) {
    throw new AppError("Invalid booking filters.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: validationResult.error.flatten()
    });
  }

  const bookings = await bookingsService.listMyBookings(authUser.userId, validationResult.data);

  return ok(
    "Bookings fetched successfully.",
    bookings.map((booking) => {
      return toBookingResponseDto(booking);
    })
  );
};