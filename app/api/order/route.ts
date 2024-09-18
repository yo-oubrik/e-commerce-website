import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { isUserAdmin } from "@/repository/user/user";
import { DeliveryStatus } from "@prisma/client";

export async function PUT(request: Request) {
  try {
    if (!(await isUserAdmin())) {
      console.error("Error updating order: Unauthorized access");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, deliveryStatus } = await request.json();

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'id'" },
        { status: 400 }
      );
    }
    const allDeliveryStatus = Object.values(DeliveryStatus);

    if (!deliveryStatus || !allDeliveryStatus.includes(deliveryStatus)) {
      return NextResponse.json(
        { error: "Invalid or missing 'deliveryStatus'" },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id },
      data: { deliveryStatus },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
