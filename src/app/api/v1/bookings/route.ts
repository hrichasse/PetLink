import { NextRequest } from "next/server";

import { createBookingController, listMyBookingsController } from "@/modules/bookings/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function POST(request: NextRequest) {
  return withErrorHandler(() => createBookingController(request));
}

export async function GET(request: NextRequest) {
  return withErrorHandler(() => listMyBookingsController(request));
}