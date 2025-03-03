
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useLogout } from '../Services/Auth/useLogout';
import {AnimatePresence, motion} from 'framer-motion'
import home from "../assets/new_images/home.png"
import guichet from "../assets/new_images/guichet.png"
import virement from "../assets/new_images/virement.png"
import right from "../assets/new_images/CaretRight.png"
import right1 from "../assets/new_images/Vector.png"
import compte from "../assets/new_images/compte.png"
import logout from "../assets/new_images/logout.png"

import nuit from "../assets/new_images/mode-nuit.png"
import jour from "../assets/new_images/mode-jour.png"
import cacher from "../assets/new_images/cacher.png"
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';
type props ={
    setIsNuitFromSide :(value:boolean)=>void
    handleHideSide : (value:boolean) =>void
    isHide:boolean
}

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
  // const [activeSubItem, setActiveSubItem] = useState<number | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<number>(() => {
    const savedIndex = localStorage.getItem("activeMenuIndex");
    console.log("savedIndex : ", savedIndex)
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

    const navsItems = [
        {
            id:1,
            name:"Dashboard",
            logo:home,
            link:"/"

        },
        {
            id:2,
            name:"Comptes",
            logo:compte,
            link:"/comptes"
        },
       
        {
            id: 3,
            name: "Virement",
            logo: virement,
            isDropdown: true, 
            subItems: [
                { id: 31, name: "Interne", link: "/virement/interne",  logo: virement, },
                { id: 32, name: "Externe", link: "/virement/externe",  logo: virement, }
            ]
        },
        {
            id:4,
            name:"Guichet",
            logo:guichet,
            link : "/guichet"
        }
    ]
    const [active, setActive] = useState<number>(() => {
        const savedIndex = localStorage.getItem("activeMenuIndex");
        console.log("savedIndex : ", savedIndex)
        return savedIndex ? parseInt(savedIndex, 10) : 0;
      });

    useEffect(() => {
        const activeIndex = navsItems.findIndex((nav) => nav.link === location.pathname);
        if (activeIndex !== -1) {
          setActive(activeIndex);
          setActiveSubItem(activeIndex)
        }
      }, [location.pathname]);
      

      useEffect(() => {
        // console.log("is change : ", isNuit)
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
    
    //   const handleNavClick = (index: number) => {
    //     setActive(index);
    //     localStorage.setItem("activeMenuIndex", index.toString());
    //   };
    
      const [openDropdown, setOpenDropdown] = useState<number | null>(null);

      const handleNavClick = (index: number) => {
        console.log("index est : ", index)
        if (navsItems[index].isDropdown) {
          
          console.log("in drop :", index)
            setOpenDropdown((prev) => (prev === index ? null : index)); 
        } else {
          console.log("in drop :", index)

            // setActive(index);
            // localStorage.setItem("activeMenuIndex", index.toString());

            setActive(index);
        setActiveSubItem(null!);
        localStorage.setItem("activeMenuIndex", index.toString());
        setOpenDropdown(null)
            
        }
    };

    const handleSubItemClick = (subItemId: number) => {
      localStorage.setItem("activeMenuIndex", subItemId.toString());

      setActiveSubItem(subItemId);
      setActive(null!);
  };
    const {i18n} = useTranslation()

      const handleLogout = () => {
        logoutFunction();
        localStorage.removeItem("activeMenuIndex");
        localStorage.removeItem("darkMode");
        window.location.href = "/login";
      };
    //   initial={isMobile? {  y:-240,scale:0 , opacity:0} : {  y:230, scale:0.001}}
    //                       animate={selectedIcon === 1  && isInView ? (isMobile?{ opacity: 1, y: -50, x:0, scale: 1 } : {opacity: 1, y: 0, scale: 1}) : {}}
    //                       transition={{duration : 0.5}}
    return(
        <AnimatePresence mode='popLayout'  >
            <motion.div
        //  initial={isHide?{x:0, scale:0}:""}
        //  animate={isHide?{x:"-100vw", scale:1} : {x:0, scale:1}}
         transition={{duration:2}}
      
        
     
        className={`custom-scrollbar  fixed top-[80px] bottom-4 w-[215px]  overflow-y-auto  `}>
      <ul className="flex flex-col items-center gap-y-4">
      {navsItems.map((item, index) => (
  <li key={index}>
    <div className='' onClick={() => handleNavClick(index)}>
      
      <Link to={item.link!}>
      <div
        className={`${
          active === index
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
    {item.isDropdown && openDropdown === index &&  (
      <ul className={`${i18n.language === "ar" ? "mr-8 "  : "ml-8 "}mt-2  space-y-2 `}>
        {item.subItems?.map((subItem) => (
          <li key={subItem.id}>
            <Link to={subItem.link}>
              <div onClick={() => handleSubItemClick(subItem.id)}   className={`flex items-center  ${activeSubItem === subItem.id  ? "bg-white text-black" : ""}  gap-x-4 px-4 py-2 text-sm rounded-md hover:text-black  hover:bg-gray-200 transition-all`}>
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

        
        <div className='space-x-3 curs flex items-center gap-x-[15px]  py-[8px] w-[200px] justify-center'>
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
        <div className='pl-[17px] w-[200px]   flex items-center justify-center  p-5 border-r-4 border-main-color'>
            <div className='flex  gap-x-[16.5px] space-x-2 justify-center cursor-pointer'
            onClick={onclickHideSide}>
            <img src={cacher} className='h-7'/>
                <span>Hide Sidebar</span>

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
    <img src={logout} className='w-7 h-7' alt="Logout icon" />
    <span className='text-lg'>{"Logout"}</span>
  </button>
</li>
      </ul>
    </motion.div>
        </AnimatePresence>
        
    )
}

export default Sidebar