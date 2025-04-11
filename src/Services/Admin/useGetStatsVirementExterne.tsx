import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClientResponse } from "../types/Client";
import { BaseUrl } from "../../api/BaseUrl";


export const VIREMENT_EXTERNE = ["virements"];

async function getVirementExterne(
  agence : string
): Promise<ClientResponse> {
  const response = await axios.get(
    `${BaseUrl}api/virement/?agence=${agence}`,

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

