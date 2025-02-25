import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/APICabins";

function useCabins() {
  const {
    data: cabins,
    error,
    isLoading,
    // status,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { cabins, error, isLoading };
}

export default useCabins;
