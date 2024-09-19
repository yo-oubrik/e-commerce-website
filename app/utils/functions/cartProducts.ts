import { CartProduct } from "@prisma/client";

export const calculateCartTotalAmount = (cart: CartProduct[]) => {
  const total = cart.reduce(
    (runningTotal, currentProduct) =>
      runningTotal + currentProduct.price * currentProduct.selectedQuantity,
    0
  );
  return Math.ceil(total);
};
export function countCartItems(cart: CartProduct[]) {
  return cart.reduce(
    (runningCount, currentProduct) =>
      runningCount + currentProduct.selectedQuantity,
    0
  );
}
