import { supabaseAdminClient } from "@/lib/supabase";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

type InvokeEdgeFunctionOptions<TPayload> = {
  functionName: string;
  payload: TPayload;
  timeoutMs?: number;
};

type EdgeFunctionPayload =
  | string
  | File
  | Blob
  | ArrayBuffer
  | FormData
  | ReadableStream<Uint8Array>
  | Record<string, unknown>;

type EdgeFunctionErrorLike = {
  message?: string;
  context?: unknown;
};

const toErrorMessage = (functionName: string, error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as EdgeFunctionErrorLike).message;

    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }

  return `Edge function '${functionName}' failed.`;
};

export const invokeEdgeFunction = async <TPayload extends EdgeFunctionPayload | undefined, TResponse>(
  options: InvokeEdgeFunctionOptions<TPayload>
): Promise<TResponse> => {
  const { functionName, payload, timeoutMs } = options;

  const invokeOptions = timeoutMs ? { timeout: timeoutMs } : undefined;

  const { data, error } =
    payload === undefined
      ? await supabaseAdminClient.functions.invoke<TResponse>(functionName, invokeOptions)
      : await supabaseAdminClient.functions.invoke<TResponse>(functionName, {
          ...(invokeOptions ?? {}),
          body: payload
        });

  if (error) {
    throw new AppError(toErrorMessage(functionName, error), {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      code: ERROR_CODES.INTERNAL_ERROR,
      details: {
        functionName,
        error
      }
    });
  }

  if (!data) {
    throw new AppError(`Edge function '${functionName}' returned empty payload.`, {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      code: ERROR_CODES.INTERNAL_ERROR,
      details: {
        functionName
      }
    });
  }

  return data;
};