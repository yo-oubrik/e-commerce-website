"use client";
import { useCart } from "@/hooks/useCart";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormWrapper from "../components/FormWrapper";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
export const CheckoutClient = () => {
  const { paymentIntentId, cartProducts, handleSetPaymentIntentId } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      setIsLoading(true);

      const response = await fetch("/api/paymentIntent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartProducts,
          paymentIntentId,
        }),
      });

      setIsLoading(false);

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      setClientSecret(data.paymentIntent.client_secret);
      handleSetPaymentIntentId(data.paymentIntent.id);
    };

    fetchPaymentIntent();
  }, [cartProducts, paymentIntentId]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };
  return (
    <div>
      {isLoading && (
        <div className="text-center">
          <p>Loading ...</p>
        </div>
      )}
      {clientSecret && (
        <div className="mx-auto w-fit">
          <FormWrapper>
            <div className="w-full">
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            </div>
          </FormWrapper>
        </div>
      )}
    </div>
  );
};
