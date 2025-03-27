import { Button, Input, message, Space, CheckboxProps } from "antd"
import { InputField } from "../../ui/InputFiled"
import { Controller, useForm } from "react-hook-form";
import logo from '../../assets/images/AUB.png'
import Grandlogo from '../../assets/images/logo.svg'
import { useTranslation } from "react-i18next";
import { LoginParams, useLogin } from "../../Services/Auth/useLogin";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomCheckbox from "../../ui/CustomCheckbox";


const Login = () => {
    const form = useForm<LoginParams>({
        defaultValues: {
            
        }
    });
    
    const { handleSubmit,  control, formState, setValue  } = form;
    const { errors } = formState;
    const [rememberMe, setRememberMe] = useState(false)

    const onChange: CheckboxProps["onChange"] = (e) => {
      setRememberMe(e.target.checked);
    };
  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedRememberMe === "true") {
      setValue("username", savedUsername || "");
      setValue("password", savedPassword || "");
      setRememberMe(true);
    }
  }, [setValue]);

    const {i18n, t} = useTranslation()
    const {mutate : login, isPending} = useLogin()

    const onSubmit = (data:LoginParams) => {
      console.log("login")
      const params : LoginParams = {
        username : data.username,
        password : data.password,
      }
      if (rememberMe) {
        localStorage.setItem("savedUsername", data.username);
        localStorage.setItem("savedPassword", data.password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("savedUsername");
        localStorage.removeItem("savedPassword");
        localStorage.setItem("rememberMe", "false");
      }
      console.log("params : ", params)
      login(params, {
        onSuccess:()=>{
          message.success("Login Success")
          console.log("success")
        }
      })
    }

 
    return (
        <form onSubmit={handleSubmit(onSubmit)} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <div className="bg-[#FEFEFE] min-h-screen max-min-w:flex min-w:grid md:grid-cols-3  gap-7 p-10">
            <div className="flex col-span-2 items-center justify-center max-min-w:hidden">
            <img className="" src={Grandlogo} />
            </div>

            <div className="bg-white shadow-2xl w-full  flex flex-col justify-center items-center  rounded-lg  p-14  space-y-4">
                <img className="w-32 h-32 flex" src={logo}/>
                <p className="text-main-color font-bold"> Bon Retour ! </p>
                <p className="text-main-color">Veuillez vous connecter a votre compte </p>
                <InputField 
                control={control}
                label=""
                placeholder="username"
                name="username"
                className="!h-[50px]  !rounded-lg " 
                required
                />
                 <Space direction="vertical" className="w-full my-1">
          <label className="text-gray-500 text-[14px]" htmlFor="">
          {/* {t("Password")} */}
          </label>
          <Controller
            name={`password`}
            control={control}
            rules={{ required: true }}
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
                 <div className="flex justify-between items-center w-full ">
            <div className="flex items-center justify-center cursor-pointer">
            <CustomCheckbox
              onChange={onChange}
              label="Enregistrer les données"
              checked={rememberMe}
              value="Dateo"
            />
            </div>
            <Link
              to="/forget-password"
              className="text-black text-[14px] font-medium"
            >
              <span className="text-[13px] font-light cursor-pointer " >
              {t("Mot de Passe Oublié")}
              </span>
            </Link>
          </div>
                <Button
          htmlType="submit"
          loading={isPending}
            className="!w-full h-[50px]  primary-button mt-7"
          >
           Login
          </Button>
                
            </div>
            
            
        </div>
    

        </form>
        
    )
}



export default Login