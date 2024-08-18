import { NextResponse } from "next/server";
import { isUserAdmin } from "../product/route";
import prisma from "@/libs/prismadb";
export async function PUT(request: Request) {
  try {
    console.log("PUT request to /api/order");
    if (!(await isUserAdmin())) {
      console.error("error updating product: Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id, deliveryStatus } = await request.json();
    if (!(id || deliveryStatus)) {
      return NextResponse.json(
        { error: "Missing required fields: 'id' and 'deliveryStatus'" },
        { status: 400 }
      );
    }
    const order = await prisma.order.update({
      where: { id },
      data: { deliveryStatus },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
