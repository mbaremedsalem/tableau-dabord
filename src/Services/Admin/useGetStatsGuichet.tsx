import { useQuery } from "@tanstack/react-query";
// import api from "../../Auth-services/axios";
import axios from "axios";
import { GuichetResponse } from "../types/Guiche";


export const GUICHET_KEY = ["guichet"];

async function getGuichet(
    agence: string,
  // size: number,
  // search: string,
  // type: string,
  // status: string,
): Promise<GuichetResponse> {
  const response = await axios.get(
    // `/api/compte_details/`,
    `http://127.0.0.1:8000/api/guichet/?agence=${agence}`,

    // `/api/compte_details//?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    {
    
    }
  );
  return response.data;
}
export const useGetStatsGuichet = (
    agence: string,
  // size: number,
  // type: string,
  // status: string,
  // target_audience: string
) => {
  return useQuery({
    queryKey: ["guichet", agence],
    queryFn: () =>
        getGuichet(agence),
    // getEntities(page, size, search, type, status),
  });
};

