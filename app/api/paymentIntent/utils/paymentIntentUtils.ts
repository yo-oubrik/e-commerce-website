import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function createPaymentIntent(amount: number) {
  return await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });
}
export async function getPaymentIntentById(paymentIntentId: string) {
  return await stripe.paymentIntents.retrieve(paymentIntentId);
}
export async function updatePaymentIntentAmount(
  paymentIntentId: string,
  amount: number
) {
  return await stripe.paymentIntents.update(paymentIntentId, { amount });
}
