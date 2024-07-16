"use client";

import { CartProduct, ProductImage } from "@/app/product/utils/types";

interface ISetProductColor {
  images: ProductImage[];
  CartProduct: CartProduct;
  handleColorSelect: (image: ProductImage) => void;
}
const SetProductColor: React.FC<ISetProductColor> = ({
  images,
  CartProduct,
  handleColorSelect,
}) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-bold">COLOR:</span>
      <div className="flex gap-2">
        {images.map((image) => (
          <div
            key={image.color}
            className={`flex items-center justify-center size-7 rounded-full border-2 ${
              image.colorCode === CartProduct.selectedImage.colorCode
                ? " border-teal-300"
                : "border-transparent"
            }`}
          >
            <div
              className="size-5 rounded-full cursor-pointer"
              title={image.color}
              style={{ backgroundColor: `${image.colorCode}` }}
              onClick={() => handleColorSelect(image)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetProductColor;
