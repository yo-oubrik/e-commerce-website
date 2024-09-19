"use client";

import { Order, Product } from "@prisma/client";
import { useMemo } from "react";
import { safeUser } from "../product/utils/types";
import { formatPrice } from "../utils/functions/numbers";
import { SummarySections } from "./types/SummaryDataType";
import { calculateSummary } from "./utils/summaryCalculations";

interface ISummary {
  orders: Order[];
  users: safeUser[];
  products: Product[];
}
export const Summary: React.FC<ISummary> = ({ orders, products, users }) => {
  const summary = useMemo(
    () => calculateSummary(orders, products, users),
    [orders, products, users]
  );
  const summarySections = Object.values(SummarySections);
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-5">
        {summarySections.map((section) => {
          const { label, value } = summary[section];

          return (
            <div
              key={section}
              className="bg-white py-5 rounded-lg border-2 border-slate-700 text-center "
            >
              <p className="text-3xl font-semibold">
                {section === SummarySections.sale ? formatPrice(value) : value}
              </p>
              <h3 className="text-lg">{label}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
