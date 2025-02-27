import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { BaseUrl } from "../../api/BaseUrl";
import { toast } from "react-toastify";


export type LoginParams = {
    email : string,
    password : string
}



 async function login(params : LoginParams){
    const res = await axios.post(`${BaseUrl}`, {
        email: params.email,
        password: params.password,
    },
        {
            headers: { "Content-Type": "application/json" },
        }
    )
    localStorage.setItem("accessToken", res.data.access)
    localStorage.setItem("refrech_token", res.data.refresh)
    localStorage.setItem("Full_Name_user_Connect", res.data.full_name)
    // localStorage.setItem("role_user_connect", res.data.data.user_type)
    // localStorage.setItem("id_user_Connect", res.data.data.id)

   
    return res.data
}


export const useLogin = () => {
    return useMutation({
      mutationFn:  login,
      onSuccess: () => {
        // const { user_type: userType, full_name: name } = data.data;
      const successMessage = `You logged in successfully`;
    //   let redirectUrl = "";
    // message.success(`Hello Admin: ${name}`);
        
    window.location.href = "/"
    //   if (userType === "Admin") {
    //     message.success(`Hello Admin: ${name}`);
        
    //     window.location.href = "/"
    //   } 
      
   
      message.success(successMessage);
      toast.success("Bienvenue ! ")

      
    //   setTimeout(() => {
    //     window.location.href = redirectUrl;
    //   }, 300);
      },
      onError: (err:any) => {
        console.log("err est : ", err?.response?.data?.detail)
        const msg = err?.response?.data?.error
        const ErrorGbo = err?.response?.data?.detail

        const errorMessage = err?.response?.data?.error || err.message || "An error occurred";
        message.error(errorMessage);
        message.error(ErrorGbo)
        message.error(msg)
        toast.error("medos")
        
      },
    });
  };