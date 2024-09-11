import { useCart } from "@/hooks/useCart";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/helperFunctions/numbersManipulation";
import toast from "react-hot-toast";
import Button from "../components/Button";

interface ICheckoutForm {
  clientSecret: string;
}

export const CheckoutForm: React.FC<ICheckoutForm> = ({ clientSecret }) => {
  const { cartTotalAmount, clearCart, handleSetPaymentIntentId } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);
  useEffect(() => {
    if (!stripe || !clientSecret) return;
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
      toast.success("Checkout success");
      clearCart();
      handleSetPaymentIntentId("");
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again.");
      console.error("Error tring to checkout order", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <h2 className="text-center mb-2">
        Enter payment details to complete checkout
      </h2>
      <p className="mb-1">Address information</p>
      <AddressElement
        id="address-element"
        options={{
          mode: "shipping",
        }}
      />
      <p className="my-1">Payment information</p>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <Button
        label={isLoading ? "Processing..." : `Pay ${formattedPrice}`}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
        customClass="mt-2"
      />
    </form>
  );
};
