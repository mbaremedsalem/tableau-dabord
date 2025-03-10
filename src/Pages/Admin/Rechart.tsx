import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { ChartOptions, ChartData } from "chart.js";
import imgvirement from '../../assets/new_images/virement.png'
// ** Enregistrer les composants nécessaires **
ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartjsRadarChartProps {
  tooltipShadow: string;
  successColorShade: string;
  warningLightColor: string;
  primary: string;
}

const ChartjsRadarChart: React.FC<ChartjsRadarChartProps> = ({
  successColorShade,
  warningLightColor,
}) => {
  const options: ChartOptions<'doughnut'> = {
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(2) + "%";
            return `${label}: ${percentage}`;
          },
        },
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
      },
    },
  };

  const data: ChartData<'doughnut'> = {
    labels: ["Interne", "Externe"],
    datasets: [
      {
        data: [90, 10],
        backgroundColor: [successColorShade, warningLightColor],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center space-x-2 mb-5">
            <span className="font-bold text-2xl">Virements</span>
            <img src={imgvirement} className="w-9 h-9"/>
          </div>
        </CardTitle>
        
      </CardHeader>
      <CardBody className="">
        <div style={{ height: 290 }}>
          <Doughnut data={data} options={options} />
        </div>
      <div className="flex flex-col items-center">
      <div className="flex justify-between mt-3 mb-1">
          {/* <div className="flex items-center">
            <img className="w-7 h-7" src={imgvirement}/>
            <span className="font-bold ml-2 mr-1">Virement</span>
          </div> */}
        </div>
        <div className="flex justify-between mb-1">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="font-bold ml-2 mr-1">Interne</span>
            <span>- 200</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>

            <span className="font-bold ml-2 mr-1">Externe</span>
            <span>- 400</span>
          </div>
        </div>
      </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsRadarChart;