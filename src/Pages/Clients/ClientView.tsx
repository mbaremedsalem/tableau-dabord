import { useEffect, useState } from "react";
import Toggle from "../../ui/Toggle"
import NouakchottClients from "./NouakchottClients";
import NouadhibouClients from "./NouadhibouClients";


const ClientView =() => {
   const [agence, setAgence] = useState("");
      useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        // const typeParam = params.get("type");
        const agenceParam = params.get("agence");
    
        // if (typeParam) setType(typeParam);
        if (agenceParam) setAgence(agenceParam);
      }, []);
      useEffect(() => {
        if (agence) {
          setActive(agence === "nktt" ? 0 : 1);
        }
      }, [agence]); 
  const [active, setActive] = useState<number>(0);


    const handleToggleChange = (index: number) => {
        setActive(index);
      };
    return (
        
        <div >
            <div className="flex items-center justify-between">
        <h1 className="font-semibold">Clients</h1>

        <Toggle
          options={["Nouakchott", "Nouadhibou"]}
          activeIndex={active}
          onToggle={handleToggleChange}
        />
      </div>

      <div>
        {active === 0? (
            <>
            <hr className="mt-4"/>
          
            <NouakchottClients/></>

        ) :
        <>
            <hr className="mt-4"/>
            <NouadhibouClients/></> }
      </div>
         </div>
        
    )
}

export default ClientView