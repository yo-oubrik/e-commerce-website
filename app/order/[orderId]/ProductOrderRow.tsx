import React from "react";
import Link from "next/link";
import Image from "next/image";
import { truncTitle } from "@/app/utils/helperFunctions/truncTitle";
import { formatPrice } from "@/app/utils/formatPrice";
import { CartProduct } from "@/app/product/utils/types";
interface IProductOrderRow {
  cartProduct: CartProduct;
}

const ProductOrderRow: React.FC<IProductOrderRow> = ({ cartProduct }) => {
  return (
    <div
      key={cartProduct.id}
      className="max-sm:flex max-sm:flex-col max-sm:gap-2 sm:grid sm:grid-cols-5 border-b border-slate-200 py-2 text-sm"
    >
      <div className="sm:col-span-2 flex items-center max-sm:justify-center gap-4">
        <Link href={`/product/${cartProduct.id}`}>
          <Image
            src={cartProduct.selectedImage.imageUrl}
            alt={cartProduct.name}
            width={48}
            height={48}
          />
        </Link>
        <div>
          <Link href={`/product/${cartProduct.id}`}>
            <h3 className="text-sm" title={`${cartProduct.name}`}>
              {truncTitle(cartProduct.name)}
            </h3>
          </Link>
        </div>
      </div>
      <div
        className="my-auto text-center max-sm:data-small-devices"
        data-custom-attribute="Price:"
      >
        {formatPrice(cartProduct.price)}
      </div>
      <div
        className="my-auto text-center max-sm:data-small-devices"
        data-custom-attribute="Quantity:"
      >
        {cartProduct.selectedQuantity}
      </div>
      <div
        className="my-auto sm:text-end font-bold max-sm:text-center max-sm:data-small-devices"
        data-custom-attribute="Total Price:"
      >
        {formatPrice(cartProduct.selectedQuantity * cartProduct.price)}
      </div>
    </div>
  );
};

export default ProductOrderRow;
