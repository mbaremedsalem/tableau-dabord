import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useLogout } from '../Services/Auth/useLogout';
import { MdOutlineModeNight } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import right from "../assets/new_images/CaretRight.png"
import right1 from "../assets/new_images/Vector.png"
import { Switch } from 'antd';
import { navsItems } from "./Sidebar";
import { useTranslation } from "react-i18next";
type props = {
    handlecancel: ()=>void,
    isNuit?:boolean
    setIsNuitFromSide :(value:boolean)=>void
}

function SideMenu ({handlecancel}:props){
  const { mutate: logoutFunction } = useLogout();

    const [isNuit, setIsNuit] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
      });


  const {i18n} = useTranslation()
   
  const isActive = ( link: string ) => {
    if (link === "/" && location.pathname === "/") {
      return true;
    }
    return link !== "/" && location.pathname.startsWith(link);
  };

useEffect(() => {
    const activeIndex = navsItems.findIndex((nav) => nav.link === location.pathname);
    if (activeIndex !== -1) {
      // setActive(activeIndex);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isNuit) {
      document.body.classList.add("dark");
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", isNuit.toString());
    

    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "white");
    localStorage.setItem("darkMode", isNuit.toString());

    }
    localStorage.setItem("darkMode", isNuit.toString());
  }, [isNuit]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const handleSubItemClick = (subItemId: number) => {
    handlecancel()
    localStorage.setItem("activeMenuIndex", subItemId.toString());

};

  const handleNavClick = (index: number) => {

    if (navsItems[index].isDropdown) {
      
        setOpenDropdown((prev) => (prev === index ? null : index)); 
    } else {

    localStorage.setItem("activeMenuIndex", index.toString());
    setOpenDropdown(null)
    handlecancel()
        
    }
};
  const handleLogout = () => {
    logoutFunction();
    localStorage.removeItem("activeMenuIndex");
    localStorage.removeItem("darkMode");
    window.location.href = "/login";
  };
    
    return (
        <AnimatePresence mode='popLayout'  >
            <motion.div
     
        
     
        className={` ${isNuit ? "dark-mode" : ""} `}>
      <ul className="flex flex-col  gap-y-4">
      {navsItems.map((item, index) => (
  <li key={index}>
    <div className='' onClick={() => handleNavClick(index)}>
      
      <Link to={item.link!}>
      <div
        className={`${
          isActive(item.link!)
            ? "text-white bg-main-color"
            : ""
        } flex items-center gap-x-[16.5px]  px-[19px] py-[8px] rounded-[11px] text-[13px] transition-all duration-300 hover:bg-[#f3f2ed] hover:text-black cursor-pointer`}
      >
        
        {item.logo}
        <span className="text-[14px]">{item.name}</span>
        {item.name === "Virement" &&  <img className={`${isNuit?'' : ''}`} src={isNuit?right:right1} alt={`${item.name} icon`} />}
      </div>
      </Link>
    </div>
    {(item.isDropdown && openDropdown === index)  &&   (
      <ul className={`${i18n.language === "ar" ? "mr-8 "  : "ml-8 "}mt-2  space-y-2 `}>
        {item.subItems?.map((subItem) => (
          <li key={subItem.id}>
            <Link to={subItem.link}>
              <div onClick={() => handleSubItemClick(subItem.id)}  
               className={`flex items-center  
               ${
                isActive(subItem.link)
                ? 
                "text-white bg-main-color" : ""
                } 
                gap-x-4 px-4 py-2 text-sm rounded-md hover:text-black  hover:bg-gray-200 transition-all`}>
                {subItem.logo}
                <span>{subItem.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </li>
))}
  <div className={`space-x-3 curs flex items-center gap-x-[15px]   py-[8px] pl-5 `}>
            <MdLightMode />

            <Switch
            checked={isNuit}
            
            onChange={(checked) => setIsNuit(checked)}
            style={{
                backgroundColor: isNuit ? '#1C8244' : 'gray' 
            }}
            />
    <MdOutlineModeNight />
        </div>
        <div className='pl-[17px]  flex items-center   p-5 border-r-4 border-main-color' 
        onClick={handlecancel}>
            <div className='flex  gap-x-[10.5px] space-x-2 justify-center cursor-pointer'
            >
                            <FaEyeSlash size={20}/>
                
                <span className='text-[13px]'>Masquer la barre</span>


            </div>
       
        </div>
        
        <li className={`mt-auto ${navsItems.length > 5 ? "" : "-mt-5"}`}>
  <button
    className="flex items-center text-[#707070] text-[13px] gap-x-[16.5px] px-[19px] py-[7px] transition-all duration-300 hover:bg-[#f3f2ed] hover:text-black rounded-[11px]"
    onClick={handleLogout}
  >
      <CiLogout size={23}/>
        <span className='text-[13px]'>{"Déconnecter"}</span>
  </button>
</li>
      </ul>
    </motion.div>
        </AnimatePresence>
    )
}

export default SideMenu