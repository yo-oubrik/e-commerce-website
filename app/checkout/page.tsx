"use client";
import { useCart } from "@/hooks/useCart";
import Container from "../components/Container";
import { RedirectionPage } from "../components/RedirectionPage";
import { CheckoutPage } from "./CheckoutPage";

const Checkout = () => {
  const { isCartEmpty } = useCart();

  return (
    <div className="py-8">
      <Container>
        {isCartEmpty ? (
          <RedirectionPage
            heading="Your cart is empty"
            redirectionLinks={[
              { description: "Start Shopping", href: "/" },
              { description: "View your orders", href: "/orders" },
            ]}
          />
        ) : (
          <CheckoutPage />
        )}
      </Container>
    </div>
  );
};

export default Checkout;
