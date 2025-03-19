import { FC, useEffect, useRef } from 'react';
import { PolarArea } from 'react-chartjs-2';
import users from '../../../assets/new_images/user.png';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from 'reactstrap';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, RadialLinearScale, ArcElement } from 'chart.js';
import { useGetChartsClient } from '../../../Services/charts/Clients/useGetChartClient';
import Spinner from '../../../ui/Spinner';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, RadialLinearScale, ArcElement);

interface ChartjsPolarAreaChartProps {
  labelColor: string;
  agence: string;
  nameAgence:string;

}

const ChartjsPolarAreaChart: FC<ChartjsPolarAreaChartProps> = ({ labelColor, agence, nameAgence }) => {
  const chartRef = useRef<any>(null);
  const navigate = useNavigate(); 

  const { data: ClientChart, isPending: isPendingClient } = useGetChartsClient(agence);
  console.log('charts : ', ClientChart);
  console.log(ClientChart);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45,
      },
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 25,
          boxWidth: 9,
          fontSize: 16,
          color: labelColor,
          usePointStyle: true,
        },
      },
    },
    onClick: (event: any, elements: any) => {
      console.log("event : ", event)
      if (elements.length > 0) {
        const index = elements[0].index;
        const clickedLabel = ClientChart ? ClientChart[index].ageclib : '';
        navigate(`/clients/?type=${encodeURIComponent(clickedLabel)}&agence=${nameAgence}`);
      }
    },
  };

  const data = {
    labels: ClientChart ? ClientChart.map(client => client.ageclib) : [],
    datasets: [
      {
        borderWidth: 0,
        label: 'Nombre',
        data: ClientChart ? ClientChart.map(client => client.count) : [],
        backgroundColor: [
          '#7367F0', '#89785A', '#00BFFF', '#FF9F43', '#33FFBD',
          '#FFD700', '#800080', '#C0C0C0', '#005f6B', '#000000',
          '#FF69BA', '#8B4513',
        ],
      },
    ],
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (isPendingClient) {
    return <Spinner center={true} />;
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-center align-items-start md:flex-row flex-col">
        <CardTitle tag="h4" className="font-bold text-2xl">Clients</CardTitle>
        <img src={users} className="w-9 h-9" />
      </CardHeader>
      <CardBody>
        <div style={{ height: '350px', cursor:"pointer" }} className="text-[12px]">
          <PolarArea
          
            className="text-[12px]"
            ref={chartRef}
            data={data}
            options={options}
            height={350}

          />
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsPolarAreaChart;
