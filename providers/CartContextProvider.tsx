"use client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../hooks/CartContext";
import { CartProduct } from "@prisma/client";
interface ICartContextProvider {
  [propName: string]: any;
}

export const CartContextProvider = (props: ICartContextProvider) => {
  const [cartNumberOfProducts, setCartNumberOfProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState<
    CartProduct[] | null | undefined
  >(null);
  const [paymentIntentId, setPaymentIntentId] = useState<String>("");

  useEffect(() => {
    const cProducts = localStorage.getItem("cartProducts");
    if (cProducts) {
      const parsedCartProducts = JSON.parse(cProducts);
      const { nbrOfProducts, totalPrice } = parsedCartProducts.reduce(
        (
          acc: {
            nbrOfProducts: number;
            totalPrice: number;
          },
          product: CartProduct
        ) => {
          return {
            nbrOfProducts: acc.nbrOfProducts + product.selectedQuantity,
            totalPrice: acc.totalPrice + product.price,
          };
        },
        { nbrOfProducts: 0, totalPrice: 0 }
      );
      setTotalPrice(totalPrice);
      setCartNumberOfProducts(nbrOfProducts);
      setCartProducts(parsedCartProducts);
      const paymentIntentJSON = localStorage.getItem("paymentIntent");
      const parsedPaymentIntent = paymentIntentJSON
        ? JSON.parse(paymentIntentJSON)
        : "";
      setPaymentIntentId(parsedPaymentIntent);
    }
  }, []);

  const addProductToCart = useCallback(
    (product: CartProduct) => {
      const updatedCartProducts = cartProducts
        ? [...cartProducts, product]
        : [product];
      setTotalPrice((prev) => prev + product.price * product.selectedQuantity);
      setCartProducts(updatedCartProducts);
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
      setCartNumberOfProducts((prev) => prev + product.selectedQuantity);
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
      setTotalPrice((prev) => prev - product.price * product.selectedQuantity);
      setCartNumberOfProducts((prev) => prev - product.selectedQuantity);
      toast.success("Product removed from cart", {
        id: product.productId,
      });
    },
    [cartProducts]
  );
  const clearCart = useCallback(() => {
    localStorage.removeItem("cartProducts");
    setCartProducts(null);
    setTotalPrice(0);
    setCartNumberOfProducts(0);
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
      setCartNumberOfProducts((prev) => prev - 1);
      setTotalPrice((prev) => prev - product.price);
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
      setCartNumberOfProducts((prev) => prev + 1);
      setTotalPrice((prev) => prev + product.price);
      setCartProducts(updatedCartProducts);
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
    },
    [cartProducts]
  );

  const handleSetPaymentIntentId = useCallback((value: String) => {
    setPaymentIntentId(value);
    localStorage.setItem("paymentIntentId", JSON.stringify(value));
  }, []);
  const value = {
    cartNumberOfProducts,
    cartProducts,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
    paymentIntentId,
    handleSetPaymentIntentId,
    totalPrice,
  };
  return <CartContext.Provider value={value} {...props} />;
};
