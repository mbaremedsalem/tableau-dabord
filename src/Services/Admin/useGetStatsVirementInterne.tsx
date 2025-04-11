import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClientResponse } from "../types/Client";
import { BaseUrl } from "../../api/BaseUrl";


export const VIREMENT_INTERNE = ["virements"];

async function getVirementInterne(
  agence : string
): Promise<ClientResponse> {
  const response = await axios.get(
    `${BaseUrl}api/virement_intern/?agence=${agence}`,

    {
    
    }
  );
  return response.data;
}
export const useGetStatsVirementInterne = (

  agence: string,
  
) => {
  return useQuery({
    queryKey: ["virements",agence],
    queryFn: () =>
        getVirementInterne( agence),
  });
};

