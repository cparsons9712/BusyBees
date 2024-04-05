import axios from "../APIs/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../Context/Modal";

export const useGetUnassignedTask = () => {
  const fetchUnassignedTask = async () => {
    const response = await axios.get("/unassigned", { withCredentials: true });
    return response.data;
  };
  const {
    data: unassignedTask,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["unassignedTask"],
    queryFn: fetchUnassignedTask,
  });
  return { unassignedTask, isError, isLoading, error };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { hideModal } = useModal();

  const fetchCreateTask = async ({ payload }) => {
    try {
      const response = await axios.post("/", payload, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            "An error occurred while creating the block."
        );
      } else if (error.request) {
        console.log(error.request);
        throw new Error(
          "No response was received when attempting to create the block."
        );
      } else {
        console.log("Error", error.message);
        throw new Error(
          "An error occurred while setting up the request to create the block."
        );
      }
    }
  };
  const mutation = useMutation(fetchCreateTask, {
    onSuccess: () => {
        queryClient.invalidateQueries(["unassignedTask"])
        queryClient.invalidateQueries(['activeBlocks']);
        queryClient.invalidateQueries(['allBlocks']);
        hideModal();
    }
  });
  return mutation;
};
