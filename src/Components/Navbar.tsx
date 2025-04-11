
import { Dropdown, MenuProps, Modal } from 'antd'
import logo from '../assets/images/image.svg'
import { motion} from 'framer-motion'
import menu from '../assets/new_images/menu.png'
import { useState } from 'react'
import SideMenu from './SideMenu'
import LanguageSwitch from '../ui/LanguageSwitch'
import { UpdateProfileAdmin } from '../Pages/Users/UpdateProfileAdmin'
import { getUserInfo } from '../Services/Auth/useGetUser'
import { EditPassword } from '../Pages/Users/EditPassword'
import { BaseUrl } from '../api/BaseUrl'

type props = {
    isNuit:boolean
    setIsNuitFromSide :(value:boolean)=>void

}
const Navbar =({isNuit, setIsNuitFromSide}:props) => {
    const {data:clients}= getUserInfo()

  const [isModalOpenProfile, setIsModalOpenProfile] = useState(false);
  const [isModalOpenPassword, setIsModalOpenPassword] = useState(false);
  const handlecancelProfile = () => {
    setIsModalOpenProfile(false)
  }
  const handlecancelPassword = () => {
    setIsModalOpenPassword(false)
  }

    const showModalProfile = () => {
      setIsModalOpenProfile(true);
    };
    const showModalPassword = () => {
      setIsModalOpenPassword(true);
    };
    const items: MenuProps["items"] = [
        {
          label: ("Modifier le profil"),
          key: "1",
          onClick: () => showModalProfile(),
        },
        {
          label: ("Modifier le mot de passe"),
          key: "2",
          onClick: () => showModalPassword(),
        },
      ];

      const [isModalOpen, setisModalOpen] = useState(false)
      const handlecancel = () => {
        setisModalOpen(false)
      }

    return(
        <header className={` b flex items-center border-b-2 border-main-color 
          fixed z-20 h-[65px]  justify-between w-full px-[27px] shadow-md ${isNuit? 'bg-gray-800' : 'bg-[#efeeea]'}`}>

      <div className=' flex items-center justify-center  ' >
        <img src={logo}  alt="logo" className='max-min-w:hidden w-40 h-40 ' />
        <img src={menu} className="h-10 w-10 min-w:hidden cursor-pointer " onClick={()=>setisModalOpen(true)}/>

      </div>
      <motion.div 
        initial={{x:"-100vw", scale:0}}
     animate={{x:0, scale:1}}
     transition={{duration:0.5}}
        className=" cursor-pointer min-w:hidden"
         >
        
        </motion.div>
      <div className="flex items-center ">
        <div className="pe-[28px] border-e border-[#707070] me-[28px]">
        </div>
       
        <div className="flex items-center gap-x-2 me-[30px]">
        <LanguageSwitch />
          
          <Dropdown></Dropdown>
        </div>
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <div className="flex items-center gap-x-[9px] cursor-pointer">
            <img
              className="w-[38px] h-[38px] rounded-full"
              src={`${BaseUrl}${clients?.image}`}
              alt="pr"
            />
            <div className="flex flex-col gap-y-[2px]">
              <span className="text-[13px] font-medium ">
                {clients?.first_name}
              </span>
              <span className="text-[11px] font-light">
               {clients?.post}
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
                className='min-w:hidden'
                
    
              >
               <SideMenu setIsNuitFromSide={setIsNuitFromSide} isNuit={isNuit} handlecancel={handlecancel}/>
              </Modal>
              <Modal
                destroyOnClose={true}
                onCancel={handlecancelProfile}
                open={isModalOpenProfile}
                footer={null}
                width={412}
                closable={false}
                className=''
              >
              <UpdateProfileAdmin handleCancel={handlecancelProfile}/>
              </Modal>
              <Modal
                destroyOnClose={true}
                onCancel={handlecancelPassword}
                open={isModalOpenPassword}
                footer={null}
                width={390}
                closable={false}
                className=''              >
              <EditPassword handleCancel={handlecancelPassword}/>
              </Modal>
      </div>
    </header>
    )
}

export default Navbar