import { useState } from "react";
import Toggle from "../../../ui/Toggle";
import NouakchottExterne from "./NouakchottExterne";
import NouadhibouExterne from "./NouadhibouExterne";
import { useState } from "react";
import Toggle from "../../../ui/Toggle";
import NouakchottExterne from "./NouakchottExterne";
import NouadhibouExterne from "./NouadhibouExterne";



const VirementExterne =() => {
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
            <NouakchottExterne/></>

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