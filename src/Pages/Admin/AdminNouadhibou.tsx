import { useGetClientsStats } from "../../Services/Admin/useGetStatsClients";
import { useGetStatsGuichet } from "../../Services/Admin/useGetStatsGuichet";
import { useGetStatsVirementInterne } from "../../Services/Admin/useGetStatsVirementInterne";
import { useGetComptesStats } from "../../Services/Admin/usetGetStatsComptes";
import Spinner from "../../ui/Spinner";
import StatBox from "../../ui/StatBox";




const AdminNouadhibou = () => {
          const {data:Comptes, isPending:isPendingComptes} = useGetComptesStats("00002")
          const {data:Clients, isPending:isPendingClient} = useGetClientsStats("00002")
          const {data:VirementInterne, isPending:isPendingVirement} = useGetStatsVirementInterne("00002")
                    const {data:Guichet, isPending:isPendingGuichet} = useGetStatsGuichet("00002")
          
    
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
      if(isPendingClient || isPendingComptes || isPendingVirement || isPendingGuichet){
        return (<Spinner center={true}/>)
      }
    return (
    <div>
        <div className="mt-[29px] mb-[18px] flex items-center justify-between gap-x-[27px] pb-[21px] border-b border-[#eeeeee] max-min-w:flex max-min-w:flex-wrap gap-y-3">
        {stats?.map((el) => {
          return <StatBox key={el.label} label={el.label} value={el.value!} desc={el.desc} valueDepot={el.valueDepot} />;
        })}
      </div>
    </div>)

}


export default AdminNouadhibou