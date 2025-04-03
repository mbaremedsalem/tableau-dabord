import { useQuery } from "@tanstack/react-query";
import api from "../../Auth-services/axios";
import { message } from "antd";
import { ALert_Retourne_Login } from "./AlertAuth";
export const userKey = ["user-key"]
export type ClientUser = {
    first_name:string,
    last_name:string,
    email:string,
    username:string,
    image:string,
    post:string
}

async function getMe():Promise<ClientUser>{
    try{
        const res = await api.get("api/me/")
    console.log("res : ", res)
    return res.data
    }catch(error:any){
        if(error.response){
            console.log("error : ",error.response?.data?.detail)
            console.log("response :", error?.response?.status)
            if(error.response?.data?.detail){
                message.error(error.response?.data?.detail)
            } if (error?.response?.status === 401){
                await ALert_Retourne_Login()
            }
        }
        throw error
    }
}



export function getUserInfo(){
    return useQuery({
        queryKey:userKey,
        queryFn:()=>getMe()
    })
}