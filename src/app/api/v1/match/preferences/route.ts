import { NextRequest } from "next/server";

import { upsertMatchPreferenceController } from "@/modules/match/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function POST(request: NextRequest) {
  return withErrorHandler(() => upsertMatchPreferenceController(request));
}