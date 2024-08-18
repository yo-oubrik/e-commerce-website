import prisma from "@/libs/prismadb";
import { getCurrentUser } from "../user/userActions";
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
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders: " + error);
  }
}

export async function getOrderById(id: string) {
  try {
    if (!id) {
      throw new Error("Invalid id");
    }
    return await prisma.order.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error getting order with id = + " + id + " :", error);
    throw new Error("Error getting order with id = + " + id + " :" + error);
  }
}

export async function getClientOrders() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;
    return await prisma.order.findMany({
      orderBy: {
        createDate: "desc",
      },
      where: {
        userId: currentUser.id,
      },
    });
  } catch (error) {
    console.error("Error fetching client orders:", error);
    throw new Error("Error fetching client orders: " + error);
  }
}
