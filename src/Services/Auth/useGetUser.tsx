import { useQuery } from "@tanstack/react-query";
import api from "../../Auth-services/axios";

export type ClientUser = {
    first_name:string,
    last_name:string,
    email:string,
    username:string,
    image:string,
    post:string
}

async function getMe():Promise<ClientUser>{
    const res = await api.get("/me")
    return res.data
}


export function getUserInfo(){
    return useQuery({
        queryKey:['clients-me'],
        queryFn:()=>getMe()
    })
}