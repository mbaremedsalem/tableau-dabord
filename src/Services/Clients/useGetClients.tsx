import { useQuery } from "@tanstack/react-query";
// import api from "../../Auth-services/axios";
import axios from "axios";
import { ClientResponse } from "../types/Client";
import { BaseUrl } from "../../api/BaseUrl";


export const CLIENTS_KEY = ["clients-VIEW"];

async function getClients(
  page: number,
  agence : string,
  // size: number,
  // search: string,
  type: string,
  FilterPar:string,
  search:string
  // status: string,
): Promise<ClientResponse> {
  
  const response = await axios.get(
    `${BaseUrl}api/client/?page=${page}&agence=${agence}&type=${type}` +
      `${FilterPar === "client" ? `&client=${search}` : ""}` +
      `${FilterPar === "nom" ? `&nom=${search}` : ""}`
  );
  return response.data;
}
export const useGetClients = (
  page: number,
  agence: string,
  type: string,
  FilterPar: string,
  search:string
) => {
  return useQuery({
    queryKey: ["clients-VIEW", page,agence, type, FilterPar, search],
    queryFn: () =>
      getClients(page, agence, type, FilterPar, search),
  });
};




