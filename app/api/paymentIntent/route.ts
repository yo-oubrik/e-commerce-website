import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/user/userActions";
import { calculateProductsAmount } from "@/app/utils/helperFunctions/calculateProductsAmount";
import { CartProduct } from "@/app/product/utils/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "You must be authenticated before performing these action" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { items, paymentIntentId } = body;
    const total = calculateProductsAmount(items) * 100;

    const order = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      currency: "usd",
      status: "pending",
      deliveryStatus: "pending",
      paymentIntentId,
      products: items,
    };

    if (paymentIntentId) {
      const currentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      if (currentIntent) {
        const updatedPaymentIntent = await stripe.paymentIntents.update(
          paymentIntentId,
          { amount: total }
        );

        const [existingOrder, update_order] = await Promise.all([
          prisma.order.findFirst({
            where: { paymentIntentId: paymentIntentId },
          }),
          prisma.order.update({
            where: { paymentIntentId: paymentIntentId },
            data: {
              amount: total,
              products: items,
            },
          }),
        ]);

        if (!existingOrder) {
          return NextResponse.json(
            { error: "Invalid payment intent" },
            { status: 400 }
          );
        }

        return NextResponse.json({ paymentIntent: updatedPaymentIntent });
      } else {
        throw new Error("Payment intent not found");
      }
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      order.paymentIntentId = paymentIntent.id;
      await prisma.order.create({ data: order });

      return NextResponse.json({ paymentIntent });
    }
  } catch (error) {
    console.error("Error in /api/paymentIntent:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
