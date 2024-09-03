"use client";
import { useCart } from "@/hooks/useCart";
import Container from "../components/Container";
import { Heading } from "../components/Heading";
import ProductCartTable from "./ProductCartTable";
import Button from "../components/Button";
import CartSummary from "./CartSummary";
import { RedirectionPage } from "../components/RedirectionPage";
import { isLoggedIn } from "@/actions/user/userActions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartProducts, clearCart } = useCart();
  const [loggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const loggedIn = await isLoggedIn();
        setIsLoggedIn(loggedIn);
      } catch (err) {
        console.error(err);
        toast.error("Oops! Something went wrong", { id: "cart-error" });
        setIsLoggedIn(false);
      }
    })();
  }, []);
  return (
    <Container>
      <div className="py-8">
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
                <CartSummary isLoggedIn={loggedIn} />
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
      </div>
    </Container>
  );
};
export default Cart;
