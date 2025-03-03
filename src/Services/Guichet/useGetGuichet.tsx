import { useQuery } from "@tanstack/react-query";
// import api from "../../Auth-services/axios";
import axios from "axios";
import { GuichetResponse } from "../types/Guiche";


export const GUICHET_KEY = ["guichet"];

async function getGuichet(
  page: number,
  // size: number,
  // search: string,
  // type: string,
  // status: string,
): Promise<GuichetResponse> {
  const response = await axios.get(
    // `/api/compte_details/`,
    `http://127.0.0.1:8000/api/guichet/?page=${page}`,

    // `/api/compte_details//?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    {
    
    }
  );
  return response.data;
}
export const useGetGuichet = (
  page: number,
  // size: number,
  // type: string,
  // status: string,
  // target_audience: string
) => {
  return useQuery({
    queryKey: ["comptes", page],
    queryFn: () =>
        getGuichet(page),
    // getEntities(page, size, search, type, status),
  });
};

