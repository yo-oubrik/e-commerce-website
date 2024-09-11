"use client";

export type SummaryDataType = {
  [key in SummarySections]: {
    label: string;
    value: number;
  };
};
export enum SummarySections {
  sale = "sale",
  totalProducts = "totalProducts",
  totalOrders = "totalOrders",
  paidOrders = "paidOrders",
  unpaidOrders = "unpaidOrders",
  totalUsers = "totalUsers",
}
