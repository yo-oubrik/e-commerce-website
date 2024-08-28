import { Product, Review, User } from "@prisma/client";

export type CartProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  availableQuantity: number;
  minQuantity: number;
  maxQuantity: number;
  selectedQuantity: number;
  brand: string;
  category: string;
  selectedImage: ProductImage;
};

export type ProductImage = {
  color: string;
  colorCode: string;
  imageUrl: string;
};

// export type Review = {
//   id: string;
//   userId: string;
//   productId: string;
//   rating: number;
//   comment: string;
//   createdAt: Date;
// };
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
