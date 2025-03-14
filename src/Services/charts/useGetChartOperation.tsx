import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ChartOperation = {
    type_operation:string,
    Nombre:number,
}

export const operations_ke = ["guichet-charts"];

async function getChartGuichet(
  agence : string
): Promise<ChartOperation[]> {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/parque_guichet/?agence=${agence}`,

    {
    
    }
  );
  console.log("response : ", response.data)
  return response.data;
}
export const useGetChartsGuichet = (

  agence: string,
  
) => {
  return useQuery({
    queryKey: ["guichet-charts",agence],
    queryFn: () =>
        getChartGuichet( agence),
  });
};

