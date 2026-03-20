import { NextRequest } from "next/server";

import { findCompatiblePetsController } from "@/modules/match/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function GET(request: NextRequest) {
  return withErrorHandler(() => findCompatiblePetsController(request));
}