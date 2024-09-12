import {
  getOrderByPaymentIntentId,
  saveOrder,
  updateOrderPaymentInfo,
} from "@/repository/orders/ordersActions";
import {
  calculateCartTotalAmount,
  isArrayEmpty,
} from "@/app/utils/helperFunctions/helperFunctions";
import { CartProduct } from "@prisma/client";
import { NextResponse } from "next/server";
import {
  createPaymentIntent,
  getPaymentIntentById,
  updatePaymentIntentAmount,
} from "./utils/paymentIntentUtils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      cartProducts,
      paymentIntentId,
    }: { cartProducts: CartProduct[]; paymentIntentId: string } = body;

    if (isArrayEmpty(cartProducts)) {
      return NextResponse.json(
        { error: "No products in cart" },
        { status: 400 }
      );
    }

    const amount = calculateCartTotalAmount(cartProducts);

    if (!paymentIntentId) {
      try {
        const paymentIntent = await createPaymentIntent(amount);
        await saveOrder(amount, paymentIntent.id, cartProducts);
        return NextResponse.json({ paymentIntent }, { status: 201 });
      } catch (createError) {
        console.error("Error creating payment intent:", createError);
        return NextResponse.json(
          { error: "Failed to create payment intent" },
          { status: 500 }
        );
      }
    }

    const existingIntent = await getPaymentIntentById(paymentIntentId);
    const existingOrder = await getOrderByPaymentIntentId(paymentIntentId);

    if (!existingOrder || !existingIntent) {
      return NextResponse.json(
        { error: "Invalid payment intent ID" },
        { status: 400 }
      );
    }

    try {
      const updatedPaymentIntent = await updatePaymentIntentAmount(
        paymentIntentId,
        amount
      );

      await updateOrderPaymentInfo(paymentIntentId, amount, cartProducts);
      return NextResponse.json({ paymentIntent: updatedPaymentIntent });
    } catch (updateError) {
      console.error("Error updating payment intent:", updateError);
      return NextResponse.json(
        { error: "Failed to update payment intent" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(
      "Error processing POST request at /api/paymentIntent:",
      error
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
