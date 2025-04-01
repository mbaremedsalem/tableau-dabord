import { useQuery } from "@tanstack/react-query";
// import api from "../../Auth-services/axios";
import axios from "axios";
import { GuichetResponse } from "../types/Guiche";


export const GUICHET_KEY = ["guichet"];

async function getGuichet(
  page: number,
  // size: number,
  start_date: string,
  end_date: string,
  agence: string,
  type_operation:string,
  rechercherPar:string,
  searchValue:string,
): Promise<GuichetResponse> {
  const response = await axios.get(
    // `/api/compte_details/`,
    `http://127.0.0.1:8000/api/guichet/?agence=${agence}&page=${page}&start_date=${start_date}&end_date=${end_date}&type_operation=${type_operation}&${rechercherPar}=${searchValue}`,

    // `/api/compte_details//?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    {
    
    }
  );
  return response.data;
}
export const useGetGuichet = (
  page: number,
  start_date: string,
  end_date: string,
  agence: string,
  type_operation:string,
  rechercherPar : string,
  searchValue : string


  // target_audience: string
) => {
  return useQuery({
    queryKey: ["guichet", page, start_date, end_date, agence, type_operation, rechercherPar, searchValue],
    queryFn: () =>
        getGuichet(page, start_date, end_date, agence, type_operation,rechercherPar, searchValue),
    // getEntities(page, size, search, type, status),
  });
};

