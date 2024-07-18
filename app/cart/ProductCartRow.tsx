import React from "react";
import { CartProduct } from "../product/utils/types";
import SetProductQuantity from "../components/products/SetProductQuantity";
import { formatPrice } from "../utils/formatPrice";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { truncTitle } from "../utils/helperFunctions/truncTitle";
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
          <button
            className="mt-1 text-slate-500 underline underline-offset-[3px]"
            onClick={() => {
              removeProductFromCart(product);
            }}
          >
            Remove
          </button>
        </div>
      </div>
      <div
        className="my-auto text-center max-sm:data-small-devices"
        data-custom-attribute="Price:"
      >
        {formatPrice(product.price)}
      </div>
      <div className="my-auto flex justify-center">
        <SetProductQuantity
          cartProduct={product}
          customClass="max-sm:data-small-devices"
          dataCustomAttribute="Quantity:"
          handleQuantityIncrease={() => {
            handleQuantityIncrease(product);
          }}
          handleQuantityDecrease={() => {
            handleQuantityDecrease(product);
          }}
        />
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

export default ProductCartRow;
