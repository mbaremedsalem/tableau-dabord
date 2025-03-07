import { useState } from "react";
import Toggle from "../../ui/Toggle";
import AdminNouadhibou from "./AdminNouadhibou";
import AdminNouakchott from "./AdminNouakchott";



const Admin =() => {
    
    
        const [active, setActive] = useState<number>(0);
        const handleToggleChange = (index: number) => {
          setActive(index);
        };
   

    return (
        
        <div>

<div className="flex items-center justify-between">
        <h1 className="font-semibold">Home</h1>

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
            <AdminNouakchott/>
          
            
            </>

        ) :
        <>
            <hr className="mt-4"/>
            <AdminNouadhibou/>

            </>
      
      }
      </div>


            <div>
           
            </div>
        </div>
        
    )
}

export default Admin