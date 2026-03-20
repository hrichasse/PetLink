import { supabaseAdminClient } from "@/lib/supabase";
import type { UploadedMediaFile } from "@/modules/media/types";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";

const MEDIA_BUCKET = process.env.SUPABASE_STORAGE_MEDIA_BUCKET ?? "petlink-media";

const sanitizeFileName = (fileName: string): string => {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
};

const buildStoragePath = (folder: string, fileName: string): string => {
  const timestamp = Date.now();
  return `${folder}/${timestamp}-${sanitizeFileName(fileName)}`;
};

export const storageService = {
  uploadImage: async (file: File, folder: string): Promise<UploadedMediaFile> => {
    const fileName = sanitizeFileName(file.name || "image");
    const path = buildStoragePath(folder, fileName);
    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabaseAdminClient.storage.from(MEDIA_BUCKET).upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: false
    });

    if (error) {
      throw new AppError("Failed to upload file to storage.", {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        code: ERROR_CODES.INTERNAL_ERROR,
        details: error.message
      });
    }

    const {
      data: { publicUrl }
    } = supabaseAdminClient.storage.from(MEDIA_BUCKET).getPublicUrl(path);

    return {
      bucket: MEDIA_BUCKET,
      path,
      publicUrl,
      contentType: file.type,
      size: file.size,
      fileName
    };
  }
};