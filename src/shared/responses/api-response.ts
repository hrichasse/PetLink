import { NextResponse } from "next/server";

import { HTTP_STATUS } from "@/shared/constants/http-status";
import type { ApiError, ApiSuccess } from "@/shared/types/api";

type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

export const ok = <TData>(message: string, data: TData, status = HTTP_STATUS.OK): NextResponse<ApiSuccess<TData>> => {
  return NextResponse.json(
    {
      success: true,
      message,
      data
    },
    { status }
  );
};

export const fail = (
  message: string,
  errorCode: string,
  details?: unknown,
  status: HttpStatusCode = HTTP_STATUS.BAD_REQUEST
): NextResponse<ApiError> => {
  return NextResponse.json(
    {
      success: false,
      message,
      errorCode,
      details
    },
    { status }
  );
};
