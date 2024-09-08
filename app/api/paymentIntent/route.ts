import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/user/userActions";
import { calculateCartTotal } from "@/app/utils/helperFunctions/helperFunctions";
import { CartProduct, DeliveryStatus, PaymentStatus } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await request.json();
    const {
      cartProducts,
      paymentIntentId,
    }: { cartProducts: CartProduct[]; paymentIntentId: string } = body;

    if (!cartProducts || cartProducts.length === 0) {
      return NextResponse.json(
        { error: "No products in cart" },
        { status: 400 }
      );
    }

    const total = calculateCartTotal(cartProducts);

    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      currency: "usd",
      status: PaymentStatus.pending,
      deliveryStatus: DeliveryStatus.pending,
      paymentIntentId,
      cart_products: cartProducts,
    };
    if (!paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      orderData.paymentIntentId = paymentIntent.id;
      await prisma.order.create({ data: orderData });

      return NextResponse.json({ paymentIntent });
    }

    const existingIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );
    const existingOrder = await prisma.order.findFirst({
      where: { paymentIntentId },
    });

    if (!existingOrder || !existingIntent) {
      return NextResponse.json(
        { error: "Invalid payment intent" },
        { status: 400 }
      );
    }

    const updatedPaymentIntent = await stripe.paymentIntents.update(
      paymentIntentId,
      { amount: total }
    );

    await prisma.order.update({
      where: { paymentIntentId },
      data: {
        amount: total,
        cart_products: cartProducts,
      },
    });

    return NextResponse.json({ paymentIntent: updatedPaymentIntent });
  } catch (error) {
    console.error(
      "Error trying to process post request at /api/paymentIntent",
      error
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
