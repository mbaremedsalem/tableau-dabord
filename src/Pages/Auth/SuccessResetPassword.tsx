import {  Button } from "antd"
// import { InputField } from "../../ui/InputFiled"
import { useForm } from "react-hook-form";
// import logo from '../../assets/images/AUB.png'
import Grandlogo from '../../assets/images/logo.svg'
import check from '../../assets/new_images/check.png'
import { useTranslation } from "react-i18next";
import { LoginParams } from "../../Services/Auth/useLogin";



 
const SuccessResetPassword = () => {
    const form = useForm<LoginParams>({
        defaultValues: {
            
        }
    });
    const { handleSubmit  } = form;
    const {i18n} = useTranslation()
    // const {mutate : login} = useLogin()

    const onSubmit = () => {
      console.log("login")
      // const params : LoginParams = {
      //   email : data.email,
      //   password : data.password,
      // }
      // console.log("params : ", params)
      // login(params, {
      //   onSuccess:()=>{
      //     message.success("Login Success")
      //     console.log("success")
      //   }
      // })
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
               <h1 className="text-main-color font-bold text-2xl">  Password reset successful  </h1>
               <h1 className="text-main-color font-bold text-xl"> You can log in </h1>
               <p></p>
                
              
                 <div className="flex justify-between items-center w-full ">
            
            
          </div>
                <Button
        //   htmlType="submit"
        //   loading={isPending}
            className="!w-full h-[50px]  primary-button mt-7"
          >
           Login
          </Button>
                
            </div>
            
            
        </div>
    

        </form>
        
    )
}



export default SuccessResetPassword