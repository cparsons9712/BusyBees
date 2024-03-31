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

export const useAllBlocks = () => {
  const fetchAllBlocks = async () => {
    const response = await axios.get('/', { withCredentials: true });
    return response.data;
  };

  // Using a more descriptive query key and returning all relevant data and states.
  const { data: allBlocks, isError, isLoading, error } = useQuery({
    queryKey: ['allBlocks'],
    queryFn: fetchAllBlocks
  });

  // Return these values so your components can use them.
  return { allBlocks, isError, isLoading, error };
};



export const useBlocksByDay = (dayOfWeek) => {
  const fetchBlocksbyDay = async () => {
    const response = await axios.get(`/day/${dayOfWeek}`, { withCredentials: true });
    console.log('DAY BLOCKS: ', response.data)
    return response.data;
  };

  const { data: blocks, isError, isLoading, error } = useQuery({
    queryKey: ['dayBlocks', dayOfWeek],
    queryFn: fetchBlocksbyDay
  });

  return { blocks, isError, isLoading, error };
};
