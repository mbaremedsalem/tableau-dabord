import { useQuery } from "@tanstack/react-query";
import { CompteResponse } from "../types/Compte";
import api from "../../Auth-services/axios";


export const COMPTES_KEY = ["comptes"];

async function getEntities(
  page: number,
  size: number,
  search: string,
  type: string,
  status: string,
): Promise<CompteResponse> {
  const response = await api.get(
    `entities/?type=${type}&status=${status}&search=${search}&page=${page}&size=${size}`,
    {
    
    }
  );
  return response.data;
}
export const useGetEntities = (
  page: number,
  size: number,
  search: string,
  type: string,
  status: string,
  target_audience: string
) => {
  return useQuery({
    queryKey: ["comptes", page, size, search, type, status, target_audience],
    queryFn: () =>
      getEntities(page, size, search, type, status),
  });
};

