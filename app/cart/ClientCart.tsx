"use client";
import Button from "../components/Button";
import ProductCartTable from "./ProductCartTable";
import CartSummary from "./CartSummary";
import { RedirectionPage } from "../components/RedirectionPage";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { safeUser } from "../product/utils/types";
import { Heading } from "../components/Heading";
interface IClientCart {
  currentUser: safeUser | null;
}
export const ClientCart: React.FC<IClientCart> = ({ currentUser }) => {
  const { cartProducts, clearCart } = useCart();
  return (
    <>
      {cartProducts && cartProducts.length != 0 ? (
        <>
          <Heading title={"Shopping Cart"} />
          <ProductCartTable cartProducts={cartProducts} />
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
              <div className="w-[90px] mt-4">
                <Button
                  label="Clear Cart"
                  onClick={() => {
                    clearCart();
                  }}
                  outline
                  small
                />
              </div>
              <CartSummary currentUser={currentUser} />
            </div>
          </div>
        </>
      ) : (
        <RedirectionPage
          heading={"Your cart is empty"}
          description={"Start Shopping"}
          href={"/"}
        />
      )}
    </>
  );
};
