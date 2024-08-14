import prisma from "@/libs/prismadb";
export interface IProduct {
  category?: string;
  searchTerm?: string;
}
export default async function getProducts(params?: IProduct) {
  try {
    const { category, searchTerm } = params || {};
    let searchString = searchTerm || "";
    return await prisma.product.findMany({
      where: {
        category: category || undefined,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
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
    throw error;
  }
}
