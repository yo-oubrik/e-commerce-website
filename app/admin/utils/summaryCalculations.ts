import { safeUser } from "@/app/product/utils/types";
import { Order, PaymentStatus, Product } from "@prisma/client";
import { SummaryDataType } from "../types/SummaryDataType";

export const calculateTotalSales = (orders: Order[]) =>
  orders.reduce((acc, order) => acc + order.amount, 0);
export const countPaidOrders = (orders: Order[]) =>
  orders.filter((order) => order.status === PaymentStatus.complete).length;
export const calculateSummary = (
  orders: Order[],
  products: Product[],
  users: safeUser[]
): SummaryDataType => {
  const totalSale = calculateTotalSales(orders);
  const paidOrders = countPaidOrders(orders);
  const unpaidOrders = orders.length - paidOrders;

  return {
    sale: { label: "Total Sale", value: totalSale },
    totalProducts: { label: "Total Products", value: products.length },
    totalOrders: { label: "Total Orders", value: orders.length },
    paidOrders: { label: "Paid Orders", value: paidOrders },
    unpaidOrders: { label: "Unpaid Orders", value: unpaidOrders },
    totalUsers: { label: "Total Users", value: users.length },
  };
};
