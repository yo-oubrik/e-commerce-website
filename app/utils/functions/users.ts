import {
  safeUser,
  UserWithReviewsAndOrders,
  UserWithSafeTimestamps,
} from "@/app/product/utils/types";
import { User } from "@prisma/client";

export function convertToSafeUser(
  user: UserWithReviewsAndOrders
): UserWithSafeTimestamps {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
export const convertToSafeUsers = (...users: User[]): safeUser[] => {
  return users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));
};
