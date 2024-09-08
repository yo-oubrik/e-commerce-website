"use client";

import { Order, PaymentStatus, Product, User } from "@prisma/client";
import { safeUser } from "../product/utils/types";
import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "../utils/helperFunctions/numbersManipulation";

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
  const calculateSummary = (
    orders: Order[],
    products: Product[],
    users: safeUser[]
  ): SummaryDataType => {
    const totalSale = orders.reduce((acc, order) => acc + order.amount, 0);
    const paidOrders = orders.filter(
      (order) => order.status === PaymentStatus.complete
    ).length;
    const unpaidOrders = orders.length - paidOrders;

    return {
      sale: { label: "Total Sale", digit: totalSale },
      totalProducts: { label: "Total Products", digit: products.length },
      totalOrders: { label: "Total Orders", digit: orders.length },
      paidOrders: { label: "Paid Orders", digit: paidOrders },
      unpaidOrders: { label: "Unpaid Orders", digit: unpaidOrders },
      totalUsers: { label: "Total Users", digit: users.length },
    };
  };
  const summary = useMemo(
    () => calculateSummary(orders, products, users),
    [orders, products, users]
  );
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-5">
        {Object.values(SummarySections).map((section) => (
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
        ))}
      </div>
    </div>
  );
};
