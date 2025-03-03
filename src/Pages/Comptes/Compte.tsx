import { useState } from "react";
import Toggle from "../../ui/Toggle"
import NouakchottComptes from "./NouakchottComptes";
import NouadhiboutComptes from "./NouadhiboutComptes";


const Compte =() => {
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
            <NouakchottComptes/></>
            <NouakchottComptes/></>

        ) :
        <>
            <hr className="mt-4"/>
            <Nouadhibou/></> }
      </div>
         </div>
        
    )
}

export default Compte