import { useQuery } from "@tanstack/react-query";
// import { CompteResponse } from "../types/Compte";
import {  VirmentResponse } from "../../types/Virement";
import axios from "axios";


export const COMPTES_KEY = ["comptes"];

async function getVirement(
  page: number,
  agence: string,
  // search: string,
  // type: string,
  // status: string,
): Promise<VirmentResponse> {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/virement_intern/?&page=${page}&agence=${agence}`,
    // `/api/compte_details//?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    {
    
    }
  );
  return response.data;
}
export const useGetVirementInterne = (
  page: number,
  agence: string,

//   size: number,
  // search: string,
  // type: string,
  // status: string,
  // target_audience: string
) => {
  return useQuery({
    queryKey: ["comptes", page, agence],
    queryFn: () =>
        getVirement(page, agence),
    // getEntities(page, size, search, type, status),
  });
};

