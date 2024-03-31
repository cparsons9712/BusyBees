import { useQuery } from "@tanstack/react-query";
import axios from "../APIs/blocks";

export const useActiveBlocks = () => {
  const fetchActiveBlock = async () => {
    const response = await axios.get('/active', { withCredentials: true });
    return response.data;
  };

  // Using a more descriptive query key and returning all relevant data and states.
  const { data: currBlock, isError, isLoading, error } = useQuery({
    queryKey: ['activeBlocks'],
    queryFn: fetchActiveBlock
  });

  // Return these values so your components can use them.
  return { currBlock, isError, isLoading, error };
};
