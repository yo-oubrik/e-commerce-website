import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CartProduct, Product } from "@prisma/client";
import { truncTitle } from "@/app/utils/helperFunctions/truncTitle";
import { formatPrice } from "@/app/utils/formatPrice";
interface IProductOrderRow {
  product: CartProduct;
}

const ProductOrderRow: React.FC<IProductOrderRow> = ({ product }) => {
  return (
    <div
      key={product.id}
      className="max-sm:flex max-sm:flex-col max-sm:gap-2 sm:grid sm:grid-cols-5 border-b border-slate-200 py-2 text-sm"
    >
      <div className="sm:col-span-2 flex items-center max-sm:justify-center gap-4">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.selectedImage.imageUrl}
            alt={product.name}
            width={48}
            height={48}
          />
        </Link>
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm" title={`${product.name}`}>
              {truncTitle(product.name)}
            </h3>
          </Link>
        </div>
      </div>
      <div
        className="my-auto text-center max-sm:data-small-devices"
        data-custom-attribute="Price:"
      >
        {formatPrice(product.price)}
      </div>
      <div
        className="my-auto text-center max-sm:data-small-devices"
        data-custom-attribute="Quantity:"
      >
        {product.selectedQuantity}
      </div>
      <div
        className="my-auto sm:text-end font-bold max-sm:text-center max-sm:data-small-devices"
        data-custom-attribute="Total Price:"
      >
        {formatPrice(product.selectedQuantity * product.price)}
      </div>
    </div>
  );
};

export default ProductOrderRow;
