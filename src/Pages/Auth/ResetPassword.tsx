import { Button, Input, message, Space } from "antd"
import { Controller, useForm } from "react-hook-form";
import logo from '../../assets/images/AUB.png'
import Grandlogo from '../../assets/images/logo.svg'
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ResetPasswordParams, useResetPassword } from "../../Services/Auth/useResetPassword";




const ResetPassword = () => {
    const form = useForm<ResetPasswordParams>({
        defaultValues: {
            
        }
       

    });
   
    const {mutate : resetPass, isPending} = useResetPassword()
    
    
    const { token } = useParams(); 
    const [currentToken, setCurrentToken] = useState('');
  
    useEffect(() => {
      if (token) {
        setCurrentToken(token);  
      }
    }, [token]);

    console.log("code : ", currentToken)
    const { handleSubmit,  control, formState,   } = form;
    const { errors } = formState;
    const {i18n, t} = useTranslation()
    const navigate = useNavigate()
    const onSubmit = (data:ResetPasswordParams) => {
      console.log("reset password : ", data)
      if(data.password !== data.confrimPassword){
        message.error("Le mot de passe et la confirmation du mot de passe doivent être identiques.")
      }
      else 
      {
        const params : ResetPasswordParams =  {
          password:data.password,
          confrimPassword:data.confrimPassword,
          code:currentToken!
        }
      resetPass(params, {
        onSuccess:()=>{
          navigate("/success-reset-password")

        }

      })
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
            name={`confrimPassword`}
            control={control}
            rules={{ required: true && "This field is required" }}
            render={({ field }) => (
              <Input.Password
              
                
                status={`${errors?.confrimPassword ? "error" : ""}`}
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
          loading={isPending}
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