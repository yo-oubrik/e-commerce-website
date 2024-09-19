import prisma from "@/libs/prismadb";
import {
  CartProduct,
  DeliveryStatus,
  Order,
  PaymentStatus,
} from "@prisma/client";
import moment from "moment";
import { getCurrentUser, isUserAdmin } from "../user/user";
import { getLastWeekDateRange } from "@/app/utils/functions/dates";

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
export async function getDateRangeOrders(
  dateRangeStart: Date,
  dateRangeEnd: Date
) {
  try {
    return await prisma.order.findMany({
      where: {
        createdAt: {
          gte: dateRangeStart,
          lte: dateRangeEnd,
        },
        status: "complete",
      },
    });
  } catch (error) {
    console.error("Error trying to getDateRangeOrders", error);
    throw new Error("Error trying to get date range orders");
  }
}
export async function getDateRangeCompleteOrders(
  startDate: Date,
  endDate: Date
) {
  await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      status: "complete",
    },
  });
}
export function getTotalOrderAmountsPerDate(orders: Order[]) {
  let result: { [date: string]: number } = {};
  orders.forEach((order) => {
    const date = moment(order.createdAt).format("YYYY-MM-DD");
    if (!result[date]) {
      result[date] = 0;
    }
    result[date] += order.amount / 10;
  });
  return result;
}
export async function getLastWeekDailyOrderTotals() {
  try {
    const [lastWeekStartDate, lastWeekEndDate] = getLastWeekDateRange();

    const dateTimeData = await getDateRangeOrders(
      lastWeekStartDate,
      lastWeekEndDate
    );
    return getTotalOrderAmountsPerDate(dateTimeData);
  } catch (error) {
    console.error("Error trying to getGraphData", error);
    throw new Error("Error trying to get  graph data");
  }
}
export async function saveOrder(
  amount: number,
  paymentIntentId: string,
  cart_products: CartProduct[]
) {
  const currentUser = await getCurrentUser();
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount,
    currency: "usd",
    status: PaymentStatus.pending,
    deliveryStatus: DeliveryStatus.pending,
    paymentIntentId,
    cart_products,
  };
  orderData.paymentIntentId = paymentIntentId;
  await prisma.order.create({ data: orderData });
}
export async function getOrderByPaymentIntentId(paymentIntentId: string) {
  return await prisma.order.findFirst({
    where: { paymentIntentId },
  });
}
export async function updateOrderPaymentInfo(
  paymentIntentId: string,
  amount: number,
  cart_products: CartProduct[]
) {
  return await prisma.order.update({
    where: { paymentIntentId },
    data: {
      amount: amount,
      cart_products,
    },
  });
}
export async function updateOrderPaymentStatus(paymentIntentId: string) {
  return await prisma.order.update({
    where: { paymentIntentId },
    data: {
      status: PaymentStatus.complete,
    },
  });
}
