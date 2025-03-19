import { useEffect, useState } from "react";
import Toggle from "../../ui/Toggle"
import NouakchottComptes from "./NouakchottComptes";
import NouadhiboutComptes from "./NouadhiboutComptes";


const Compte =() => {


   
      const [type, setType] = useState("");
  const [agence, setAgence] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    const agenceParam = params.get("agence");

    if (typeParam) setType(typeParam);
    if (agenceParam) setAgence(agenceParam);
  }, []);
  useEffect(() => {
    if (agence) {
      setActive(agence === "nktt" ? 0 : 1);
    }
  }, [agence]); 
  console.log("agence : ", agence)
  const [active, setActive] = useState<number>(agence==="nktt" ? 0 : 1);

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
          
            <NouakchottComptes typeC={type}/></>

        ) :
        <>
            <hr className="mt-4"/>
            <NouadhiboutComptes typeC={type}/></> }
      </div>
         </div>
        
    )
}

export default Compte