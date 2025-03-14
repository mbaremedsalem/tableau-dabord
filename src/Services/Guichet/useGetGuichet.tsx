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
): Promise<GuichetResponse> {
  const response = await axios.get(
    // `/api/compte_details/`,
    `http://127.0.0.1:8000/api/guichet/?agence=${agence}&page=${page}&start_date=${start_date}&end_date=${end_date}`,

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
  // target_audience: string
) => {
  return useQuery({
    queryKey: ["guichet", page, start_date, end_date, agence],
    queryFn: () =>
        getGuichet(page, start_date, end_date, agence),
    // getEntities(page, size, search, type, status),
  });
};

