
import { Dropdown, MenuProps, Modal } from 'antd'
import logo from '../assets/images/image.svg'
// import logoMin from '../assets/images/AUB.png'
import AuthService from '../Auth-services/AuthService'
// import globe from '../assets/new_images/globe.svg'
import { motion} from 'framer-motion'
import menu from '../assets/new_images/menu.png'
import { useState } from 'react'
// import Sidebar from './Sidebar'
import SideMenu from './SideMenu'
import LanguageSwitch from '../ui/LanguageSwitch'

type props = {
    isNuit:boolean
    setIsNuitFromSide :(value:boolean)=>void

}
const Navbar =({isNuit, setIsNuitFromSide}:props) => {
    console.log("isNuit : ", isNuit)
    // const fullName = AuthService.getFullNameUserConnect()
    const items: MenuProps["items"] = [
        {
          label: ("Edit Profile"),
          key: "1",
        //   onClick: () => showModal(),
        },
      ];

      const [isModalOpen, setisModalOpen] = useState(false)
      const handlecancel = () => {
        setisModalOpen(false)
      }

    return(
        <header className={`flex items-center border-b-2 border-main-color 
          fixed z-20 h-[97px]  justify-between w-full px-[27px] pt-[29px] shadow-md ${isNuit? 'bg-gray-800' : 'bg-[#efeeea]'}`}>
            {/* // <header className="flex items-center border-b-2 border-main-color
            //  fixed top-0 left-0 z-20 h-[97px] w-full px-[27px] pt-[29px] bg-white shadow-md"> */}

      <div className=' flex items-center justify-center  ' >
        <img src={logo}  alt="logo" className='max-min-w:hidden w-40 h-40 ' />
        {/* <img src={logoMin} alt="logo" className='w-12 h-12 min-w:hidden' /> */}
        <img src={menu} className="h-10 w-10 min-w:hidden cursor-pointer " onClick={()=>setisModalOpen(true)}/>

      </div>
      <motion.div 
        initial={{x:"-100vw", scale:0}}
     animate={{x:0, scale:1}}
     transition={{duration:0.5}}
        className=" cursor-pointer min-w:hidden"
        //  onClick={()=>handleHideSide(!isHide)}
         >
        
        </motion.div>
      <div className="flex items-center">
        <div className="pe-[28px] border-e border-[#707070] me-[28px]">
          {/* <img src={notification} alt="notification" /> */}
        </div>
       
        <div className="flex items-center gap-x-2 me-[30px]">
        <LanguageSwitch />
          
          <Dropdown></Dropdown>
        </div>
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <div className="flex items-center gap-x-[9px] cursor-pointer">
            <img
              className="w-[38px] h-[38px] rounded-full"
            //   src={profile}
              alt="profile img"
            />
            <div className="flex flex-col gap-y-[2px]">
              <span className="text-[13px] font-medium text-black">
                {AuthService.getFullNameUserConnect()}
              </span>
              <span className="text-[11px] text-[#848484] font-light">
                Edit Details
              </span>
            </div>
          </div>
        </Dropdown>
        <Modal
                destroyOnClose={true}
                onCancel={handlecancel}
                open={isModalOpen}
                footer={null}
                width={412}
                closable={false}
                // className={isNuit ? "dark-mode" : ""}
                className='min-w:hidden'
                
    
              >
               <SideMenu setIsNuitFromSide={setIsNuitFromSide} isNuit={isNuit} handlecancel={handlecancel}/>
              </Modal>
      </div>
    </header>
    )
}

export default Navbar