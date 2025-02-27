import { Button, message } from "antd"
import { InputField } from "../../ui/InputFiled"
import { useForm } from "react-hook-form";
import logo from '../../assets/images/AUB.png'
import Grandlogo from '../../assets/images/logo.svg'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../Services/types/validateEmail";
import { forgetPassword } from "../../Services/Auth/useForgetPassword";



 
const ForgotPassword = () => {
    const form = useForm<forgetPassword>({
        defaultValues: {
            
        }
    });
    const { handleSubmit,  control  } = form;
    const {i18n, t} = useTranslation()
   
    const navigate = useNavigate()
    const onSubmit = (data:forgetPassword) => {
      
        if (!validateEmail(data.email!)) return message.error(t("Enter a valid email !"));

        navigate("/success-send-email")
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <div className="bg-[#FEFEFE] min-h-screen max-min-w:flex min-w:grid md:grid-cols-3  gap-7 p-10">
            <div className="flex col-span-2 items-center justify-center max-min-w:hidden">
            <img className="" src={Grandlogo} />
            </div>

            <div className="bg-white shadow-2xl w-full  flex flex-col justify-center items-center  rounded-lg  p-14  space-y-4">
                <img className="w-32 h-32 flex" src={logo}/>
                <p className="text-main-color font-bold">Forget Password </p>
                <p className="text-main-color">Veuillez Entrez votre email  </p>
                <InputField 
                control={control}
                label=""
                placeholder="email"
                name="email"
                className="!h-[50px]  !rounded-lg " 
                required
                />
               
                 <div className="flex justify-between items-center w-full ">
            
            
          </div>
                <Button
          htmlType="submit"
        //   loading={isPending}
            className="!w-full h-[50px]  primary-button mt-7"
          >
           Valider
          </Button>
                
            </div>
            
            
        </div>
    

        </form>
        
    )
}



export default ForgotPassword