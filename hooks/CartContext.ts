import { CartProduct } from "@prisma/client";
import { createContext } from "react";

type CartContextType = {
  cartItemsCount: number;
  cartProducts: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (product: CartProduct) => void;
  clearCart: () => void;
  handleQuantityIncrease: (product: CartProduct) => void;
  handleQuantityDecrease: (product: CartProduct) => void;
  handleSetPaymentIntentId: (value: string) => void;
  paymentIntentId: string;
  cartTotalAmount: number;
  isCartEmpty: boolean;
};
export const CartContext = createContext<CartContextType | null>(null);
