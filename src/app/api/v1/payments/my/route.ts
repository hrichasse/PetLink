import { NextRequest } from "next/server";

import { listMyPaymentsController } from "@/modules/payments/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function GET(request: NextRequest) {
  return withErrorHandler(() => listMyPaymentsController(request));
}
