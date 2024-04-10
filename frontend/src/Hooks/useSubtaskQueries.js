import axios from "../APIs/subtask";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateSubtask = () => {
  const queryClient = useQueryClient();

  const fetchCreateSubtask = async ({ payload }) => {
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
      }
    }
  };

  const mutation = useMutation(fetchCreateSubtask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["unassignedTask"]);
      queryClient.invalidateQueries(["activeBlocks"]);
      queryClient.invalidateQueries(["allBlocks"]);
      queryClient.invalidateQueries(["Subtask"]);
    },
  });
  return mutation;
};

export const useGetSubtask = (taskId) => {
  const fetchSubtask = async () => {
    const response = await axios.get(`/${taskId}`, { withCredentials: true });
    return response.data;
  };
  const { data: subtask } = useQuery({
    queryKey: [`Subtask`],
    queryFn: fetchSubtask,
  });
  return { subtask };
};

export const useChangeSubtaskStatus = () => {
    const queryClient = useQueryClient();

    const { mutate, ...otherMutationProps } = useMutation(async (subtask) => {
        const payload = { title: subtask.title, status: !subtask.status };
        const response = await axios.put(`/${subtask.id}`, payload, {
            withCredentials: true,
        });
        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["unassignedTask"]);
            queryClient.invalidateQueries(["activeBlocks"]);
            queryClient.invalidateQueries(['Subtask']);
        },
    });

    // Directly return the mutate function along with other props if needed
    return { mutate, ...otherMutationProps };
};

export const useDeleteSubtask = () => {
    const queryClient = useQueryClient();
    const fetchDeleteSubtask = async ({id}) => {
      const response = await axios.delete(`/${id}`, { withCredentials: true });
      return response.data;
    };

    const mutation = useMutation(fetchDeleteSubtask, {
        onSuccess: () => {
            queryClient.invalidateQueries(['Subtask'])
        }
    })

    return mutation;
};

export const useChangeSubtaskTitle = () =>{
    const queryClient = useQueryClient();

    const { mutate} = useMutation(async ({id, payload}) => {


        const response = await axios.put(`/${id}`, payload, {
            withCredentials: true,
        });
        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["unassignedTask"]);
            queryClient.invalidateQueries(["activeBlocks"]);
            queryClient.invalidateQueries(['Subtask']);
        },
    });

    // Directly return the mutate function along with other props if needed
    return { mutate };
}
