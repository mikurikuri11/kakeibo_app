import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ["202401-10", "2024-01-21", "2024-01-22", "2024-02-13", "2024-02-14", "2024-02-15", "2024-02-26"];

const data = {
  labels,
  datasets: [
    {
      label: '支出',
      data: [100, 440, 200, 300, 550, 600, 400],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '収入',
      data: [600, 440, 200, 140, 500, 400, 900],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const BarChart = () => {
  return (
    <Bar options={options} data={data} />
  )
}
