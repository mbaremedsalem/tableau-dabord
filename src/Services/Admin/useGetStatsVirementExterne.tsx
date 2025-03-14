import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClientResponse } from "../types/Client";


export const VIREMENT_EXTERNE = ["virements"];

async function getVirementExterne(
  agence : string
): Promise<ClientResponse> {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/virement/?agence=${agence}`,

    {
    
    }
  );
  return response.data;
}
export const useGetStatsVirementExterne = (

  agence: string,
  
) => {
  return useQuery({
    queryKey: ["virements-ex",agence],
    queryFn: () =>
        getVirementExterne( agence),
  });
};

