import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { User } from "../types/User";
import api from "../../Auth-services/axios";

// import { USERS_KEY } from "./useGetUser";


export const useUpdateUser  = () => {

    async function updateuser (user : User){
    const res = await api.put(`/me/`, user)
    // localStorage.setItem("/me/", user.full_name)
    return res.data
    
    }
    return useMutation({
        mutationFn : updateuser,
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