import { NextRequest } from "next/server";

import { getMyActiveSubscriptionController } from "@/modules/subscriptions/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function GET(request: NextRequest) {
  return withErrorHandler(() => getMyActiveSubscriptionController(request));
}
