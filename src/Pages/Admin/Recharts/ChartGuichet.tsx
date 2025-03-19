import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useGetChartsGuichet } from "../../../Services/charts/useGetChartOperation";
import Spinner from "../../../ui/Spinner";
import imgGuichet from "../../../assets/new_images/guichet.png"
import { useNavigate } from "react-router-dom";
type props = {
  agence : string
  nameAgence:string
}
const ChartGuichet = ({agence, nameAgence}:props) => {
  const navigate = useNavigate()

  const { data: OperationGuichet, isPending: isPendingOperation } = useGetChartsGuichet(agence);

 
  const colors = [
    "#7367F0", "#89785A", "#00BFFF", "#FF9F43", "#33FFBD", "#FFD700", "#800080", "#C0C0C0", "#005f6B", "#000000",
    "#FF69BA", "#8B4513", "#FF6347", "#3CB371", "#D2691E", "#8A2BE2", "#FF4500", "#2E8B57", "#F08080", "#FFD700", "#00008B", "#B8860B"
  ];
  const formattedData  = OperationGuichet
  if (isPendingOperation) {
    return <Spinner center={true} />;
  }
  const naviger = (type:string) =>{
    return navigate(`/guichet/?type=${type}&agence=${nameAgence}`)
  }
 
  return (
  <div className="my-6">
    <div className="flex items-center justify-between space-x-2 mb-5">
            <span className="font-bold text-2xl">Guichet</span>
            <img src={imgGuichet} className="w-9 h-9"/>
          </div>
      <ResponsiveContainer width="100%" height={550} className={"my-5 cursor-pointer"} >
    <BarChart data={formattedData} className="mt-7 text-[10px] mb-7 cursor-pointer">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="type_operation" angle={-25} textAnchor="end"/>
      <YAxis />
      <Tooltip />
      <Legend className=""/>
      
      <Bar dataKey="Nombre" className="cursor-pointer">
        {formattedData?.map((entry, index) => (
          <Cell onClick={()=>naviger(entry.type_operation)} key={`cell-${index}`} alphabetic={entry.Nombre} fill={colors[index % colors.length]}
           />
        ))}
      </Bar>
    </BarChart>
    </ResponsiveContainer>
  </div>

  );
};

export default ChartGuichet;
