import {
  safeUser,
  UserWithReviewsAndOrders,
  UserWithSafeTimestamps,
} from "@/app/product/utils/types";
import { CartProduct, Review, User } from "@prisma/client";

export const calculateAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce(
    (acc: number, review: Review) => acc + review.rating,
    0
  );
  return totalRating / reviews.length;
};
export const calculateProductsAmount = (cart_products: CartProduct[]) => {
  const total = cart_products.reduce(
    (prev, current) => prev + current.price * current.selectedQuantity,
    0
  );
  return Math.ceil(total);
};
export function getErrorMessage(error: any) {
  return (
    error.response?.data?.error || error.message || "Unknown error occurred"
  );
}
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
export function truncTitle(title: string, nbrOfChars: number = 36): string {
  return title.length > nbrOfChars
    ? title.substring(0, nbrOfChars) + "..."
    : title;
}
import { SearchParams } from "@/app/product/utils/types";
import queryString from "query-string";

export const generateUrl = (
  baseUrl: string,
  queryParams: SearchParams,
  skipNull = true,
  skipEmptyString = true
) => {
  return queryString.stringifyUrl(
    {
      url: baseUrl,
      query: queryParams,
    },
    {
      skipNull: skipNull,
      skipEmptyString: skipEmptyString,
    }
  );
};
