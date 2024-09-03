import { CartProduct } from "@prisma/client";

export const calculateProductsAmount = (cart_products: CartProduct[]) => {
  const total = cart_products.reduce(
    (prev, current) => prev + current.price * current.selectedQuantity,
    0
  );
  return Math.ceil(total);
};
