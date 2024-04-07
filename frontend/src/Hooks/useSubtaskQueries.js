import axios from '../APIs/subtask';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateSubtask = () => {
    const queryClient = useQueryClient();

    const fetchCreateSubtask = async ({ payload }) => {
        try{
            const response = await axios.post("/", payload, {
                withCredentials: true,
              });
              console.log(response.data)
              return response.data;
        }catch (error){
            if (error.response) {
                throw new Error(
                  error.response.data.message ||
                    "An error occurred while creating the task."
                );
            } else if (error.request) {
                throw new Error(
                  "No response was received when attempting to create the task."
                );
            } else {
                throw new Error(
                  "An error occurred while setting up the request to create the task."
                );
            }
        }
    }

    const mutation = useMutation(fetchCreateSubtask, {
        onSuccess: () => {
            queryClient.invalidateQueries(["unassignedTask"]);
            queryClient.invalidateQueries(["activeBlocks"]);
            queryClient.invalidateQueries(["allBlocks"]);
        },
    });
    return mutation;
}
