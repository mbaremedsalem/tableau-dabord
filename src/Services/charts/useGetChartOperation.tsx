import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BaseUrl } from "../../api/BaseUrl";

type ChartOperation = {
    type_operation:string,
    Nombre:number,
}

export const operations_ke = ["guichet-charts"];

async function getChartGuichet(
  agence : string
): Promise<ChartOperation[]> {
  const response = await axios.get(
    `${BaseUrl}api/parque_guichet/?agence=${agence}`,

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

