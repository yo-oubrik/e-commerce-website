import { CartProduct } from "@prisma/client";

export const calculateProductsAmount = (items: CartProduct[]) => {
  return items.reduce(
    (prev, current) => prev + current.price * current.selectedQuantity,
    0
  );
};
