import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { GrowthMeasurement } from '../../types/growth';
import { whoStandards } from '../../data/whoStandards';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GrowthChartProps {
  data: GrowthMeasurement[];
  type: 'height' | 'weight' | 'head';
  gender: 'male' | 'female';
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data, type, gender }) => {
  const months = ['0m', '1m', '2m', '3m', '4m', '5m'];
  
  const getStandardsData = () => {
    let standards;
    switch (type) {
      case 'height':
        standards = whoStandards.heightForAge[gender];
        break;
      case 'weight':
        standards = whoStandards.weightForAge[gender];
        break;
      case 'head':
        standards = whoStandards.headCircumferenceForAge[gender];
        break;
    }
    return standards;
  };

  const standards = getStandardsData();

  const chartData = {
    labels: months,
    datasets: [
      {
        label: '97th Percentile',
        data: standards.p97,
        borderColor: 'rgba(200, 200, 200, 0.5)',
        fill: false,
        borderDash: [5, 5]
      },
      {
        label: '85th Percentile',
        data: standards.p85,
        borderColor: 'rgba(200, 200, 200, 0.5)',
        fill: false,
        borderDash: [5, 5]
      },
      {
        label: '50th Percentile',
        data: standards.p50,
        borderColor: 'rgba(200, 200, 200, 0.5)',
        fill: false
      },
      {
        label: '15th Percentile',
        data: standards.p15,
        borderColor: 'rgba(200, 200, 200, 0.5)',
        fill: false,
        borderDash: [5, 5]
      },
      {
        label: '3rd Percentile',
        data: standards.p3,
        borderColor: 'rgba(200, 200, 200, 0.5)',
        fill: false,
        borderDash: [5, 5]
      },
      {
        label: 'Your Baby',
        data: data.map(d => {
          switch (type) {
            case 'height':
              return d.height;
            case 'weight':
              return d.weight;
            case 'head':
              return d.headCircumference;
          }
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
        pointRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: `${type.charAt(0).toUpperCase() + type.slice(1)} Growth Chart`
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: type === 'weight' ? 'Weight (kg)' : 'Length (cm)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Age (months)'
        }
      }
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg p-4 h-80">
        <Line data={chartData} options={options} />
      </div>
      <div className="text-center text-sm text-gray-500 mt-4">
        Based on WHO Child Growth Standards (2022)
      </div>
    </div>
  );
};

export default GrowthChart;