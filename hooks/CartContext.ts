import { CartProduct } from "@prisma/client";
import { createContext } from "react";

type CartContextType = {
  cartItemsCount: number;
  cartProducts: CartProduct[] | null | undefined;
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (product: CartProduct) => void;
  clearCart: () => void;
  handleQuantityIncrease: (product: CartProduct) => void;
  handleQuantityDecrease: (product: CartProduct) => void;
  handleSetPaymentIntentId: (value: String) => void;
  paymentIntentId: String;
  cartTotalAmount: number;
};
export const CartContext = createContext<CartContextType | null>(null);
