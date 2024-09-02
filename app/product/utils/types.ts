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

export type fullSafeUser = Omit<
  UserWithReviews & UserWithOrders,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};

export type SearchParams = {
  category?: string | null;
  search?: string | null;
};
export type ProductWithReviews = Product & {
  reviews: Review[];
};
export type UserWithOrders = User & { orders: Order[] };
export type UserWithReviews = User & { reviews: Review[] };
export type S = User | UserWithOrders | UserWithReviews;
