import { Product } from "@prisma/client";
import { formatPrice } from "@/app/utils/helperFunctions/numbersManipulation";
import { isProductInStock } from "@/app/utils/helperFunctions/products";

export const formatProductsForDisplay = (products: Product[]) => {
  return products.map((product) => ({
    ...product,
    price: formatPrice(product.price),
    inStock: isProductInStock(product),
  }));
};
