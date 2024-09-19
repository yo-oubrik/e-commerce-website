import { Product } from "@prisma/client";
import { formatPrice } from "@/app/utils/functions/numbers";
import { isProductInStock } from "@/app/utils/functions/products";

export const formatProductsForDisplay = (products: Product[]) => {
  return products.map((product) => ({
    ...product,
    price: formatPrice(product.price),
    inStock: isProductInStock(product),
  }));
};
