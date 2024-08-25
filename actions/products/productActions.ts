import prisma from "@/libs/prismadb";
export interface IProduct {
  category: string;
  search: string;
}
export async function getProducts(params: IProduct) {
  const { category, search } = params;

  try {
    return await prisma.product.findMany({
      where: {
        ...(category && { category }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function getProductById(id: string) {
  try {
    return await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching product by id:", error);
  }
}

export async function getAllProducts() {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
