import { NextRequest } from "next/server";

import { getPaymentByIdController } from "@/modules/payments/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

type PaymentIdRouteParams = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: PaymentIdRouteParams) {
  return withErrorHandler(() => getPaymentByIdController(request, context));
}
