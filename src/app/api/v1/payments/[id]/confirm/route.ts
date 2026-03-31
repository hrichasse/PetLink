import { NextRequest } from "next/server";

import { confirmPaymentController } from "@/modules/payments/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

type PaymentIdRouteParams = {
  params: {
    id: string;
  };
};

export async function POST(request: NextRequest, context: PaymentIdRouteParams) {
  return withErrorHandler(() => confirmPaymentController(request, context));
}
