"use client";
import { CartProduct } from "@/app/product/utils/types";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../hooks/CartContext";
interface ICartContextProvider {
  [propName: string]: any;
}

//Provide the context
export const CartContextProvider = (props: ICartContextProvider) => {
  const [cartNumberOfProducts, setCartNumberOfProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState<
    CartProduct[] | null | undefined
  >(null);
  const [paymentIntent, setPaymentIntent] = useState<String | null>(null);

  //Setting the cart products from local storage
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
      const paymentIntentObj =
        paymentIntentJSON && JSON.parse(paymentIntentJSON);
      setPaymentIntent(paymentIntentObj);
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
        id: product.id,
      });
    },
    [cartProducts]
  );
  const removeProductFromCart = useCallback(
    (product: CartProduct) => {
      const updatedCartProducts = cartProducts?.filter(
        (p) => p.id !== product.id
      );
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
      setCartProducts(updatedCartProducts);
      setTotalPrice((prev) => prev - product.price * product.selectedQuantity);
      setCartNumberOfProducts((prev) => prev - product.selectedQuantity);
      toast.success("Product removed from cart", {
        id: product.id,
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
        toast.error(`Ooops! Minimum quantity reached`, {
          id: product.id,
        });
        return;
      }
      const updatedCartProducts = cartProducts?.map((p) => {
        if (p.id == product.id) {
          return { ...p, selectedQuantity: p.selectedQuantity - 1 };
        }
        return p;
      });
      setCartNumberOfProducts((prev) => prev - 1);
      setTotalPrice((prev) => prev - product.price);
      setCartProducts(updatedCartProducts);
      localStorage.setItem(
        "paymentIntent",
        JSON.stringify(updatedCartProducts)
      );
    },
    [cartProducts]
  );
  const handleQuantityIncrease = useCallback(
    (product: CartProduct) => {
      if (product.selectedQuantity === product.maxQuantity) {
        toast.error(`Ooops! Maximum quantity reached`, {
          id: product.id,
        });
        return;
      }
      const updatedCartProducts = cartProducts?.map((p) => {
        if (p.id == product.id) {
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

  const handleSetPaymentIntent = useCallback(
    (value: String | null) => {
      setPaymentIntent(value);
      localStorage.setItem("paymentIntent", JSON.stringify(value));
    },
    [paymentIntent]
  );
  const value = {
    cartNumberOfProducts,
    cartProducts,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
    paymentIntent,
    handleSetPaymentIntent,
    totalPrice,
  };
  return <CartContext.Provider value={value} {...props} />;
};
