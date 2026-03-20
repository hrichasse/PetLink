import { NextRequest } from "next/server";

import { deleteHealthRecordController, updateHealthRecordController } from "@/modules/health-records/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

type HealthRecordIdRouteParams = {
  params: {
    id: string;
  };
};

export async function PATCH(request: NextRequest, context: HealthRecordIdRouteParams) {
  return withErrorHandler(() => updateHealthRecordController(request, context));
}

export async function DELETE(request: NextRequest, context: HealthRecordIdRouteParams) {
  return withErrorHandler(() => deleteHealthRecordController(request, context));
}