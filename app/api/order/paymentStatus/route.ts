import { updateOrderPaymentStatus } from "@/repository/order/order";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { paymentIntentId } = body;
    if (!paymentIntentId || typeof paymentIntentId !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'paymentIntentId'" },
        { status: 400 }
      );
    }
    await updateOrderPaymentStatus(paymentIntentId);
    return NextResponse.json({ message: "Payment status updated" });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { error: "Error updating payment status" },
      { status: 500 }
    );
  }
}
