import { Product } from "@prisma/client";
import { formatPrice } from "@/app/utils/helperFunctions/numbersManipulation";
import { isProductInStock } from "@/app/utils/helperFunctions/products";

interface IRows {
  id: string;
  name: string;
  availableQuantity: number;
  minQuantity: number;
  maxQuantity: number;
  price: string;
  category: string;
  brand: string;
  inStock: boolean;
}

export const getProductRows = (products: Product[]): IRows[] => {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    availableQuantity: product.availableQuantity,
    minQuantity: product.minQuantity,
    maxQuantity: product.maxQuantity,
    price: formatPrice(product.price),
    category: product.category,
    brand: product.brand,
    inStock: isProductInStock(product),
  }));
};
