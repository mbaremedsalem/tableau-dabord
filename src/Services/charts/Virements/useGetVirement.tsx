import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ChartClient = {
    ageclib:string,
    count:number
}

export const CLIENTS_KEY = ["clients"];

async function getVirements(
  agence : string
): Promise<ChartClient[]> {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/parque_client/?agence=${agence}`,

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

