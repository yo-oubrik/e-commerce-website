"use client";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  scales,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { haveEqualLength } from "../utils/functions/arrays";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  scales
);
type barGraphStyleOptions = {
  backgorundColor?: string;
  borderColor?: string;
  borderWidth?: number;
};
interface IBarGraph {
  chartLabel?: string;
  xAxis: string[];
  yAxis: number[];
  options?: barGraphStyleOptions;
}
export const BarGraph: React.FC<IBarGraph> = ({
  chartLabel,
  xAxis,
  yAxis,
  options,
}) => {
  const chartData = useMemo(() => {
    if (!haveEqualLength(xAxis, yAxis)) {
      throw new Error("xAxis and yAxis arrays must have the same length.");
    }

    return {
      labels: xAxis,
      datasets: [
        {
          label: chartLabel,
          data: yAxis,
          ...(options
            ? options
            : {
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              }),
        },
      ],
    };
  }, [xAxis, yAxis, chartLabel, options]);
  return <Bar data={chartData} />;
};
