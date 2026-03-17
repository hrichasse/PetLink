import type { UserRole } from "@prisma/client";

import type { UserProfileModel } from "@/modules/users/types";

export type UserProfileResponseDto = {
  id: string;
  userId: string;
  fullName: string;
  phone: string | null;
  avatarUrl: string | null;
  role: UserRole;
  city: string | null;
  createdAt: string;
  updatedAt: string;
};

export const toUserProfileResponseDto = (profile: UserProfileModel): UserProfileResponseDto => {
  return {
    id: profile.id,
    userId: profile.userId,
    fullName: profile.fullName,
    phone: profile.phone,
    avatarUrl: profile.avatarUrl,
    role: profile.role,
    city: profile.city,
    createdAt: profile.createdAt.toISOString(),
    updatedAt: profile.updatedAt.toISOString()
  };
};