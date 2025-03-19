import { useEffect, useState } from "react";
import Toggle from "../../../ui/Toggle";
import NouakchottExterne from "./NouakchottExterne";
import NouadhibouExterne from "./NouadhibouExterne";




const VirementExterne =() => {
  
  
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
        <h1 className="font-semibold">Virement Externe </h1>

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
            <NouakchottExterne /></>

        ) :
        <>
            <hr className="mt-4"/>
            <NouadhibouExterne/>
            </> }
      </div>
         </div>
        
    )
}

export default VirementExterne