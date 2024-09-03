import {
  UserWithSafeTimestamps,
  UserWithReviewsAndOrders,
} from "@/app/product/utils/types";

export function convertToSafeUser(
  user: UserWithReviewsAndOrders
): UserWithSafeTimestamps {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
