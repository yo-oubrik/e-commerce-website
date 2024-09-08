import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { isUserAdmin } from "@/actions/user/userActions";
export async function PUT(request: Request) {
  try {
    if (!(await isUserAdmin())) {
      console.error("Error updating order: Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, deliveryStatus } = await request.json();
    if (!id || !deliveryStatus) {
      return NextResponse.json(
        { error: "Missing required fields: 'id' or 'deliveryStatus'" },
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
