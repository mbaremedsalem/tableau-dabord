

import {  Button, Input, message, Space } from "antd";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../../Services/Auth/useGetUser";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { validateEmail } from "../../Services/types/validateEmail";
import { useUpdateUser } from "../../Services/Auth/useUpdateProfile";
import { User } from "../../Services/types/User";
type Props = {
  handleCancel: () => void;
};
export  function UpdateProfileAdmin({handleCancel} : Props) {
      const {data:clients, isPending:isPendingClient}= getUserInfo()


  const {t} = useTranslation()
  
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const {mutate:UpdateProfile, isPending:isPendingProfile} = useUpdateUser()

  useEffect(()=>{
    if (clients) {
      setFirstName(clients.first_name || "");
      setLastName(clients.last_name || "");
      setEmail(clients.email || "");
    }
  }, [clients])

  const onSubmit = () => {
    if(!first_name || !last_name || !email){
      message.error("Tous les champs sont obligatoires !")
    } else  if (!validateEmail(email)){
                return message.error(t("Entrez une adresse e-mail valide !"))
            }
      else { 
        const params :User = {
          email:email,
          first_name:first_name,
          last_name:last_name,
        
        }
        UpdateProfile(params,{
          onSuccess:()=>{
            handleCancel()
          }
        })
      }
  }
  if(isPendingClient){
    return <Spinner center={true}/>
  }
  return (
    <div>
     
      <div className="grid grid-cols-2 gap-y-1 gap-x-3">
        <Space direction="vertical">
          <label className="text-blue-2a text-[13px]" htmlFor="">
          {t("First Name")}
            
          </label>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
           value={first_name}
            placeholder="First Name"
          />
        </Space>

        <Space direction="vertical">
          <label className="text-blue-2a text-[13px]" htmlFor="">
          {t("Last Name")}
          </label>
          <Input
            onChange={(e) => setLastName(e.target.value)}
           
            value={last_name}
            placeholder="Last Name"

          />
        </Space>
        
        <Space direction="vertical" className="grid col-span-2">
          <label className="text-blue-2a text-[13px]" htmlFor="">
          {t("Email")}
          </label>
          <Input
          type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
           
placeholder={t("Email")}
          />
        </Space>
        
      </div>
      <div className="grid grid-cols-2 items-center gap-x-4 mt-4 md:mt-5">
          <Button className=" h-[50.6px]   mt-2 secondary-button" onClick={handleCancel}>Annuler </Button>
            <Button className=" h-[50.6px] mt-2 primary-button" onClick={onSubmit} loading={isPendingProfile}>Confirmer</Button>
            
      </div>
    </div>
  );
}
