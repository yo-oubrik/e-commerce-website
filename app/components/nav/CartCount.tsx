"use client";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

const CartCount = () => {
  const { cartItemsCount } = useCart();
  return (
    <Link href={"/cart"} className="relative">
      <CiShoppingCart size={32} />
      <span className="size-6 rounded-full top-[-10px] right-[-10px] grid place-content-center  absolute bg-slate-700 text-sm text-white">
        {cartItemsCount}
      </span>
    </Link>
  );
};

export default CartCount;
