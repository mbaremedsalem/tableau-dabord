import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ChartDepot = {
    libelle:string,
    count:number,
}

export const COMPTES_CHARTES_KEY = ["comptes-charts"];

async function getChartComptes(
  agence : string
): Promise<ChartDepot[]> {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/parque_count/?agence=${agence}`,

    {
    
    }
  );
  console.log("response : ", response.data)
  return response.data;
}
export const useGetChartsComptes = (

  agence: string,
  
) => {
  return useQuery({
    queryKey: ["Comptes-charts",agence],
    queryFn: () =>
        getChartComptes( agence),
  });
};

