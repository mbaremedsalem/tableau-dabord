import { Button, Input, message, Space } from "antd"
import { Controller, useForm } from "react-hook-form";
import logo from '../../assets/images/AUB.png'
import Grandlogo from '../../assets/images/logo.svg'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";



export type RsetPassword = {
    password_confirmation : string,
    password : string
}
const ResetPassword = () => {
    const form = useForm<RsetPassword>({
        defaultValues: {
            
        }
       

    });
    const { handleSubmit,  control, formState,   } = form;
    const { errors } = formState;
    const {i18n, t} = useTranslation()
    const navigate = useNavigate()
    const onSubmit = (data:RsetPassword) => {
      console.log("reset password : ", data)
      if(data.password !== data.password_confirmation){
        message.error("Le mot de passe et la confirmation du mot de passe doivent être identiques.")
      }
      else 
      {
        message.success("Password reset successful")
        navigate("/success-reset-password")
      }
     
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <div className="bg-[#FEFEFE] min-h-screen max-min-w:flex min-w:grid md:grid-cols-3  gap-7 p-10">
            <div className="flex col-span-2 items-center justify-center max-min-w:hidden">
            <img className="" src={Grandlogo} />
            </div>

            <div className="bg-white shadow-2xl w-full  flex flex-col justify-center items-center  rounded-lg  p-14  space-y-4">
                <img className="w-32 h-32 flex" src={logo}/>
                <p className="text-main-color font-bold">Reset Password</p>
                <p className="text-main-color ">Veuillez vous enter votre password et confirmation  </p>
                <Space direction="vertical" className="w-full my-1">
          <label className="text-gray-500 text-[14px]" htmlFor="">
          {t("Password")}
          </label>
          <Controller
          // rules={{ required: required && "This field is required", ...rules }}
            name={`password`}
            control={control}
            rules={{ required: true && "This field is required" }}
            render={({ field }) => (
              <Input.Password
              
                
                status={`${errors?.password ? "error" : ""}`}
                className="!w-full h-[50px]"
                {...field}
                placeholder={t(
                  "Password"
                )}
              />
            )}
          />
          
        </Space>
        <Space direction="vertical" className="w-full my-1">
          <label className="text-gray-500 text-[14px]" htmlFor="">
          {t("Confirmation Password")}
          </label>
          <Controller
          // rules={{ required: required && "This field is required", ...rules }}
            name={`password_confirmation`}
            control={control}
            rules={{ required: true && "This field is required" }}
            render={({ field }) => (
              <Input.Password
              
                
                status={`${errors?.password_confirmation ? "error" : ""}`}
                className="!w-full h-[50px]"
                {...field}
                placeholder={t(
                  "Password"
                )}
              />
            )}
          />
          
        </Space>
                 <div className="flex justify-between items-center w-full ">
          
            
          </div>
                <Button
          htmlType="submit"
          // loading={isPending}
            className="!w-full h-[50px]  primary-button mt-7"
          >
           Valider
          </Button>
                
            </div>
            
            
        </div>
    

        </form>
        
    )
}



export default ResetPassword