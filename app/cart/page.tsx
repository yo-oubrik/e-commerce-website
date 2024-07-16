"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Container from "../components/Container";
import Button from "../components/Button";
import ProductCartRow from "./ProductCartRow";
import ProductCartTable from "./ProductCartTable";
import CartSummary from "./CartSummary";
const Cart = () => {
  const { cartProducts, clearCart } = useCart();
  return (
    <Container>
      <div className="py-8">
        {cartProducts && cartProducts.length != 0 ? (
          <div>
            <h2 className="text-center text-2xl mb-7">Shopping Cart</h2>
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
                <CartSummary />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-center text-2xl mb-2">Your cart is empty</h2>
            <Link
              href="/"
              className="flex justify-center items-center gap-1 text-slate-500"
            >
              <MdArrowBack />
              <span>Start Shopping</span>
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart;
