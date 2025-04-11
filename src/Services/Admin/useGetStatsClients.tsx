import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClientResponse } from "../types/Client";
import { BaseUrl } from "../../api/BaseUrl";


export const CLIENTS_KEY = ["clients"];

async function getClientsStats(
  agence : string
): Promise<ClientResponse> {
  const response = await axios.get(
    `${BaseUrl}api/client/?agence=${agence}`,

    {
    
    }
  );
  return response.data;
}
export const useGetClientsStats = (

  agence: string,
  
) => {
  return useQuery({
    queryKey: ["clients",agence],
    queryFn: () =>
        getClientsStats( agence),
  });
};

