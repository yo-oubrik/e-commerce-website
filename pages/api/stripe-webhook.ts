import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { Address } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  if (!sig) {
    return res.status(400).send("Missing the stripe signature");
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!
    );
  } catch (error) {
    return res.status(400).send("webhook error " + error);
  }
  switch (event.type) {
    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        await prisma?.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: {
            status: "complete",
            address: charge.shipping?.address as Address,
          },
        });
      }
      break;
    default:
      console.log("Unhadled event type " + event.type);
  }
  res.json({ received: true });
}
