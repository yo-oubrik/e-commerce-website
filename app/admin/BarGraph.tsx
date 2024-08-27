"use client";
import { GraphData } from "@/actions/orders/ordersActions";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  scales,
} from "chart.js";
import { Bar } from "react-chartjs-2";
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
  const [labels, amounts] = [Object.keys(data), Object.values(data)];
  const chartData = {
    labels,
    datasets: [
      {
        label: "Total amount",
        data: amounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={chartData} options={options} />;
};
