

import {  Button, Input,  Select, Space } from "antd";
// import {  useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import AuthService from "../../Auth-services/AuthService";
// import Spinner from "../../ui/Spinner";
// import { getUserInfo } from "../../Services/Auth/useGetUser";
type Props = {
  handleCancel: () => void;
};
export  function UpdateProfileAdmin({handleCancel} : Props) {
//     const idConnect = AuthService.getIDUserConnect()
//     const [email, setEmail] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [gender, setGender] = useState("");
//   const [phone, setphone] = useState("");

//   const { mutate: updateProfileAdmin, isPending } = useUpdateUser();
  const {t} = useTranslation()
  
//  const handleSelectGender = (value:string)=>{
//   setGender(value)
//  }



// if(isPendingGet) { 
//   return (<Spinner  center={true}/>)
// }

  return (
    <div>
     
      <div className="grid grid-cols-2 gap-y-2 gap-x-3">
        <Space direction="vertical">
          <label className="text-blue-2a text-[13px]" htmlFor="">
          {t("Email")}
            
          </label>
          <Input
        //     onChange={(e) => setEmail(e.target.value)}
        //    value={email}
            placeholder="Email"
          />
        </Space>

        <Space direction="vertical">
          <label className="text-blue-2a text-[13px]" htmlFor="">
          {t("Full Name")}
          </label>
          <Input
            // onChange={(e) => setFullName(e.target.value)}
           
            // value={fullName}
            placeholder="Full Name"

          />
        </Space>
        <Space direction="vertical">
          <label className="text-blue-2a text-[13px]" htmlFor="">
          {t("gender")}
            
          </label>
          <Select
          variant={"borderless"}
          className="border !w-[130px] rounded-md"
            // onChange={handleSelectGender}
           options={[
            {label : "Male", 
              value : "Male",
            },
            {label : "Female", 
              value : "Female",
            }
           ]}
            // value={gender}
            // placeholder={t("gender")}
          />
        </Space>
        <Space direction="vertical">
          <label className="text-blue-2a text-[13px]" htmlFor="">
          {t("Phone")}
          </label>
          <Input
          type="number"
            // onChange={(e) => setphone(e.target.value)}
           
// value={phone}            
placeholder={t("Phone")}
          />
        </Space>
        
      </div>
      <div className="flex items-center gap-x-4 mt-4 md:mt-5">
          <Button className="w-[153.8px] h-[50.6px]   mt-2 secondary-button" onClick={handleCancel}>Cancel</Button>
            {/* <Button className="w-[153.8px] h-[50.6px] mt-2 primary-button" loading={isPending} onClick={handleChanges}>Confirm</Button> */}
            
      </div>
    </div>
  );
}
