"use client";
import { formatPrice } from "@/app/utils/functions/numbers";
import { Rating } from "@mui/material";
import Button from "@/app/components/Button";
import ProductImgsCarousel from "@/app/product/[productId]/ProductImgsCarousel";
import { Separator } from "@/app/components/Separator";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import SetProductQuantity from "@/app/components/products/SetProductQuantity";
import SetProductColor from "@/app/components/products/SetProductColor";
import IsProductInStock from "./IsProductInStock";
import { useProductDetails } from "@/hooks/useProductDetails";
import { ProductWithReviews } from "../utils/types";

interface IProductDetails {
  product: ProductWithReviews;
}
const ProductDetails: React.FC<IProductDetails> = ({ product }) => {
  const {
    cartProduct,
    handleColorSelect,
    productRating,
    numberOfReviews,
    isProductInCart,
    handleQuantityDecrease,
    handleQuantityIncrease,
    addProductToCart,
    setIsProductInCart,
  } = useProductDetails(product);
  const router = useRouter();
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="image-container">
        <ProductImgsCarousel
          product={product}
          cartProduct={cartProduct}
          handleColorSelect={handleColorSelect}
        />
      </div>
      <div className="product-details text-sm">
        <h1 className="text-3xl">{product.name}</h1>
        <p className="mb-1 font-bold text-3xl">{formatPrice(product.price)}</p>
        <div className="flex items-center gap-1">
          <Rating value={productRating} readOnly />
          <p className="text-slate-500">{numberOfReviews} Reviews</p>
        </div>
        <Separator />
        <p className="max-w-[600px] text-justify text-slate-500 whitespace-pre-wrap">
          {product.description}
        </p>
        <Separator />
        <div className="flex gap-2">
          <span className="font-bold">CATEGORY:</span>
          <span className="text-slate-500">{product.category}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">BRAND:</span>
          <span className="text-slate-500">{product.brand}</span>
        </div>
        <IsProductInStock cartProduct={cartProduct} />
        <Separator />
        {isProductInCart && (
          <>
            <div className="flex items-center gap-[6px] mt-4 font-semibold text-slate-500">
              <MdCheckCircle size={20} className="text-teal-500" />
              <span>Product Added To Cart</span>
            </div>
            <div className="max-w-[250px] mt-3">
              <Button
                label="View Cart"
                onClick={() => {
                  router.push("/cart");
                }}
                outline={true}
              />
            </div>
          </>
        )}
        {product.availableQuantity > 0 && !isProductInCart && (
          <>
            <SetProductColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Separator />
            <div className="flex items-center gap-4">
              <span className="font-bold">QUANTITY:</span>
              <SetProductQuantity
                cartProduct={cartProduct}
                handleQuantityIncrease={handleQuantityIncrease}
                handleQuantityDecrease={handleQuantityDecrease}
              />
            </div>
            <Separator />
            <div className="max-w-[250px]">
              <Button
                label="Add To Cart"
                onClick={() => {
                  addProductToCart(cartProduct);
                  setIsProductInCart(true);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
