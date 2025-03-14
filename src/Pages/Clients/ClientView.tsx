import { useState } from "react";
import Toggle from "../../ui/Toggle"
import NouakchottClients from "./NouakchottClients";
import NouadhibouClients from "./NouadhibouClients";


const ClientView =() => {
  const [active, setActive] = useState<number>(0);


    const handleToggleChange = (index: number) => {
        setActive(index);
      };
    return (
        
        <div >
            <div className="flex items-center justify-between">
        <h1 className="font-semibold">Comptes</h1>

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