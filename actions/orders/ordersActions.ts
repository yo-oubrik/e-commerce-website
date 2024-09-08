import prisma from "@/libs/prismadb";
import { getCurrentUser, isUserAdmin } from "../user/userActions";
import moment from "moment";

export async function fetchOrdersWithUsers() {
  try {
    if (!isUserAdmin()) throw new Error("Access denied, admin only");
    return await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error while trying to getOrders", error);
    throw new Error("Error trying to get orders");
  }
}

export async function getOrderById(id: string) {
  try {
    if (!id) {
      throw new Error("No id provided");
    }
    return await prisma.order.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error while trying to getOrderById", error);
    throw new Error("Error trying to get order");
  }
}

export async function getClientOrders() {
  try {
    const currentUser = await getCurrentUser();
    return await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: currentUser.id,
      },
    });
  } catch (error) {
    console.error("Error trying to getClientOrders", error);
    throw new Error("Error trying to get client orders");
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
        createdAt: {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        },
        status: "complete",
      },
    });
    let result: { [date: string]: number } = {};
    dateTimeData.forEach((entry) => {
      const date = moment(entry.createdAt).format("YYYY-MM-DD");
      if (!result[date]) {
        result[date] = 0;
      }
      result[date] += entry.amount / 10; //convert to dollars;
    });
    return result;
  } catch (error) {
    console.error("Error trying to getGraphData", error);
    throw new Error("Error trying to get  graph data");
  }
}
