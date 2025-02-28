import { useState } from "react";
import Toggle from "../../../ui/Toggle";
import NouakchottInterne from "./NouackchottInterne";
import NouadhibouInterne from "./NouadhibouInterne";


const VirementInterne =() => {
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
            <NouakchottInterne/></>

        ) :
        <>
            <hr className="mt-4"/>
            <NouadhibouInterne/>
            </> }
      </div>
         </div>
        
    )
}

export default VirementInterne