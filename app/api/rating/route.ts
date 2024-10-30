import { getCurrentUser } from "@/repository/user/user";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { DeliveryStatus } from "@prisma/client";
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await request.json();
    const { comment, rating, productId, userId } = body;
    if (!comment || !rating || !productId || !userId) {
      return NextResponse.json(
        { error: "All fields must be provided" },
        { status: 400 }
      );
    }
    const isProductDelivered = currentUser?.orders.some(
      (order) =>
        order.deliveryStatus === DeliveryStatus.delivered &&
        order.cart_products.some((prod) => prod.productId === productId)
    );
    if (!isProductDelivered) {
      return NextResponse.json(
        { error: "You must have received the product before rating it" },
        { status: 400 }
      );
    }
    const hasAlreadyRated = currentUser?.reviews.some(
      (review) => review.productId === productId
    );
    if (hasAlreadyRated) {
      return NextResponse.json(
        { error: "You have already rated this product" },
        { status: 400 }
      );
    }
    const review = await prisma.review.create({
      data: {
        comment,
        rating,
        productId,
        userId,
      },
    });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error trying to create review for product", error);
    return NextResponse.json(
      { error: "An internal error occurred" },
      { status: 500 }
    );
  }
}
