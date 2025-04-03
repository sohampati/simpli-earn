import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SentimentGraphProps {
  sentimentData: Record<string, number>; // Dictionary of timestamp (x-axis) and sentiment value (y-axis)
  onTimestampClick: (timestamp: number) => void; // Callback to update video timestamp
}

// Utility function to format seconds into HH:MM:SS
const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hrs, mins, secs]
    .map((val) => String(val).padStart(2, '0'))
    .join(':');
};

const SentimentGraph: React.FC<SentimentGraphProps> = ({ sentimentData, onTimestampClick }) => {
  const timestamps = Object.keys(sentimentData).map(Number); // Convert keys to numbers (seconds)
  const sentimentValues = Object.values(sentimentData);

  const chartData = {
    labels: timestamps.map(formatTime), // Format timestamps as HH:MM:SS
    datasets: [
      {
        label: 'Sentiment Value',
        data: sentimentValues,
        borderColor: 'rgba(128, 209, 141, 255)',
        tension: 0.1,
        pointRadius: 4, // Make points clickable
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(128, 209, 141, 255)',
        pointBorderColor: 'rgba(128, 209, 141, 255)',
        pointHoverBackgroundColor: 'rgba(128, 209, 141, 255)',
        pointHoverBorderColor: 'rgba(128, 209, 141, 255)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Timestamp',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sentiment Value',
        },
        min: -1,
        max: 1,
        ticks: {
          stepSize: 0.5,
        },
        grid: {
          drawBorder: true,
          color: (context: any) => (context.tick.value === 0 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'),
          lineWidth: (context: any) => (context.tick.value === 0 ? 2 : 1),
        },
      },
    },
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const index = elements[0].index; // Get the clicked data point index
        const timestamp = timestamps[index]; // Get the corresponding timestamp in seconds
        onTimestampClick(timestamp); // Update video time
      }
    },
  };

  return (
    <div className="flex w-full h-full box-border pl-6 pr-6 py-2">
      <div className="w-full h-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SentimentGraph;