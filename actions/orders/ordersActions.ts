import prisma from "@/libs/prismadb";
export async function getOrders() {
  try {
    return await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
    });
  } catch (error) {
    console.log("Error fetching orders:", error);
    throw new Error("Error fetching orders: " + error);
  }
}
