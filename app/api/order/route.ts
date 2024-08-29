import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { isUserAdmin } from "@/app/utils/helperFunctions/isUserAdmin";
export async function PUT(request: Request) {
  try {
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
