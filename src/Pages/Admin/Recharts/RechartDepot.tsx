import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { ChartOptions, ChartData } from "chart.js";
import imgdepot from '../../../assets/new_images/donation.png'
import Spinner from "../../../ui/Spinner";
import { useGetChartsDepots } from "../../../Services/charts/useGetDepot";
// ** Enregistrer les composants nécessaires **
ChartJS.register(ArcElement, Tooltip, Legend);
type props = {
  agence : string
}

const ChartDepot = ({agence}:props) => {
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


    const {data:Depot, isPending:isPendingDepot} = useGetChartsDepots(agence)
    // const {data:virementExterne, isPending:isPendingVirementExterne} = useGetStatsVirementExterne("00001")
    // console.log("VirementInterne : ", VirementInterne)
    // console.log("Virement externe : ", virementExterne)
    const colors = [
        "#7367F0", "#89785A", "#00BFFF", "#FF9F43", "#33FFBD", "#FFD700", "#800080", "#C0C0C0", "#005f6B", "#000000", "#FF69BA","#8B4513"
    ]
  
  const data: ChartData<'doughnut'> = {
    labels: Depot ? Depot.map(client=>client.Produit) : [],
    datasets: [
      {
        data: Depot ? Depot.map(client=>client.Nombre) : [],
        backgroundColor: ["#7367F0", "#89785A", "#00BFFF", "#FF9F43", "#33FFBD", "#FFD700", "#800080", "#C0C0C0", "#005f6B", "#000000", "#FF69BA","#8B4513"],
        borderWidth: 0,
      },
    ],
  };
  if( isPendingDepot){
    return (<Spinner center={true}/>)
  }
console.log("colors[2] : ", colors[0])
  return (
    <Card className="flex flex-col items- justify-center mt-5 ">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between space-x-2 mb-5">
            <span className="font-bold text-2xl">Depots</span>
            <img src={imgdepot} className="w-9 h-9"/>
          </div>
        </CardTitle>
        
      </CardHeader>
      <CardBody className="">
        <div style={{ height: 290 }}>
          <Doughnut data={data} options={options} />
        </div>
      <div className="flex flex-col items-center">
      <div className="flex justify-between mt-3 mb-1">
        
        </div>
        <div className="flex flex-wrap space-x-3 items-center justify-center ">
            {Depot?.map((depot, index)=>{
                return (
                    <div key={index} className="flex justify-between mb-1 ">
                    <div className="flex items-center text-justify cursor-pointer">
                      <div 
                        style={{ backgroundColor: colors[index] }}
                      className={`w-4 h-4  rounded-full`}></div>
                      <span className="font-bold ml-2 mr-1">{depot.Produit}</span>
                      <span> - </span>
                      <span> {depot.Nombre} - Depot : {depot.Depot} </span>
                    </div>
                  </div>
                )
            })}
        </div>
        {/* <div className="flex justify-between mb-1">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="font-bold ml-2 mr-1">Interne</span>
            <span> - </span>
            <span> 400 </span>
          </div>
        </div> */}
       
      </div>
      </CardBody>
    </Card>
  );
};

export default ChartDepot;