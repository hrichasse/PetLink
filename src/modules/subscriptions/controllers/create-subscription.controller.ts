import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth";
import { createSubscriptionSchema } from "@/modules/subscriptions/validators";
import { subscriptionsService } from "@/modules/subscriptions/services";
import { toSubscriptionResponseDto } from "@/modules/subscriptions/dtos";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { created } from "@/shared/responses/api-response";

async function parseBody(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new AppError("Request body must be valid JSON.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR
    });
  }
}

export const createSubscriptionController = async (request: NextRequest): Promise<NextResponse> => {
  const authUser = await requireAuth(request);
  const body = await parseBody(request);
  const validationResult = createSubscriptionSchema.safeParse(body);

  if (!validationResult.success) {
    throw new AppError("Invalid create subscription payload.", {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: validationResult.error.flatten()
    });
  }

  const subscription = await subscriptionsService.createSubscription(authUser.userId, validationResult.data);

  return created("Subscription created successfully.", toSubscriptionResponseDto(subscription));
};
