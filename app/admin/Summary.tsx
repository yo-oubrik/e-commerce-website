"use client";

import { Order, PaymentStatus, Product, User } from "@prisma/client";
import { safeUser } from "../product/utils/types";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatPrice";

interface ISummary {
  orders: Order[];
  users: safeUser[];
  products: Product[];
}
enum SummarySections {
  sale = "sale",
  totalProducts = "totalProducts",
  totalOrders = "totalOrders",
  paidOrders = "paidOrders",
  unpaidOrders = "unpaidOrders",
  totalUsers = "totalUsers",
}
type SummaryDataType = {
  [key in SummarySections]: {
    label: string;
    digit: number;
  };
};
export const Summary: React.FC<ISummary> = ({ orders, products, users }) => {
  const [summary, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    totalProducts: {
      label: "Total Products",
      digit: 0,
    },
    totalOrders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    totalUsers: {
      label: "Total Users",
      digit: 0,
    },
  });
  useEffect(() => {
    setSummaryData((prev) => {
      let temp = { ...prev };
      const totalSale = orders.reduce((acc, order) => acc + order.amount, 0);
      const paidOrders = orders.filter(
        (order) => order.status === PaymentStatus.complete
      ).length;
      const unpaidOrders = orders.length - paidOrders;
      const totalOrders = orders.length;
      const totalProducts = products.length;
      const totalUsers = users.length;
      temp.sale.digit = totalSale;
      temp.totalProducts.digit = totalProducts;
      temp.totalOrders.digit = totalOrders;
      temp.paidOrders.digit = paidOrders;
      temp.unpaidOrders.digit = unpaidOrders;
      temp.totalUsers.digit = totalUsers;
      return temp;
    });
  }, [orders, products, users]);
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-5">
        {Object.values(SummarySections).map((section) => {
          return (
            <div
              key={section}
              className="bg-white py-5 rounded-lg border-2 border-slate-700 text-center "
            >
              <p className="text-3xl font-semibold">
                {section === SummarySections.sale
                  ? formatPrice(summary[section].digit)
                  : summary[section].digit}
              </p>
              <h3 className="text-lg">{summary[section].label}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
