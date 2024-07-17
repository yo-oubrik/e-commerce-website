import { CartProduct } from "@/app/product/utils/types";
import { createContext } from "react";

//Specify what will be provided
type CartContextType = {
    cartNumberOfProducts: number;
    cartProducts: CartProduct[] | null | undefined;
    addProductToCart: (product: CartProduct) => void;
    removeProductFromCart: (product: CartProduct) => void;
    clearCart: () => void;
    handleQuantityIncrease: (product: CartProduct) => void;
    handleQuantityDecrease: (product: CartProduct) => void;
    totalPrice: number;
  };
  export const CartContext = createContext<CartContextType | null>(null);