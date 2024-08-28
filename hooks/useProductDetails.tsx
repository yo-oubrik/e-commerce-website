import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CartProduct,
  ProductImage,
  ProductWithReviews,
} from "@/app/product/utils/types";
import { calculateAverageRating } from "@/app/utils/helperFunctions/calculateAverageRating";
import { useCart } from "@/hooks/useCart";
import { Product, Review } from "@prisma/client";

export const useProductDetails = (product: ProductWithReviews) => {
  const [cartProduct, setCartProduct] = useState<CartProduct>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    brand: product.brand,
    category: product.category,
    availableQuantity: product.quantity,
    minQuantity: product.minQuantity,
    maxQuantity: product.maxQuantity,
    selectedImage: product.images[0],
    selectedQuantity: product.minQuantity,
  });

  const [isProductInCart, setIsProductInCart] = useState(false);
  const { cartProducts, addProductToCart } = useCart();
  const numberOfReviews = product.reviews.length;
  const productRating = product.reviews
    ? calculateAverageRating(product.reviews)
    : 0;

  useEffect(() => {
    setIsProductInCart(
      cartProducts?.some((prod) => prod.id === cartProduct.id) ?? false
    );
  }, [cartProducts]);

  const handleColorSelect = (image: ProductImage) => {
    setCartProduct((prev) => ({
      ...prev,
      selectedImage: image,
    }));
  };

  const handleQuantityDecrease = () => {
    if (cartProduct.selectedQuantity === cartProduct.minQuantity) {
      toast.error("Ooops! Minimum quantity reached");
      return;
    }
    setCartProduct((prev) => ({
      ...prev,
      selectedQuantity: prev.selectedQuantity - 1,
    }));
  };

  const handleQuantityIncrease = () => {
    if (cartProduct.selectedQuantity === cartProduct.maxQuantity) {
      toast.error("Ooops! Maximum quantity reached");
      return;
    }
    setCartProduct((prev) => ({
      ...prev,
      selectedQuantity: prev.selectedQuantity + 1,
    }));
  };

  return {
    cartProduct,
    isProductInCart,
    handleColorSelect,
    handleQuantityDecrease,
    handleQuantityIncrease,
    addProductToCart,
    numberOfReviews,
    productRating,
    setIsProductInCart,
  };
};
