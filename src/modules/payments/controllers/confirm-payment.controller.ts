import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth";
import { confirmPaymentSchema, paymentIdParamsSchema } from "@/modules/payments/validators";
import { paymentsService } from "@/modules/payments/services";
import { toPaymentResponseDto } from "@/modules/payments/dtos";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { ok } from "@/shared/responses/api-response";

type PaymentIdRouteParams = {
  params: {
    id: string;
  };
};

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

export const confirmPaymentController = async (
  request: NextRequest,
  context: PaymentIdRouteParams
): Promise<NextResponse> => {
  const authUser = await requireAuth(request);
  const paramsResult = paymentIdParamsSchema.safeParse(context.params);

  if (!paramsResult.success) {
    throw new AppError("Invalid payment id.", {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: paramsResult.error.flatten()
    });
  }

  const body = await parseBody(request);
  const validationResult = confirmPaymentSchema.safeParse(body);

  if (!validationResult.success) {
    throw new AppError("Invalid confirm payment payload.", {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: ERROR_CODES.VALIDATION_ERROR,
      details: validationResult.error.flatten()
    });
  }

  const payment = await paymentsService.confirmPaymentForUser(authUser.userId, paramsResult.data.id, validationResult.data);

  return ok("Payment confirmed successfully.", toPaymentResponseDto(payment));
};
