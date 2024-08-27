import prisma from "@/libs/prismadb";
import { getCurrentUser } from "../user/userActions";
import moment from "moment";

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
export type GraphData = {
  [date: string]: number;
};

export async function getGraphData(): Promise<GraphData> {
  try {
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    const dateTimeData = await prisma.order.findMany({
      where: {
        createDate: {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        },
        status: "complete",
      },
    });
    let result: { [date: string]: number } = {};
    dateTimeData.forEach((entry) => {
      const date = moment(entry.createDate).format("YYYY-MM-DD");
      if (!result[date]) {
        result[date] = 0;
      }
      result[date] += entry.amount;
    });
    return result;
  } catch (error) {
    console.error("Error trying to get summary graph data", error);
    throw error;
  }
}
