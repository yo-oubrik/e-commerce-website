import { Order, Product, Review, User } from "@prisma/client";

export type ProductImage = {
  color: string;
  colorCode: string;
  imageUrl: string;
};

export interface safeUser extends Omit<User, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

export type SearchParams = {
  category?: string | null;
  search?: string | null;
};
export type ProductWithReviews = Product & {
  reviews: Review[];
};
export type UserWithReviewsAndOrders = User & { reviews: Review[] } & {
  orders: Order[];
};

export type UserWithSafeTimestamps = Omit<
  UserWithReviewsAndOrders,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};
