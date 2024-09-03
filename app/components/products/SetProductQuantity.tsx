"use client";
import { CartProduct } from "@prisma/client";
import React, { useState } from "react";
interface ISetProductQuantity {
  cartProduct: CartProduct;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
  customClass?: string;
  dataCustomAttribute?: string;
}

const SetProductQuantity: React.FC<ISetProductQuantity> = ({
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
  customClass,
  dataCustomAttribute,
}) => {
  return (
    <div
      className={`flex items-center ${customClass}`}
      data-custom-attribute={dataCustomAttribute}
    >
      <div
        className="flex items-center justify-center size-7 rounded-md border-[1.5px] border-slate-400 duration-300 hover:border-slate-500 cursor-pointer"
        onClick={handleQuantityDecrease}
      >
        -
      </div>
      <div className="mx-3">{cartProduct.selectedQuantity}</div>
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
