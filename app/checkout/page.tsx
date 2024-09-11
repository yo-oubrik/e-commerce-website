"use client";
import { useCart } from "@/hooks/useCart";
import Container from "../components/Container";
import { RedirectionPage } from "../components/RedirectionPage";
import { CheckoutClient } from "./CheckoutClient";

const Checkout = () => {
  const { cartProducts } = useCart();

  return (
    <div className="py-8">
      <Container>
        {cartProducts.length === 0 ? (
          <RedirectionPage
            heading="Your cart is empty"
            redirectionLinks={[
              { description: "Start Shopping", href: "/" },
              { description: "View your orders", href: "/orders" },
            ]}
          />
        ) : (
          <CheckoutClient />
        )}
      </Container>
    </div>
  );
};

export default Checkout;
