import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth";
import { toSubscriptionResponseDto } from "@/modules/subscriptions/dtos";
import { subscriptionsService } from "@/modules/subscriptions/services";
import { cancelSubscriptionSchema, subscriptionIdParamsSchema } from "@/modules/subscriptions/validators";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";

type SubscriptionIdRouteParams = {
  params: {
    id: string;
  };
};

async function parseBody(request: NextRequest): Promise<unknown> {
  try {
    const rawBody = await request.text();

    if (rawBody.trim().length === 0) {
      return {};
    }

    return JSON.parse(rawBody) as unknown;
  } catch {
    throw new AppError("Request body must be valid JSON.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR
    });
  }
}

export const cancelSubscriptionController = async (
  request: NextRequest,
  context: SubscriptionIdRouteParams
): Promise<NextResponse> => {
  const authUser = await requireAuth(request);
  const paramsResult = subscriptionIdParamsSchema.safeParse(context.params);

  if (!paramsResult.success) {
    throw new AppError("Invalid subscription id.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: paramsResult.error.flatten()
    });
  }

  const body = await parseBody(request);
  const bodyResult = cancelSubscriptionSchema.safeParse(body);

  if (!bodyResult.success) {
    throw new AppError("Invalid cancel subscription payload.", {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: bodyResult.error.flatten()
    });
  }

  const subscription = await subscriptionsService.cancelSubscriptionForUser(authUser.userId, paramsResult.data.id);

  return ok("Subscription cancelled successfully.", toSubscriptionResponseDto(subscription));
};
