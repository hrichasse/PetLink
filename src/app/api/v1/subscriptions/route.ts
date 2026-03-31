import { NextRequest } from "next/server";

import { createSubscriptionController } from "@/modules/subscriptions/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function POST(request: NextRequest) {
  return withErrorHandler(() => createSubscriptionController(request));
}
