import { safeUser } from "@/app/product/utils/types";
import { User } from "@prisma/client";

export function convertToSafeUser(user: User): safeUser {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
