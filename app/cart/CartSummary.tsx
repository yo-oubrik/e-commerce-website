"use client";
import Link from "next/link";
import Button from "../components/Button";
import { MdArrowBack } from "react-icons/md";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "../utils/formatPrice";

const CartSummary = () => {
  const { totalPrice } = useCart();
  return (
    <div className="max-sm:mt-4">
      <div className="flex justify-between items-center font-bold mb-1">
        <span>Subtotal</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <p className="text-slate-500 text-sm">
        Taxes and shipping calculated at checkout
      </p>
      <div className="my-[6px] max-w-[400px]">
        <Button label="Login To Checkout" onClick={() => {}} outline />
      </div>
      <Link href="/" className="flex items-center gap-1 text-slate-500 text-sm">
        <MdArrowBack />
        <span>Continue Shopping</span>
      </Link>
    </div>
  );
};

export default CartSummary;
