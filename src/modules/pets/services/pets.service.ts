import type { CreatePetDto, UpdatePetDto } from "@/modules/pets/dtos";
import { petsRepository } from "@/modules/pets/repositories";
import type { PetModel } from "@/modules/pets/types";
import { HTTP_STATUS } from "@/shared/constants/http-status";
import { AppError } from "@/shared/errors/app-error";
import { ERROR_CODES } from "@/shared/errors/error-codes";
import { NotFoundError } from "@/shared/errors/not-found-error";

const PET_NOT_FOUND_MESSAGE = "Pet not found.";
const PET_FORBIDDEN_MESSAGE = "You do not have access to this pet.";

const ensureOwnerAccess = (pet: PetModel, authUserId: string): void => {
  if (pet.ownerId !== authUserId) {
    throw new AppError(PET_FORBIDDEN_MESSAGE, {
      statusCode: HTTP_STATUS.FORBIDDEN,
      code: ERROR_CODES.FORBIDDEN
    });
  }
};

export const petsService = {
  createPet: (authUserId: string, payload: CreatePetDto): Promise<PetModel> => {
    return petsRepository.create(authUserId, payload);
  },

  listAuthenticatedUserPets: (authUserId: string): Promise<PetModel[]> => {
    return petsRepository.findManyByOwnerId(authUserId);
  },

  getPetByIdForUser: async (authUserId: string, petId: string): Promise<PetModel> => {
    const pet = await petsRepository.findById(petId);

    if (!pet) {
      throw new NotFoundError(PET_NOT_FOUND_MESSAGE);
    }

    ensureOwnerAccess(pet, authUserId);

    return pet;
  },

  updatePetForUser: async (authUserId: string, petId: string, payload: UpdatePetDto): Promise<PetModel> => {
    await petsService.getPetByIdForUser(authUserId, petId);

    return petsRepository.updateById(petId, payload);
  },

  deletePetForUser: async (authUserId: string, petId: string): Promise<void> => {
    await petsService.getPetByIdForUser(authUserId, petId);
    await petsRepository.deleteById(petId);
  }
};