
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useLogout } from '../Services/Auth/useLogout';
import {AnimatePresence, motion} from 'framer-motion'
import { FaEyeSlash } from "react-icons/fa";

import { CiLogout } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";
import { MdOutlineModeNight } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineLocalAtm } from "react-icons/md";
import { CgInternal } from "react-icons/cg";
import { CgExternal } from "react-icons/cg";
import { MdAccountBalance } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import right from "../assets/new_images/CaretRight.png"
import right1 from "../assets/new_images/Vector.png"

import { MdSpaceDashboard } from "react-icons/md";
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';
type props ={
    setIsNuitFromSide :(value:boolean)=>void
    handleHideSide : (value:boolean) =>void
    isHide:boolean
}
export  const navsItems = [
  {
      id:1,
      name:"Dashboard",
      logo:<MdSpaceDashboard  size={22}/>,
      link:"/"

  },
  {
      id:2,
      name:"Comptes",
      logo:<MdAccountBalance  size={22} />,
      link:"/comptes"
  },
 
  {
      id: 3,
      name: "Virement",
      logo: <GrTransaction  size={22} />,
      isDropdown: true, 
      subItems: [
          { id: 31, name: "Interne", link: "/virement/interne",  logo: <CgInternal  size={22} />, },
          { id: 32, name: "Externe", link: "/virement/externe",  logo: <CgExternal  size={22} />, }
      ]
  },
  {
      id:4,
      name:"Guichet",
      logo:<MdOutlineLocalAtm  size={22}/>,
      link : "/guichet"
  },
  {
    id:5,
    name:"Clients",
    logo:<PiUsersThree  size={22} />,
    link : "/clients"
}
]

const Sidebar = ({setIsNuitFromSide, handleHideSide}:props) => {
  const { mutate: logoutFunction } = useLogout();
//   const [isNuit, setisNuit] = useState(false)
  const [isNuit, setIsNuit] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [isHide, setisHide] = useState(false)


  const onclickHideSide = () => {
    setisHide(!isHide)
    handleHideSide(!isHide)
  }
  

 
   
    const isActive = ( link: string ) => {
      if (link === "/" && location.pathname === "/") {
        return true;
      }
      return link !== "/" && location.pathname.startsWith(link);
    };
   

   
      
      useEffect(() => {
        const activeIndex = navsItems.findIndex((nav) =>
          location.pathname.startsWith(nav.link!)  
        );
        if (activeIndex !== -1) {
        }
      }, [location.pathname]);

      useEffect(() => {
        const matchingSubItem = navsItems.find(item => 
          item.isDropdown && item.subItems?.some(subItem => 
            location.pathname.startsWith(subItem.link)
          )
        );
        if (matchingSubItem) {
          setOpenDropdown(navsItems.indexOf(matchingSubItem))
        } else {
          setOpenDropdown(null)
        }
      }, [location.pathname]);

      useEffect(() => {
        if (isNuit) {
          document.body.classList.add("dark");
          localStorage.setItem("theme", "dark");
        localStorage.setItem("darkMode", isNuit.toString());
        

        } else {
          document.body.classList.remove("dark");
          localStorage.setItem("theme", "white");
        localStorage.setItem("darkMode", isNuit.toString());

        }
        localStorage.setItem("darkMode", isNuit.toString());
        setIsNuitFromSide(isNuit);
      }, [isNuit, setIsNuitFromSide]);
    

    
      const [openDropdown, setOpenDropdown] = useState<number | null>(null);

      const handleNavClick = (index: number) => {
        if (navsItems[index].isDropdown) {
          
            setOpenDropdown((prev) => (prev === index ? null : index)); 
        } else {

        localStorage.setItem("activeMenuIndex", index.toString());
        setOpenDropdown(null)
            
        }
    };

    const handleSubItemClick = (subItemId: number) => {
      localStorage.setItem("activeMenuIndex", subItemId.toString());

  };
    const {i18n} = useTranslation()

      const handleLogout = () => {
        logoutFunction();
        localStorage.removeItem("activeMenuIndex");
        localStorage.removeItem("darkMode");
        window.location.href = "/login";
      }
    return(
        <AnimatePresence mode='popLayout'  >
            <motion.div
      
         transition={{duration:2}}
      
        
     
        className={`custom-scrollbar  fixed top-[80px] bottom-4 w-[205px]  p-4 rounded-r-xl  overflow-y-auto ${isNuit? "bg-gray-800" : "bg-white"} `}>
      <ul className="flex flex-col items- gap-y-1">
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
        
        {/* <img className="w-7 h-7" src={item.logo} alt={`${item.name} icon`} /> */}
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
                // activeSubItem === subItem.id  
                isActive(subItem.link)
                ? 
                "text-white bg-main-color" : ""
                } 
                gap-x-4 px-4 py-2 text-sm rounded-md hover:text-black  hover:bg-gray-200 transition-all`}>
                {/* <img className='w-7 h-7' src={subItem.logo}/> */}
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

        
        <div className='space-x-3 curs flex items-center gap-x-[15px]  py-[8px]  justify-center'>
            {/* <img src={jour} className='h-7'/> */}
            <MdLightMode />

            <Switch
            checked={isNuit}
            
            onChange={(checked) => setIsNuit(checked)}
            style={{
                backgroundColor: isNuit ? '#1C8244' : 'gray' 
            }}
            />
            {/* <img src={nuit} className='h-7'/> */}
            <MdOutlineModeNight />




        </div>
        <div className='pl-[17px] w-[200px]   flex items-center justify-center  p-5 border-r-4 border-main-color'>
            <div className='flex  gap-x-[16.5px] space-x-2 justify-center cursor-pointer'
            onClick={onclickHideSide}>
            {/* <img src={cacher} className='h-7'/> */}
            <FaEyeSlash size={20}/>
                <span className='text-[13px]'>Masquer la barre</span>

            </div>
       
        </div>
        {/* <li className="mt-auto">
          <button
            className={`absolute bottom-0 left-[17px] flex items-center text-[#707070] text-[13px] gap-x-[16.5px] px-[19px] py-[7px] transition-all duration-300 hover:bg-[#f3f2ed] hover:text-black rounded-[11px]`}
            onClick={handleLogout}
          >
            <img src={logout} alt="Logout icon" />
            <span>{t("sidebar.logout")}</span>
          </button>
        </li> */}
        <li className={`mt-auto ${navsItems.length > 5 ? "" : "absolute bottom-0 left-[17px]"}`}>
  <button
    className="flex items-center text-[#707070] text-[13px] gap-x-[16.5px] px-[19px] py-[7px] transition-all duration-300 hover:bg-[#f3f2ed] hover:text-black rounded-[11px]"
    onClick={handleLogout}
  >
    <CiLogout size={23}/>
    <span className='text-[13px]'>{"Logout"}</span>
  </button>
</li>
      </ul>
    </motion.div>
        </AnimatePresence>
        
    )
}

export default Sidebar