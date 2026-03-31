import { NextRequest } from "next/server";

import { createCheckoutController } from "@/modules/payments/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function POST(request: NextRequest) {
  return withErrorHandler(() => createCheckoutController(request));
}
