import { useQuery } from "@tanstack/react-query";
// import { CompteResponse } from "../types/Compte";
import {  VirmentResponse } from "../../types/Virement";
import axios from "axios";


export const VIREMENT_KEY = ["virements"];

async function getVirement(
  page: number,
  agence: string,
  date_operation: string,
  // type: string,
  // status: string,
): Promise<VirmentResponse> {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/virement_intern/?&page=${page}&agence=${agence}&date_operation=${date_operation}`,
    // `/api/compte_details//?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    {
    
    }
  );
  return response.data;
}
export const useGetVirementInterne = (
  page: number,
  agence: string,
  date_operation:string

//   size: number,
  // search: string,
  // type: string,
  // status: string,
  // target_audience: string
) => {
  return useQuery({
    queryKey: ["virements", page, agence, date_operation],
    queryFn: () =>
        getVirement(page, agence, date_operation),
    // getEntities(page, size, search, type, status),
  });
};

