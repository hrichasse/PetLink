export type ApiSuccess<TData> = {
  success: true;
  message: string;
  data: TData;
};

export type ApiError = {
  success: false;
  message: string;
  errorCode: string;
  details?: unknown;
};

export type ApiResponse<TData> = ApiSuccess<TData> | ApiError;
