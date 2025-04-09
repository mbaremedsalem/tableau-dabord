import { useGetClientsStats } from "../../Services/Admin/useGetStatsClients";
import { useGetStatsGuichet } from "../../Services/Admin/useGetStatsGuichet";
import { useGetStatsVirementExterne } from "../../Services/Admin/useGetStatsVirementExterne";
import { useGetStatsVirementInterne } from "../../Services/Admin/useGetStatsVirementInterne";
import { useGetComptesStats } from "../../Services/Admin/usetGetStatsComptes";
// import Spinner from "../../ui/Spinner";
import StatBox from "../../ui/StatBox";
import HomeSkeleton from "./HomeSkelleton";
import ChartCompte from "./Recharts/ChartCompte";
import ChartGuichet from "./Recharts/ChartGuichet";
import ChartClientNew from "./Recharts/RechartClientNew";
import ChartDepot from "./Recharts/RechartDepot";
import ChartjsRadarChart from "./Recharts/RechartVirements";

const AdminNouadhibou = () => {
          const {data:Comptes, isPending:isPendingComptes} = useGetComptesStats("00002")
          const {data:Clients, isPending:isPendingClient} = useGetClientsStats("00002")
          const {data:VirementInterne, isPending:isPendingVirement} = useGetStatsVirementInterne("00002")
          const {data:VirementExterne, isPending:isPendingExterne} = useGetStatsVirementExterne("00002")
          const {data:Guichet, isPending:isPendingGuichet} = useGetStatsGuichet("00002")
          
    
    const stats = [
        
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
          value: VirementExterne?.count,
          desc : ""

        },
        {
          label: "Parc Comptes",
          value: Comptes?.count,
          valueDepot: Comptes?.total_posdev,
          desc : "Total Depot",
        
        },
        {
            label: ("Guichet"),
            value: Guichet?.count,
          desc : ""

          },
      ];
      

      // if(isPendingClient || isPendingComptes || isPendingVirement || isPendingGuichet || isPendingExterne){
      //   return (<Spinner center={true}/>)
      // } 
    return (
    <div className="mt-4">
        {(isPendingClient || isPendingComptes || isPendingVirement || isPendingGuichet || isPendingExterne)? 
      <HomeSkeleton/>
        : 
        <div className="mt-[29px] mb-[18px] flex items-center justify-between gap-x-[27px] pb-[21px] border-b border-[#eeeeee] max-min-w:flex max-min-w:flex-wrap gap-y-3">
        {stats?.map((el) => {
          return <StatBox key={el.label} label={el.label} value={el.value!} desc={el.desc} valueDepot={el.valueDepot} />;
        })}
        
      </div>}
      <div className="  max-min-w:grid-cols-1 grid grid-cols-2 gap-8">
  <div className="p-8 bg- rounded-xl shadow-2xl border-t-2 border-green-500">

  {/* <ChartjsPolarAreaChart
        labelColor="#6E6B7B"
        agence = "00002"
        nameAgence="ndb"
       
      /> */}
       <ChartClientNew  
        agence = "00002"
        nameAgence="ndb"/>

  
  </div>


    <div className="p-8 bg- rounded-xl shadow-2xl border-t-2 border-green-500">
       <ChartjsRadarChart 
        tooltipShadow="rgba(0, 0, 0, 0.2)"
        successColorShade="#28C76F"
        warningLightColor="#FF9F43"
        primary="#7367F0"
        agence="00002"
        nameAgence="ndb"
      />
      </div>
      <div className="p-8 bg- rounded-xl shadow-2xl border-t-2 border-green-500 mt-4">
       <ChartDepot agence="00002"/>
      </div>
      <div className="p-8 bg- rounded-xl shadow-2xl border-t-2 border-green-500 mt-4">
       <ChartCompte agence={"00002"} nameAgence="ndb"/>
      </div>
      
  </div>
  <div className="grid grid-cols-1 p-8 bg- rounded-xl shadow-2xl border-t-2 border-green-500 mt-7">
  <ChartGuichet agence="00001" nameAgence="ndb"/>

      </div>
  <div>
    
  </div>
  <div>
  </div>
   
        
    
    </div>)

}


export default AdminNouadhibou