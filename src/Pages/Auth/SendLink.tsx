// import {  message } from "antd"
// import { InputField } from "../../ui/InputFiled"
import { useForm } from "react-hook-form";
// import logo from '../../assets/images/AUB.png'
import Grandlogo from '../../assets/images/logo.svg'
import check from '../../assets/new_images/check.png'
import { useTranslation } from "react-i18next";
// import { LoginParams, useLogin } from "../../Services/Auth/useLogin";
import { forgetPassword } from "../../Services/Auth/useForgetPassword";



 
const SendLink = () => {
    const form = useForm<forgetPassword>({
        defaultValues: {
            
        }
    });
    const { handleSubmit  } = form;
    const {i18n} = useTranslation()

    const onSubmit = () => {
      console.log("login")
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <div className="bg-[#FEFEFE] min-h-screen max-min-w:flex min-w:grid md:grid-cols-3  gap-7 p-10">
            <div className="flex col-span-2 items-center justify-center max-min-w:hidden">
            <img className="" src={Grandlogo} />
            </div>

            <div className="bg-white shadow-2xl w-full  flex flex-col justify-center items-center  rounded-lg 
            text-center
            p-14  space-y-4">
                {/* <img className="w-32 h-32 flex" src={logo}/> */}
                <img className="w-32 h-32 flex" src={check}/>
               <h1 className="text-main-color font-bold text-2xl">Link sent successfully </h1>
               <h1 className="text-main-color font-bold text-xl">Verify your email to reset your password.</h1>
               <p></p>
                
              
                 <div className="flex justify-between items-center w-full ">
            
            
          </div>
                {/* <Button
        //   htmlType="submit"
        //   loading={isPending}
            className="!w-full h-[50px]  primary-button mt-7"
          >
           ok
          </Button> */}
                
            </div>
            
            
        </div>
    

        </form>
        
    )
}



export default SendLink