import React from "react";
import { CartProduct } from "../product/utils/types";
import SetProductQuantity from "../components/products/SetProductQuantity";
import { formatPrice } from "../utils/formatPrice";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { truncTitle } from "../utils/truncTitle";
interface IProductCartRow {
  product: CartProduct;
}

const ProductCartRow: React.FC<IProductCartRow> = ({ product }) => {
  const {
    removeProductFromCart,
    handleQuantityDecrease,
    handleQuantityIncrease,
  } = useCart();
  return (
    <div
      key={product.id}
      className="grid grid-cols-1 sm:grid-cols-5 border-b border-slate-200 py-2 text-sm"
    >
      <div className="max-sm:justify-center col-span-2 flex items-center gap-4">
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
          <button
            className="text-slate-500 underline underline-offset-[3px] mt-1"
            onClick={() => {
              removeProductFromCart(product);
            }}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="my-auto text-center">{formatPrice(product.price)}</div>
      <div className="my-auto flex justify-center">
        <SetProductQuantity
          cartProduct={product}
          handleQuantityIncrease={() => {
            handleQuantityIncrease(product);
          }}
          handleQuantityDecrease={() => {
            handleQuantityDecrease(product);
          }}
        />
      </div>
      <div className="my-auto sm:text-end font-bold max-sm:text-center">
        {formatPrice(product.selectedQuantity * product.price)}
      </div>
    </div>
  );
};

export default ProductCartRow;
