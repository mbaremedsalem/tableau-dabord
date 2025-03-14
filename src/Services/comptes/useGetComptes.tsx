import { useQuery } from "@tanstack/react-query";
import { CompteResponse } from "../types/Compte";
// import api from "../../Auth-services/axios";
import axios from "axios";


export const COMPTES_KEY = ["comptes"];

async function getComptes(
  page: number,
  agence : string,
  type : string
  // size: number,
  // search: string,
  // type: string,
  // status: string,
): Promise<CompteResponse> {
  const response = await axios.get(
    // `/api/compte_details/`,
    // `http://127.0.0.1:8000/api/compte_filter/?page=${page}&AGENCE=${agence}`,
    `http://127.0.0.1:8000/api/compte_filter/?&page=${page}&AGENCE=${agence}&type=${type}`,


    // `/api/compte_details//?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    {
    
    }
  );
  return response.data;
}
export const useGetComptes = (
  page: number,
  // size: number,
  agence: string,
  type:string
  // type: string,
  // status: string,
  // target_audience: string
) => {
  return useQuery({
    queryKey: ["comptes", page,agence, type],
    queryFn: () =>
      getComptes(page, agence, type),
    // getEntities(page, size, search, type, status),
  });
};

