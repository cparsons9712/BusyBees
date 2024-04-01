import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../APIs/blocks";
import { useModal } from "../Context/Modal";

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
    return response.data;
  };

  const { data: blocks, isError, isLoading, error } = useQuery({
    queryKey: ['dayBlocks', dayOfWeek],
    queryFn: fetchBlocksbyDay
  });

  return { blocks, isError, isLoading, error };
};

export const useEditBlock = () => {
  const queryClient = useQueryClient();
  const {hideModal} =useModal()

  const fetchEditBlock = async ({ id, payload }) => {
    try {
      const response = await axios.put(`/${id}`, payload, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response) {
        // Throw an error that can be caught by React Query with more details
        throw new Error(error.response.data.message || "An error occurred while updating the block.");
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        throw new Error("No response was received when attempting to update the block.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        throw new Error("An error occurred while setting up the request to update the block.");
      }
    }
  };

  const mutation = useMutation(fetchEditBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries(['activeBlocks']);
      queryClient.invalidateQueries(['allBlocks']);
      queryClient.invalidateQueries(['dayBlocks']);
      hideModal();
    },


  });

  return mutation;
};
