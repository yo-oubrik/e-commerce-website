import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/user/userActions";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    // Authorization check
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.error();
    }

    // Parse and validate the request body
    const {
      name,
      description,
      price,
      brand,
      category,
      quantity,
      minQuantity,
      maxQuantity,
      images,
    } = await request.json();

    // Convert and validate numeric values
    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity);
    const parsedMinQuantity = parseInt(minQuantity);
    const parsedMaxQuantity = parseInt(maxQuantity);

    // Validation: Ensure that required fields are provided and valid
    if (
      isNaN(parsedPrice) ||
      isNaN(parsedQuantity) ||
      isNaN(parsedMinQuantity) ||
      isNaN(parsedMaxQuantity) ||
      !name ||
      !description ||
      !brand ||
      !category ||
      !images ||
      !Array.isArray(images)
    ) {
      return NextResponse.json(
        { error: "Invalid or missing data" },
        { status: 400 }
      );
    }

    // Create the product in the database
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parsedPrice,
        brand,
        category,
        quantity: parsedQuantity,
        minQuantity: parsedMinQuantity,
        maxQuantity: parsedMaxQuantity,
        images,
      },
    });

    // Return the created product as JSON
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
