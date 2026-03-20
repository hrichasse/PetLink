import { NextRequest } from "next/server";

import { listHealthRecordsByPetController } from "@/modules/health-records/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

type PetIdRouteParams = {
  params: {
    petId: string;
  };
};

export async function GET(request: NextRequest, context: PetIdRouteParams) {
  return withErrorHandler(() => listHealthRecordsByPetController(request, context));
}