"use client";
import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import { RedirectionPage } from "../components/RedirectionPage";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = () => {
  const { paymentIntent, cartProducts, handleSetPaymentIntent } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!cartProducts || cartProducts.length === 0) return;

    const fetchPaymentIntent = async () => {
      setIsLoading(true);

      const response = await fetch("/api/paymentIntent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartProducts,
          paymentIntentId: paymentIntent,
        }),
      });

      setIsLoading(false);

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      setClientSecret(data.paymentIntent.client_secret);
      handleSetPaymentIntent(data.paymentIntent.id);
    };

    fetchPaymentIntent();
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  return (
    <div className="py-8">
      <Container>
        {!cartProducts || cartProducts.length === 0 ? (
          <RedirectionPage
            heading="Your cart is empty"
            redirectionLinks={[
              { description: "Start Shopping", href: "/" },
              { description: "View your orders", href: "/orders" },
            ]}
          />
        ) : isLoading ? (
          <div className="text-center">
            <p>Loading ...</p>
          </div>
        ) : clientSecret ? (
          <div className="mx-auto w-fit">
            <FormWrapper>
              <div className="w-full">
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm clientSecret={clientSecret} />
                </Elements>
              </div>
            </FormWrapper>
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default Checkout;
