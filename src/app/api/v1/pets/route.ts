import { NextRequest } from "next/server";

import { createPetController, listMyPetsController } from "@/modules/pets/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function POST(request: NextRequest) {
  return withErrorHandler(() => createPetController(request));
}

export async function GET(request: NextRequest) {
  return withErrorHandler(() => listMyPetsController(request));
}