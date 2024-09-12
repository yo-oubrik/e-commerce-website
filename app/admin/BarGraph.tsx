"use client";
import { GraphData } from "@/repository/orders/ordersActions";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  scales,
} from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { chartOptions, createChartData } from "./config/graphConfig";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  scales
);
interface IBarGraph {
  data: GraphData;
}
export const BarGraph: React.FC<IBarGraph> = ({ data }) => {
  const labels = Object.keys(data);
  const amounts = Object.values(data);
  const title = "Total amount";
  const chartData = useMemo(
    () => createChartData(title, labels, amounts),
    [data]
  );
  return <Bar data={chartData} options={chartOptions} />;
};
