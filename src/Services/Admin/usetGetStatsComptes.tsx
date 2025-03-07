import { useQuery } from "@tanstack/react-query";
import { CompteResponse } from "../types/Compte";
// import api from "../../Auth-services/axios";
import axios from "axios";


export const COMPTES_KEY = ["comptes"];

async function getComptesStats(
//   page: number,
  agence : string
  // size: number,
  // search: string,
  // type: string,
  // status: string,
): Promise<CompteResponse> {
  const response = await axios.get(
    // `/api/compte_details/`,
    `http://127.0.0.1:8000/api/compte_depot/?AGENCE=${agence}`,

    // `/api/compte_details//?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    {
    
    }
  );
  return response.data;
}
export const useGetComptesStats = (
//   page: number,
  // size: number,
  agence: string,
  // type: string,
  // status: string,
  // target_audience: string
) => {
  return useQuery({
    queryKey: ["comptes",agence],
    queryFn: () =>
        getComptesStats( agence),
    // getEntities(page, size, search, type, status),
  });
};

