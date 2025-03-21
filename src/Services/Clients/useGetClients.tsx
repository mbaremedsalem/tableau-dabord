import { useQuery } from "@tanstack/react-query";
// import api from "../../Auth-services/axios";
import axios from "axios";
import { ClientResponse } from "../types/Client";


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
  console.log("FilterPar : ", FilterPar)
  // const response = await axios.get(
  //   // `/api/compte_details/`,
  //   // `http://127.0.0.1:8000/api/client/?page=${page}&agence=${agence}`,
  //   `http://127.0.0.1:8000/api/client/?&page=${page}&agence=${agence}&type=${type}&client=${FilterPar=== "client"? search:""}
  //   &nom=${FilterPar === "nom" ? search : ""}`


  //   // `/api/compte_details//?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    
  // );
  const response = await axios.get(
    `http://127.0.0.1:8000/api/client/?page=${page}&agence=${agence}&type=${type}` +
      `${FilterPar === "client" ? `&client=${search}` : ""}` +
      `${FilterPar === "nom" ? `&nom=${search}` : ""}`
  );
  return response.data;
}
export const useGetClients = (
  page: number,
  // size: number,
  agence: string,
  type: string,
  FilterPar: string,
  search:string
) => {
  return useQuery({
    queryKey: ["clients-VIEW", page,agence, type, FilterPar, search],
    queryFn: () =>
      getClients(page, agence, type, FilterPar, search),
    // getEntities(page, size, search, type, status),
  });
};




