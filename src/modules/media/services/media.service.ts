import type { UploadedMediaFile } from "@/modules/media/types";
import { mediaRepository } from "@/modules/media/repositories";
import { storageService } from "@/modules/media/services/storage.service";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { NotFoundError } from "@/shared/errors/not-found-error";

const assertPetOwnership = async (authUserId: string, petId: string): Promise<void> => {
  const pet = await mediaRepository.findPetById(petId);

  if (!pet) {
    throw new NotFoundError("Pet not found.");
  }

  if (pet.ownerId !== authUserId) {
    throw new AppError("You do not have access to this pet.", {
      statusCode: HTTP_STATUS.FORBIDDEN,
      code: ERROR_CODES.FORBIDDEN
    });
  }
};

export const mediaService = {
  uploadPetImage: async (authUserId: string, petId: string, file: File): Promise<UploadedMediaFile> => {
    await assertPetOwnership(authUserId, petId);

    const uploaded = await storageService.uploadImage(file, `pets/${petId}`);

    await mediaRepository.createPetImageReference(petId, uploaded.publicUrl, uploaded.path);

    return uploaded;
  },

  uploadMyAvatar: async (authUserId: string, file: File): Promise<UploadedMediaFile> => {
    const profile = await mediaRepository.findUserProfileByAuthUserId(authUserId);

    if (!profile) {
      throw new NotFoundError("User profile not found.");
    }

    const uploaded = await storageService.uploadImage(file, `avatars/${authUserId}`);

    await mediaRepository.updateUserAvatar(authUserId, uploaded.publicUrl);

    return uploaded;
  }
};