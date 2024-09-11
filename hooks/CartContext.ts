import { CartProduct } from "@prisma/client";
import { createContext } from "react";

type CartContextType = {
  cartNumberOfProducts: number;
  cartProducts: CartProduct[] | null | undefined;
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (product: CartProduct) => void;
  clearCart: () => void;
  handleQuantityIncrease: (product: CartProduct) => void;
  handleQuantityDecrease: (product: CartProduct) => void;
  handleSetPaymentIntent: (value: String) => void;
  paymentIntent: String;
  totalPrice: number;
};
export const CartContext = createContext<CartContextType | null>(null);
