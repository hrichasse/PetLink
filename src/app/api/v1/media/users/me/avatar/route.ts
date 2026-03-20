import { NextRequest } from "next/server";

import { uploadMyAvatarController } from "@/modules/media/controllers";
import { withErrorHandler } from "@/middleware/error-handler";

export async function POST(request: NextRequest) {
  return withErrorHandler(() => uploadMyAvatarController(request));
}