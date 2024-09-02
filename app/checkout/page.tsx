"use client";
import { useCart } from "@/hooks/useCart";
import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckoutForm } from "./CheckoutForm";
import { RedirectionPage } from "../components/RedirectionPage";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = () => {
  const { paymentIntent, cartProducts, handleSetPaymentIntent } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for handling error messages
  const router = useRouter();

  useEffect(() => {
    if (!cartProducts || cartProducts.length === 0) return;

    const fetchPaymentIntent = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch("/api/paymentIntent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartProducts,
            paymentIntentId: paymentIntent,
          }),
        });

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(
            data.error || "Failed to process payment. Please try again."
          );
          return;
        }

        setClientSecret(data.paymentIntent.client_secret);
        handleSetPaymentIntent(data.paymentIntent.id);
      } catch (error) {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [cartProducts]);

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
          <FormWrapper>
            <div className="w-full">
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            </div>
          </FormWrapper>
        ) : errorMessage ? (
          toast.error(errorMessage, {
            id: "checkout-error",
          })
        ) : null}
      </Container>
    </div>
  );
};

export default Checkout;
