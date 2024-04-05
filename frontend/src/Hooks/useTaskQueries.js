import axios from "../APIs/task";
import { useQuery } from "@tanstack/react-query";
export const useGetUnassignedTask = () => {
    const fetchUnassignedTask = async () => {
      const response = await axios.get('/unassigned', { withCredentials: true });
      return response.data;
    };

    const { data: unassignedTask, isError, isLoading, error } = useQuery({
      queryKey: ['unassignedTask'],
      queryFn: fetchUnassignedTask
    });

    // Return these values so your components can use them.
    return { unassignedTask, isError, isLoading, error };
  };
