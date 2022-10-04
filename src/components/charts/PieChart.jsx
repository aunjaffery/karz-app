import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

function PieChart({ chartData }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "left",
        labels: {
          usePointStyle: true,
          textAlign: "left",
          padding: 15,
        },
      },
      title: { display: false },
    },
  };

  const data = {
    labels: chartData?.labels,
    //["Total lent","Total borrowed","Lent pending","Borrowed pending"]
    datasets: [
      {
        label: "# of Votes",
        data: chartData?.vals,
        backgroundColor: [
          "rgba(66, 153, 225, 1)",
          "rgba(72, 187, 120, 1)",
          "rgba(245, 101, 101, 1)",
          "rgba(236, 201, 75, 1)",
        ],
        borderColor: [
          "rgba(66, 153, 225, 1)",
          "rgba(72, 187, 120, 1)",
          "rgba(245, 101, 101, 1)",
          "rgba(236, 201, 75, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
}

export default PieChart;
