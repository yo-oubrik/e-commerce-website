"use client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../hooks/CartContext";
import { CartProduct } from "@prisma/client";
import {
  calculateCartTotalAmount,
  countCartItems,
  isArrayEmpty,
} from "@/app/utils/helperFunctions/helperFunctions";
interface ICartContextProvider {
  [propName: string]: any;
}

export const CartContextProvider = (props: ICartContextProvider) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);
  useEffect(() => {
    setIsCartEmpty(isArrayEmpty(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    const serializedCartProducts = localStorage.getItem("cartProducts");
    if (!serializedCartProducts) return;

    const parsedCartProducts = JSON.parse(serializedCartProducts);
    setCartProducts(parsedCartProducts);

    const cartTotalAmount = calculateCartTotalAmount(cartProducts);
    setCartTotalAmount(cartTotalAmount);

    const cartItemsCount = countCartItems(cartProducts);
    setCartItemsCount(cartItemsCount);

    const paymentIntentJSON = localStorage.getItem("paymentIntent");
    const parsedPaymentIntent = paymentIntentJSON
      ? JSON.parse(paymentIntentJSON)
      : "";
    setPaymentIntentId(parsedPaymentIntent);
  }, []);

  const addProductToCart = useCallback(
    (product: CartProduct) => {
      const updatedCartProducts = cartProducts
        ? [...cartProducts, product]
        : [product];
      setCartTotalAmount(
        (prev) => prev + product.price * product.selectedQuantity
      );
      setCartProducts(updatedCartProducts);
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
      setCartItemsCount((prev) => prev + product.selectedQuantity);
      toast.success("Product added to cart", {
        id: product.productId,
      });
    },
    [cartProducts]
  );
  const removeProductFromCart = useCallback(
    (product: CartProduct) => {
      const updatedCartProducts = cartProducts?.filter(
        (p) => p.productId !== product.productId
      );
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
      setCartProducts(updatedCartProducts);
      setCartTotalAmount(
        (prev) => prev - product.price * product.selectedQuantity
      );
      setCartItemsCount((prev) => prev - product.selectedQuantity);
      toast.success("Product removed from cart", {
        id: product.productId,
      });
    },
    [cartProducts]
  );
  const clearCart = useCallback(() => {
    localStorage.removeItem("cartProducts");
    setCartProducts([]);
    setCartTotalAmount(0);
    setCartItemsCount(0);
  }, []);
  const handleQuantityDecrease = useCallback(
    (product: CartProduct) => {
      if (product.selectedQuantity === product.minQuantity) {
        return toast.error(`Ooops! Minimum quantity reached`, {
          id: "minQuantity",
        });
      }
      const updatedCartProducts = cartProducts?.map((p) => {
        if (p.productId == product.productId) {
          return { ...p, selectedQuantity: p.selectedQuantity - 1 };
        }
        return p;
      });
      setCartItemsCount((prev) => prev - 1);
      setCartTotalAmount((prev) => prev - product.price);
      setCartProducts(updatedCartProducts);
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
    },
    [cartProducts]
  );
  const handleQuantityIncrease = useCallback(
    (product: CartProduct) => {
      if (product.selectedQuantity === product.maxQuantity) {
        return toast.error(`Ooops! Maximum quantity reached`, {
          id: "maxQuantity",
        });
      }
      const updatedCartProducts = cartProducts?.map((p) => {
        if (p.productId == product.productId) {
          return { ...p, selectedQuantity: p.selectedQuantity + 1 };
        }
        return p;
      });
      setCartItemsCount((prev) => prev + 1);
      setCartTotalAmount((prev) => prev + product.price);
      setCartProducts(updatedCartProducts);
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
    },
    [cartProducts]
  );

  const handleSetPaymentIntentId = useCallback((value: string) => {
    setPaymentIntentId(value);
    localStorage.setItem("paymentIntentId", JSON.stringify(value));
  }, []);
  const value = {
    cartItemsCount,
    cartProducts,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
    paymentIntentId,
    handleSetPaymentIntentId,
    cartTotalAmount,
    isCartEmpty,
  };
  return <CartContext.Provider value={value} {...props} />;
};
