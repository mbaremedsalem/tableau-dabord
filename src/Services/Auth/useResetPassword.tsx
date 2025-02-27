import axios from "axios";
import { BaseUrl } from "../../api/BaseUrl";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";


export type ResetPasswordParams = {
    password:string,
    confrimPassword:string
}



 async function reset(params : ResetPasswordParams){
    const res = await axios.post(`${BaseUrl}otp/reset_password`, {
        password:params.password,
        confrimPassword:params.confrimPassword
       
    },
        {
            headers: { "Content-Type": "application/json" },
        }
    )
    
    return res.data
}


export const useResetPassword = () => {
    return useMutation({
      mutationFn:  reset,
      onSuccess: () => {
        message.success("The Password is reset Successfuly! you can login now ");
        
      },
      onError: () => {
        message.error("Incorrect !!");
        
      },
    });
  };