export const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const createChartData = (
  label: string,
  labels: string[],
  data: number[]
) => ({
  labels,
  datasets: [
    {
      label,
      data,
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
});
