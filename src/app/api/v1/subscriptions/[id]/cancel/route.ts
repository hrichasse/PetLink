import { NextRequest } from "next/server";

import { cancelSubscriptionController } from "@/modules/subscriptions/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

type SubscriptionIdRouteParams = {
  params: {
    id: string;
  };
};

export async function PATCH(request: NextRequest, context: SubscriptionIdRouteParams) {
  return withErrorHandler(() => cancelSubscriptionController(request, context));
}
