import { ReactNode, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import Container from "../ui/Container";
// import Header from "../ui/Header";
// import Sidebar from "../ui/Sidebar";
import {AnimatePresence, motion} from 'framer-motion'
import eyes from '../assets/new_images/oeil.png'
import { useTranslation } from "react-i18next";
type LayoutProps = {
  children: ReactNode;
};

const PrivateAdminLayout = ({ children }: LayoutProps) => {

  const { i18n} = useTranslation()
    const [isNuit, setIsNuitFromSide] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
      });
      function handleDataFromChild(data: any) {
        setIsNuitFromSide(data);
      }
  const [isHide, setisHide] = useState(false)
  function handleHideSide(data: any) {
    setisHide(data);
  }
  console.log("is hide now: ", isHide)
  return(
    <div className="" dir={i18n.language === "ar" ? "rtl" : "ltr" }>
     <Navbar isNuit={isNuit} setIsNuitFromSide={handleDataFromChild} />
        <div className={` ${isHide? "" : ""} max-min-w:hidden`}> 
    {!isHide && (
      <Sidebar isHide={isHide} setIsNuitFromSide={handleDataFromChild} handleHideSide={handleHideSide}/>
    )}
     </div>
     <div>
     
        <AnimatePresence>
    <motion.main
    
     className={`  ${isHide? "ml-[36px]" :  "ml-[215px]"} max-min-w:ml-[36px]  pt-[97px]  min-h-screen   `}><Container isNuit={isNuit}>{children}</Container></motion.main>
    </AnimatePresence>
     </div>
     {isHide && (
        <motion.div 
        initial={{x:"-100vw", scale:0}}
     animate={{x:0, scale:1}}
     transition={{duration:0.5}}
        className="absolute bottom-1/4 cursor-pointer" onClick={()=>handleHideSide(!isHide)}>
        <div className="bg-main-color w-20 h-16 rounded-r-full flex items-center justify-center">
   <img src={eyes} className="h-9 w-9"/>
        </div>
        </motion.div>
     )}
    <Footer/>
    
    
  </div>
  )
}

export default PrivateAdminLayout;
