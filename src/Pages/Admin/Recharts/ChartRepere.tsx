import { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Calendar } from 'react-feather';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';


interface ChartjsBarChartProps {
  success: string;
  gridLineColor: string;
  labelColor: string;
}
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, RadialLinearScale, ArcElement } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, RadialLinearScale, ArcElement);

const ChartRepere: React.FC<ChartjsBarChartProps> = ({ success, gridLineColor, labelColor }) => {
  const chartRef = useRef<any>(null);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor,
        },
        ticks: { color: labelColor },
      },
      y: {
        min: 0,
        max: 400,
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor,
        },
        ticks: {
          stepSize: 100,
          color: labelColor,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const data = {
    labels: [
      '7/12',
      '8/12',
      '9/12',
      '10/12',
      '11/12',
      '12/12',
      '13/12',
      '14/12',
      '15/12',
      '16/12',
      '17/12',
      '18/12',
      '19/12',
    ],
    datasets: [
      {
        maxBarThickness: 15,
        backgroundColor: success,
        borderColor: 'transparent',
        borderRadius: { topRight: 15, topLeft: 15 },
        data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190],
      },
    ],
  };

//   useEffect(() => {
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, []);
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();  // Destroy the previous chart instance
    }
    // Any additional logic for creating the chart can go here
    // You may also consider triggering a forceUpdate on the component if needed
  }, [data]);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center flex-col sm:flex-row">
        <CardTitle tag="h4">Latest Statistics</CardTitle>
        <div className="flex items-center">
          <Calendar size={14} />
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: '400px' }}>
          <Bar
            ref={chartRef}
            data={data}
            options={options}
            height={400}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartRepere;