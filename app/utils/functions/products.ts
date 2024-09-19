import { Product } from "@prisma/client";

export const isProductInStock = (product: Product) => {
  return product.availableQuantity > 0;
};
