import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BaseUrl } from "../../../api/BaseUrl";

type ChartClient = {
    ageclib:string,
    count:number
}

export const CLIENTS_KEY = ["clients"];

async function getVirements(
  agence : string
): Promise<ChartClient[]> {
  const response = await axios.get(
    `${BaseUrl}api/parque_client/?agence=${agence}`,

    {
    
    }
  );
  console.log("response : ", response.data)
  return response.data;
}
export const useGetChartsVirements = (

  agence: string,
  
) => {
  return useQuery({
    queryKey: ["clients",agence],
    queryFn: () =>
        getVirements( agence),
  });
};

