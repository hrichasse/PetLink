import { NextRequest } from "next/server";

import { createHealthRecordController } from "@/modules/health-records/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function POST(request: NextRequest) {
  return withErrorHandler(() => createHealthRecordController(request));
}