import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartEvent, Chart } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SentimentGraphProps {
  sentimentData: Record<string, number>; // Dictionary of timestamp (x-axis) and sentiment value (y-axis)
  onTimestampClick: (timestamp: number) => void; // Callback to update video timestamp
}

// Utility function to format seconds into HH:MM:SS
const formatTime = (seconds: number): string => {
  const roundedSeconds = Math.round(seconds);
  const hrs = Math.floor(roundedSeconds / 3600);
  const mins = Math.floor((roundedSeconds % 3600) / 60);
  const secs = roundedSeconds % 60;
  return [hrs, mins, secs]
    .map((val) => String(val).padStart(2, '0'))
    .join(':');
};

// Utility function to calculate moving average
const calculateMovingAverage = (data: number[], windowSize: number): number[] => {
  const movingAverage: number[] = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const subset = data.slice(start, i + 1);
    const average = subset.reduce((sum, value) => sum + value, 0) / subset.length;
    movingAverage.push(average);
  }
  return movingAverage;
};

const SentimentGraph: React.FC<SentimentGraphProps> = ({ sentimentData, onTimestampClick }) => {
  const timestamps = Object.keys(sentimentData).map(Number); // Convert keys to numbers (seconds)
  const sentimentValues = Object.values(sentimentData);

  // Calculate moving average with a window size of 5
  const movingAverageValues = calculateMovingAverage(sentimentValues, 5);

  const chartData = {
    labels: timestamps.map(formatTime), // Format timestamps as HH:MM:SS
    datasets: [
      {
        label: 'Sentiment Value',
        data: sentimentValues,
        borderColor: 'rgba(128, 209, 141, 255)',
        tension: 0.1,
        pointRadius: 2, // Make points clickable
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(128, 209, 141, 0.2)',
        pointBorderColor: 'rgba(128, 209, 141, 0.2)',
        pointHoverBackgroundColor: 'rgba(128, 209, 141, 255)',
        pointHoverBorderColor: 'rgba(128, 209, 141, 255)',
        showLine: false,
      },
      {
        label: 'Moving Average',
        data: movingAverageValues,
        borderColor: 'rgba(128, 209, 141, 255)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 1, // Hide points for the moving average line
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
      crosshairLine: {
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
          color: (context: { tick: { value: number } }) => (context.tick.value === 0 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'),
          lineWidth: (context: { tick: { value: number } }) => (context.tick.value === 0 ? 2 : 1),
        },
      },
    },
    onClick: (event: ChartEvent, elements: { index: number }[]) => {
      if (elements.length > 0) {
        const index = elements[0].index; // Get the clicked data point index
        const timestamp = timestamps[index]; // Get the corresponding timestamp in seconds
        onTimestampClick(timestamp); // Update video time
      }
    },
  };

  // Custom plugin for vertical line
  const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw: (chart: Chart) => {
      // Get the tooltip model
      const tooltipModel = chart.tooltip;
      
      // If tooltip is not active, don't draw anything
      if (!tooltipModel || !tooltipModel.opacity) {
        return;
      }
      
      // Get the active elements
      const activeElements = tooltipModel.dataPoints || [];
      
      if (activeElements.length > 0) {
        const ctx = chart.ctx;
        const activePoint = activeElements[0];
        const x = activePoint.element.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(128, 209, 141, 0.5)';
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  ChartJS.register(verticalLinePlugin);

  return (
    <div className="flex w-full h-full box-border pl-6 pr-6 py-2">
      <div className="w-full h-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SentimentGraph;