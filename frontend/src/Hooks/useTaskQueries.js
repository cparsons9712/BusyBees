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
            "An error occurred while creating the task."
        );
      } else if (error.request) {
        console.log(error.request);
        throw new Error(
          "No response was received when attempting to create the task."
        );
      } else {
        console.log("Error", error.message);
        throw new Error(
          "An error occurred while setting up the request to create the task."
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

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { hideModal } = useModal();

  const fetchEditTask = async ({ id, payload }) => {
    try {
      console.log("In hook try:: ")
      console.log("ID: ", id, "PAYLOAD: ", payload)
      const response = await axios.put(`/${id}`, payload, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            "An error occurred while editing the task."
        );
      } else if (error.request) {
        console.log(error.request);
        throw new Error(
          "No response was received when attempting to edit the task."
        );
      } else {
        console.log("Error", error.message);
        throw new Error(
          "An error occurred while setting up the request to edit the task."
        );
      }
    }
  };
  const mutation = useMutation(fetchEditTask, {
    onSuccess: () => {
        queryClient.invalidateQueries(["unassignedTask"])
        queryClient.invalidateQueries(['activeBlocks']);
        queryClient.invalidateQueries(['allBlocks']);
        hideModal();
    }
  });
  return mutation;
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const {hideModal} =useModal()

  const fetchDeleteTask = async ({ id }) => {
    try {
      const response = await axios.delete(`/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "An error occurred while deleting the block.");
      } else if (error.request) {
        console.log(error.request);
        throw new Error("No response was received when attempting to delete the block.");
      } else {
        console.log('Error', error.message);
        throw new Error("An error occurred while setting up the request to delete the block.");
      }
    }
  };

  const mutation = useMutation(fetchDeleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["unassignedTask"])
      queryClient.invalidateQueries(['activeBlocks']);
      queryClient.invalidateQueries(['allBlocks']);
      hideModal();
    },

  });

  return mutation;
}

export const useCompleteTask = () => {
  const queryClient = useQueryClient();
  const {hideModal} =useModal()

  const fetchCompleteTask = async ({ id }) => {
    try { // WITHOUT THE CONFIG TYPED OUT LIKE THIS THE REQUEST FAILS AS UNAUTHORIZED. DO NOT CHANGE
      const requestConfig = {
        method: 'put',
        url: `/complete/${id}`,
        withCredentials: true,
      };
      const response = await axios(requestConfig);


      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "An error occurred while deleting the block.");
      } else if (error.request) {
        console.log(error.request);
        throw new Error("No response was received when attempting to delete the block.");
      } else {
        console.log('Error', error.message);
        throw new Error("An error occurred while setting up the request to delete the block.");
      }
    }
  };

  const mutation = useMutation(fetchCompleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["unassignedTask"])
      queryClient.invalidateQueries(['activeBlocks']);
      queryClient.invalidateQueries(['allBlocks']);
      hideModal();
    },

  });

  return mutation;
}
