import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ChartDepot = {
    Produit:string,
    Nombre:number,
    Depot:number
}

export const Depot_KEY = ["Depot"];

async function getChartDepot(
  agence : string
): Promise<ChartDepot[]> {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/parque_depot/?agence=${agence}`,

    {
    
    }
  );
  console.log("response : ", response.data)
  return response.data;
}
export const useGetChartsDepots = (

  agence: string,
  
) => {
  return useQuery({
    queryKey: ["Depot",agence],
    queryFn: () =>
        getChartDepot( agence),
  });
};

