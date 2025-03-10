import { FC, useEffect, useRef } from 'react';
import { PolarArea } from 'react-chartjs-2';
// import { MoreVertical } from 'react-feather';
import imgvirement from '../../assets/new_images/virement.png'

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem
} from 'reactstrap';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, RadialLinearScale, ArcElement } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, RadialLinearScale, ArcElement);

interface ChartjsPolarAreaChartProps {
  primary: string;
  greyColor: string;
  labelColor: string;
  yellowColor: string;
  infoColorShade: string;
  warningColorShade: string;
  successColorShade: string;
}

const ChartjsPolarAreaChart: FC<ChartjsPolarAreaChartProps> = ({
  primary,
  greyColor,
  labelColor,
  yellowColor,
  infoColorShade,
  warningColorShade,
  successColorShade
}) => {
  const chartRef = useRef<any>(null);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45
      }
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 25,
          boxWidth: 9,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  };

  const data = {
    labels: ['Retrait par cheque de guichet - PAR', 'Admin', "commercail", "autre"],
    datasets: [
      {
        borderWidth: 0,
        label: 'Nombre',
        data: [19, 17.5, 15, 13.5, 12],
        backgroundColor: [primary, yellowColor, warningColorShade, infoColorShade, greyColor, successColorShade]
      }
    ]
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader className='flex justify-between items-center align-items-start md:flex-row flex-col'>
        <CardTitle tag='h4' className='font-bold text-2xl'>Client</CardTitle>
        <img src={imgvirement} className="w-9 h-9"/>
    
      </CardHeader>
      <CardBody>
        <div style={{ height: '350px' }}>
          <PolarArea ref={chartRef} data={data} options={options} height={350} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsPolarAreaChart;