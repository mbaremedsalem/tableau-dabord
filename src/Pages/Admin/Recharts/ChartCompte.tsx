import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { ChartOptions, ChartData } from "chart.js";
import imgdepot from '../../../assets/new_images/compte.png'
import Spinner from "../../../ui/Spinner";
import { useGetChartsComptes } from "../../../Services/charts/useGetChartComptes";
import { Link, useNavigate } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

type props = {
  agence : string,
  nameAgence : string,
}
const ChartCompte = ({agence, nameAgence}:props) => {
  const {data:Depot, isPending:isPendingDepot} = useGetChartsComptes(agence)
const navigate = useNavigate()
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
    onClick: (event: any, elements: any) => {
      console.log("event : ", event)
      if (elements.length > 0) {
        const index = elements[0].index;
        const clickedLabel = Depot ? Depot[index].libelle : '';
        navigate(`/comptes/?type=${encodeURIComponent(clickedLabel)}&agence=${nameAgence}`);
      }
    },
  };


   
  

    const colors = [
        "#7367F0", "#89785A", "#00BFFF", "#FF9F43", "#33FFBD", "#FFD700", "#800080", "#C0C0C0", "#005f6B", "#000000", "#FF69BA","#8B4513"
    ]
  
  const data: ChartData<'doughnut'> = {
    labels: Depot ? Depot.map(client=>client.libelle) : [],
    datasets: [
      {
        data: Depot ? Depot.map(client=>client.count) : [],
        backgroundColor: ["#7367F0", "#89785A", "#00BFFF", "#FF9F43", "#33FFBD", "#FFD700", "#800080", "#C0C0C0", "#005f6B", "#000000", "#FF69BA","#8B4513"],
        borderWidth: 0,
      },
    ],
  };
  if( isPendingDepot){
    return (<Spinner center={true}/>)
  }
  return (
    <Card className="flex flex-col items- mt-5 ">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between space-x-2 mb-5">
            <span className="font-bold text-2xl">Comptes</span>
            <img src={imgdepot} className="w-9 h-9"/>
          </div>
        </CardTitle>
        
      </CardHeader>
      <CardBody className="">
        <div style={{ height: 290 }}>
          <Doughnut data={data} className="cursor-pointer" options={options} />
        </div>
      <div className="flex flex-col items-center">
      <div className="flex justify-between mt-3 mb-1">
        
        </div>
        <div className="flex flex-wrap space-x-3 items-center  justify-center ">
            {Depot?.map((depot, index)=>{
                return (
                    <div key={index} className="flex justify-between mb-1 ">
                        <Link to={`/comptes?type=${depot.libelle}&agence=${nameAgence}`}>
                    <div className="flex items-center text-justify cursor-pointer">
                      <div 
                        style={{ backgroundColor: colors[index] }}
                      className={`w-4 h-4  rounded-full`}></div>
                      <span className="font-bold ml-2 mr-1">{depot.count}</span>
                     
                    </div>
                    </Link>
                  </div>
                )
            })}
        </div>
       
       
      </div>
      </CardBody>
    </Card>
  );
};

export default ChartCompte;