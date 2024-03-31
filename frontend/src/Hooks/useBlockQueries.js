import { useQuery } from "@tanstack/react-query";
import axios from "../APIs/blocks";

export const useActiveBlocks = () => {
  const queryKey = "activeBlocks";

  const fetchActiveBlocks = async () => {
    try {
      const response = await axios.get('/active', { withCredentials: true });
      console.log(response.data); // Log the response data
      return response.data;
    } catch (error) {
      console.error('Error fetching active blocks:', error);
      throw error;
    }
  };;

  const {
    data: activeBlocks,
    isLoading,
    isError,
    error,
  } = useQuery(queryKey, fetchActiveBlocks);

  return { activeBlocks, isLoading, isError, error };
};
