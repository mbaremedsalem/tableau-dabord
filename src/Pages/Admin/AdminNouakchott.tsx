import { Spinner } from "reactstrap";
import { useGetClientsStats } from "../../Services/Admin/useGetStatsClients";
import { useGetStatsGuichet } from "../../Services/Admin/useGetStatsGuichet";
import { useGetStatsVirementInterne } from "../../Services/Admin/useGetStatsVirementInterne";
import { useGetComptesStats } from "../../Services/Admin/usetGetStatsComptes";
import StatBox from "../../ui/StatBox";
import ChartjsPolarAreaChart from "./ChartNew";
import ChartjsRadarChart from "./Rechart";



const AdminNouakchott = () => {
          const {data:Comptes, isPending:isPendingComptes} = useGetComptesStats("00001")
          const {data:Clients, isPending:isPendingClient} = useGetClientsStats("00001")
          const {data:VirementInterne, isPending:isPendingVirement} = useGetStatsVirementInterne("00001")
          const {data:Guichet, isPending:isPendingGuichet} = useGetStatsGuichet("00001")
          
    
    const stats = [
        {
          label: "Parc Comptes",
          value: Comptes?.count,
          valueDepot: Comptes?.total_posdev,
          desc : "Total Depot",
        
        },
        {
          label: 'Clients',
          value: Clients?.count,
          desc : ""

        },
        {
          label: "Virements Internes",
          value: VirementInterne?.count,
          desc : ""

        },
        {
          label: ("Virement Externe"),
          value: 340,
          desc : ""

        },
        {
            label: ("Guichet"),
            value: Guichet?.count,
          desc : ""

          },
      ];
      // const data02 = [
      //   {
      //     "name": "Group A",
      //     "value": 40,
      //     "color" : "red"
      //   },
      //   {
      //     "name": "Group B",
      //     "value": 10
      //   },
      //   {
      //     "name": "Group C",
      //     "value": 10
      //   },
      //   {
      //     "name": "Group D",
      //     "value": 5
      //   },
      //   {
      //     "name": "Group E",
      //     "value": 5
      //   },
      //   {
      //     "name": "Group F",
      //     "value": 10
      //   }
      // ];

      if(isPendingClient || isPendingComptes || isPendingVirement || isPendingGuichet){
        return (<Spinner center={true}/>)
      }
    return (
    <div className="mt-4">
        <div className="mt-[29px] mb-[18px] flex items-center justify-between gap-x-[27px] pb-[21px] border-b border-[#eeeeee] max-min-w:flex max-min-w:flex-wrap gap-y-3">
        {stats?.map((el) => {
          return <StatBox key={el.label} label={el.label} value={el.value!} desc={el.desc} valueDepot={el.valueDepot} />;
        })}
      </div>
      <div className="  max-min-w:grid-cols-1 grid grid-cols-2 gap-8">
  <div className="p-8 bg- rounded-xl shadow-2xl border-t-2 border-green-500">
  {/* <PieChart width={400} height={400}>
    <Pie  data={data02} dataKey="value" nameKey="name"  cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="green" label  />
  </PieChart> */}
  <ChartjsPolarAreaChart
        primary="#7367F0"
        greyColor="#BEBEBE"
        labelColor="#6E6B7B"
        yellowColor="#FF9F43"
        infoColorShade="#00CFE8"
        warningColorShade="#FF9F43"
        successColorShade="#28C76F"
      />
  
  </div>


    <div className="p-8 bg- rounded-xl shadow-2xl border-t-2 border-green-500">
       <ChartjsRadarChart 
        tooltipShadow="rgba(0, 0, 0, 0.2)"
        successColorShade="#28C76F"
        warningLightColor="#FF9F43"
        primary="#7367F0"
      />
      </div>
   
  </div>
   <div className="p-8 bg- rounded-xl shadow-2xl border-t-2 border-green-500"> 
    <ChartjsRadarChart 
        tooltipShadow="rgba(0, 0, 0, 0.2)"
        successColorShade="#28C76F"
        warningLightColor="#FF9F43"
        primary="#7367F0"
      />
      </div>
      
        <div style={{ padding: '20px' }}>
      <ChartjsPolarAreaChart
        primary="#7367F0"
        greyColor="#BEBEBE"
        labelColor="#6E6B7B"
        yellowColor="#FF9F43"
        infoColorShade="#00CFE8"
        warningColorShade="#FF9F43"
        successColorShade="#28C76F"
      />
    </div>
    {/* <div className="mb-8">
  <ChartRepere
    // key={Date.now()} // Utilisez une clé unique pour forcer le re-rendu
    success="#28a745"
    gridLineColor="#e0e0e0"
    labelColor="#333"
  />
</div> */}
    </div>)

}


export default AdminNouakchott