

import { useQuery } from "@tanstack/react-query";
import {  VirmentExterneResponse } from "../../types/Virement";
import axios from "axios";


export const VIREMENT_KEY = ["virements"];

async function getVirement(
  page: number,
  agence:string,
  date_debut:string,
  date_fin:string,
  chercherpar : string,
  searchValue : string
): Promise<VirmentExterneResponse> {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/virement/?&page=${page}&agence=${agence}&date_debut=${date_debut}&date_fin=${date_fin}&${chercherpar}=${searchValue}`,
    // `/api/compte_details//?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    {
    
    }
  );
  return response.data;
}
export const useGetVirementExterne = (
  page: number,
  agence:string,
  date_debut:string,
  date_fin:string,
  chercherpar : string,
  searchValue : string,
  

//   size: number,
  // search: string,
  // type: string,
  // status: string,
  // target_audience: string
) => {
  return useQuery({
    queryKey: ["virements", page, agence, date_debut, date_fin, chercherpar, searchValue],
    queryFn: () =>
        getVirement(page, agence, date_debut, date_fin,chercherpar, searchValue),
    // getEntities(page, size, search, type, status),
  });
};

