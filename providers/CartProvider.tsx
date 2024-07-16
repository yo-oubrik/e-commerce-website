"use client";

import { CartContextProvider } from "@/hooks/useCart";
import React from "react";

interface ICartProvider {
  children: React.ReactNode;
}
const CartProvider: React.FC<ICartProvider> = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
