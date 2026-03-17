import { NextRequest } from "next/server";

import { supabaseAdminClient } from "@/lib/supabase";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { HTTP_STATUS } from "@/shared/constants/http-status";

export type AuthContext = {
  userId: string;
  email: string | undefined;
};

export const getAuthContext = async (request: NextRequest): Promise<AuthContext> => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Token de autenticacion no proporcionado.", {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      code: ERROR_CODES.UNAUTHORIZED
    });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  const {
    data: { user },
    error
  } = await supabaseAdminClient.auth.getUser(token);

  if (error || !user) {
    throw new AppError("Token de autenticacion invalido.", {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      code: ERROR_CODES.UNAUTHORIZED,
      details: error?.message
    });
  }

  return {
    userId: user.id,
    email: user.email
  };
};
