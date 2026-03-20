import { NextRequest } from "next/server";

import { createReviewController } from "@/modules/reviews/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function POST(request: NextRequest) {
  return withErrorHandler(() => createReviewController(request));
}