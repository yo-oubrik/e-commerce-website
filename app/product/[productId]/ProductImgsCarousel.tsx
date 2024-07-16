"use client";
import { CartProduct, ProductImage } from "@/app/product/utils/types";
import Image from "next/image";
import React from "react";

interface IProductCarousel {
  product: any;
  cartProduct: CartProduct;
  handleColorSelect: (image: ProductImage) => void;
}
const ProductImgsCarousel: React.FC<IProductCarousel> = ({
  product,
  cartProduct,
  handleColorSelect,
}) => {
  const selectedImageUrl = cartProduct.selectedImage.imageUrl;
  return (
    <div className="h-full flex  max-lg:gap-4 max-lg:justify-center">
      <div className="h-fit my-auto py-8 basis-30 flex justify-center items-center flex-col gap-5 p-2 rounded-md border-2 border-slate-100">
        {product.images.map((image: ProductImage, index: number) => (
          <Image
            width={73}
            height={73}
            alt={cartProduct.name}
            src={image.imageUrl}
            key={index}
            className={`cursor-pointer ${
              selectedImageUrl === image.imageUrl
                ? "border-2 border-teal-300 rounded-md p-[2px]"
                : ""
            }`}
            onClick={() => handleColorSelect(image)}
          />
        ))}
      </div>
      <div className="flex lg:flex-1 h-full items-center justify-center">
        <Image
          alt={cartProduct.name}
          src={selectedImageUrl}
          width={300}
          height={380}
        />
      </div>
    </div>
  );
};

export default ProductImgsCarousel;
