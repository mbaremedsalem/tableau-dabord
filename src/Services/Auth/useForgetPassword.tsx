import axios from "axios";
import { BaseUrl } from "../../api/BaseUrl";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";


export type forgetPassword = {
    email:string
}



 async function reset(params : forgetPassword){
    const res = await axios.post(`${BaseUrl}api/forget_password/`, {
        email:params.email
       
    },
        {
            headers: { "Content-Type": "application/json" },
        }
    )
    
    return res.data
}


export const useForgetPassword = () => {
    return useMutation({
      mutationFn:  reset,
      onSuccess: () => {
        message.success("The email is reset Successfuly! you can login now ");
        
      },
      onError: (error:any) => {
        const errorM = error?.response?.data?.detail
        console.log("errorM : ",errorM)
        if(errorM){
          message.error(errorM)
        }
        
      },
    });
  };