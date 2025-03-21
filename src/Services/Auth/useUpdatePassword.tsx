import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../Auth-services/axios";


export type ModifierPassword = {
    password?:string
    nouveau_password?:string
    confirm?:string
}
export const useUpdatePassword  = () => {

    async function updatepassword (updatePass:ModifierPassword){
    const res = await api.put(`/me/`, updatePass)
    // localStorage.setItem("/me/", user.full_name)
    return res.data
    
    }
    return useMutation({
        mutationFn : updatepassword,
        // mutationKey : USERS_KEY,
        onSuccess :()=>{
            
        message.success(" updated with successfuly");
        },
        onError:(err:any)=>{
        if(err.response.data.gender){
            return message.error(err.response.data.gender[0])
        } else if(err.response.data.phone){
           return message.error(err.response.data.phone[0])
        } else if(err.response.data.email){
            return message.error(err.response.data.email[0])
         }
        } 
    })
}