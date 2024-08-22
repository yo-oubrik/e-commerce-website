"use client";
import { useCart } from "@/hooks/useCart";
import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckoutForm } from "./CheckoutForm";
import Button from "../components/Button";
import { RedirectionPage } from "../components/RedirectionPage";
import { getErrorMessage } from "../utils/helperFunctions/getErrorMessage";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
const Checkout = () => {
  const { paymentIntent, cartProducts, handleSetPaymentIntent } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const paymentIntentReq = async () => {
      if (!cartProducts || cartProducts.length == 0) return;
      setIsLoading(true);
      try {
        const result = await fetch("/api/paymentIntent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartProducts,
            paymentIntentId: paymentIntent,
          }),
        });

        setIsLoading(false);

        if (result.status === 401) {
          router.push("/login");
          return;
        }

        if (!result.ok) {
          throw new Error(`
            Error: ${result.body}
            status: ${result.status}
          `);
        }

        const data = await result.json();
        setClientSecret(data.paymentIntent.client_secret);
        handleSetPaymentIntent(data.paymentIntent.id);
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
        console.error(getErrorMessage(error));
        toast.error("Oops! Something went wrong. Please try again.");
      }
    };
    if (!cartProducts || cartProducts.length === 0) return;
    paymentIntentReq();
  }, [cartProducts, paymentIntent, handleSetPaymentIntent, router]);

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
        {!cartProducts || cartProducts.length == 0 ? (
          <RedirectionPage
            heading={"Your cart is empty"}
            redirectionLinks={[
              { description: "Start Shopping", href: "/" },
              { description: "View your orders", href: "/orders" },
            ]}
          />
        ) : isLoading ? (
          <p className="text-center">Loading...</p>
        ) : hasError ? (
          <p className="text-center text-rose-500">Something went wrong</p>
        ) : clientSecret ? (
          <FormWrapper customClass="mx-auto">
            <div className="w-full">
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            </div>
          </FormWrapper>
        ) : null}
      </Container>
    </div>
  );
};

export default Checkout;
