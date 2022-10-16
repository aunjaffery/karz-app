import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useColorMode } from "@chakra-ui/react";

function BarChart({ labels, values }) {
  const { colorMode } = useColorMode();
  let g400 = "#A0AEC0";
  let g600 = "#4A5568";
  let d200 = "#252a41";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
        },
        ticks: {
          color: colorMode === "light" ? g600 : g400,
        },
      },
      y: {
        grid: {
          color: colorMode === "light" ? "#E2E8F0" : d200,
        },
        ticks: {
          color: colorMode === "light" ? g600 : g400,
          callback: (label) => {
            return Intl.NumberFormat("en", { notation: "compact" }).format(
              label
            );
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 18,
          color: colorMode === "light" ? g600 : g400,
        },
      },
      title: { display: false },
    },
  };

  const data = {
    labels: labels,
    //["Total lent","Total borrowed","Lent pending","Borrowed pending"]
    datasets: [
      {
        label: "Total expense",
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: "1",
      },
    ],
  };
  return <Bar data={data} options={options} />;
}

export default BarChart;
