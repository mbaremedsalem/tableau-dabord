import { useQuery } from "@tanstack/react-query";
// import { CompteResponse } from "../types/Compte";
import {  VirmentResponse } from "../../types/Virement";
import axios from "axios";
import { BaseUrl } from "../../../api/BaseUrl";


export const VIREMENT_KEY = ["virements"];

async function getVirement(
  page: number,
  agence: string,
  date_operation: string,
  // type: string,
  searchValue: string,
): Promise<VirmentResponse> {
  const response = await axios.get(
    `${BaseUrl}api/virement_intern/?&page=${page}&agence=${agence}&date_operation=${date_operation}&client=${searchValue}`,
    // `/api/compte_details//?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    {
    
    }
  );
  return response.data;
}
export const useGetVirementInterne = (
  page: number,
  agence: string,
  date_operation:string,

//   size: number,
searchValue: string,
  // type: string,
  // status: string,
  // target_audience: string
) => {
  return useQuery({
    queryKey: ["virements", page, agence, date_operation, searchValue],
    queryFn: () =>
        getVirement(page, agence, date_operation, searchValue),
    // getEntities(page, size, search, type, status),
  });
};

