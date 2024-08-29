import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/user/userActions";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { log } from "console";
import { ProductImage } from "@prisma/client";
import firebaseApp from "@/libs/firebase";
import { isUserAdmin } from "@/app/utils/helperFunctions/isUserAdmin";

export async function POST(request: Request) {
  try {
    if (!(await isUserAdmin())) {
      console.error("error creating product: Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

export async function DELETE(request: Request) {
  if (!(await isUserAdmin())) {
    console.error("error creating product: Unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  if (!id) {
    console.error("Error trying to delete products: Invalid id :" + id);

    return NextResponse.json(
      { error: "Invalid or missing data" },
      { status: 400 }
    );
  }
  try {
    //deleting product
    const deletedProduct = await prisma.product.delete({ where: { id: id } });
    try {
      await deleteProductImages(deletedProduct.images);
    } catch (error) {
      console.error("Error deleting images", error);
    }
    return NextResponse.json({
      deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
async function deleteProductImages(images: ProductImage[]) {
  //deleting images
  const storage = getStorage(firebaseApp);
  for (const item of images) {
    {
      if (item.imageUrl) {
        const imageRef = ref(storage, item.imageUrl);
        await deleteObject(imageRef);
      }
    }
  }
}
