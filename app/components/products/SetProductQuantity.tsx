"use client";
import { CartProduct } from "@/app/product/utils/types";
import React, { useState } from "react";
interface ISetProductQuantity {
  cartProduct: CartProduct;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const SetProductQuantity: React.FC<ISetProductQuantity> = ({
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-bold">QUANTITY:</span>
      <div
        className="flex items-center justify-center size-7 rounded-md border-[1.5px] border-slate-400 duration-300 hover:border-slate-500 cursor-pointer"
        onClick={handleQuantityDecrease}
      >
        -
      </div>
      <div>{cartProduct.selectedQuantity}</div>
      <div
        className="flex items-center justify-center size-7 rounded-md border-[1.5px] border-slate-400 duration-300 hover:border-slate-500 cursor-pointer"
        onClick={handleQuantityIncrease}
      >
        +
      </div>
    </div>
  );
};

export default SetProductQuantity;
