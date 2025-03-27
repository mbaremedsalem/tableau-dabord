import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { User } from "../types/User";
import api from "../../Auth-services/axios";
import { userKey } from "./useGetUser";

// import { USERS_KEY } from "./useGetUser";


export const useUpdateUser  = () => {
  const querClient = useQueryClient()
    async function updateuser (user : User){
    const res = await api.put(`api/me/update/`, user)
    // localStorage.setItem("/me/", user.full_name)
    return res.data
    
    }
    return useMutation({
        mutationFn : updateuser,
        mutationKey : userKey,
        onSuccess :()=>{
            querClient.invalidateQueries({
                queryKey:userKey
            })
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