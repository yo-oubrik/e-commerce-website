"use client";
import { CartProduct } from "@/app/product/utils/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

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

interface ICartContextProvider {
  [propName: string]: any;
}
export const CartContextProvider = (props: ICartContextProvider) => {
  const [cartNumberOfProducts, setCartNumberOfProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState<
    CartProduct[] | null | undefined | undefined
  >(null);

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
      setCartNumberOfProducts((prev) => prev + 1);
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
      setCartNumberOfProducts((prev) => prev - 1);
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
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
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

  const value = {
    cartNumberOfProducts,
    cartProducts,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
    totalPrice,
  };
  return <CartContext.Provider value={value} {...props} />;
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartContextProvider");
  return context;
};
