import { safeUser } from "@/app/product/utils/types";
import { User } from "@prisma/client";

export const convertToSafeUsers = (...users: User[]): safeUser[] => {
  return users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));
};
