import { AnimatePresence, motion } from "framer-motion"


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useLogout } from '../Services/Auth/useLogout';

import right from "../assets/new_images/CaretRight.png"
import right1 from "../assets/new_images/Vector.png"
import logout from "../assets/new_images/logout.png"

import nuit from "../assets/new_images/mode-nuit.png"
import jour from "../assets/new_images/mode-jour.png"
import cacher from "../assets/new_images/cacher.png"
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
    // setIsNuitFromSide(isNuit);
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
            ? isNuit
              ? "bg-white border-r-4 border-main-color text-black"
              : "border-r-4 bg-white border-main-color"
            : ""
        } flex items-center gap-x-[16.5px] w-[200px] px-[19px] py-[8px] rounded-[11px] text-[13px] transition-all duration-300 hover:bg-[#f3f2ed] hover:text-black cursor-pointer`}
      >
        
        <img className="w-7 h-7" src={item.logo} alt={`${item.name} icon`} />
        <span className="text-lg">{item.name}</span>
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
                // activeSubItem === subItem.id  
                isActive(subItem.link)
                ? 
                "bg-white text-black" : ""
                } 
                gap-x-4 px-4 py-2 text-sm rounded-md hover:text-black  hover:bg-gray-200 transition-all`}>
                <img className='w-7 h-7' src={subItem.logo}/>
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
            <img src={jour} className='h-7'/>

            <Switch
            checked={isNuit}
            
            onChange={(checked) => setIsNuit(checked)}
            style={{
                backgroundColor: isNuit ? '#1C8244' : 'gray' 
            }}
            />
            <img src={nuit} className='h-7'/>


        </div>
        <div className='pl-[17px]  flex items-center   p-5 border-r-4 border-main-color' 
        onClick={handlecancel}>
            <div className='flex  gap-x-[10.5px] space-x-2 justify-center cursor-pointer'
            >
            <img src={cacher} className='h-5'/>
                <span className="text-[13px]">Hide Sidebar</span>

            </div>
       
        </div>
        
        <li className={`mt-auto ${navsItems.length > 5 ? "" : "-mt-5"}`}>
  <button
    className="flex items-center text-[#707070] text-[13px] gap-x-[16.5px] px-[19px] py-[7px] transition-all duration-300 hover:bg-[#f3f2ed] hover:text-black rounded-[11px]"
    onClick={handleLogout}
  >
    <img src={logout} className='w-7 h-7' alt="Logout icon" />
    <span className='text-[13px]'>{"Logout"}</span>
  </button>
</li>
      </ul>
    </motion.div>
        </AnimatePresence>
    )
}

export default SideMenu