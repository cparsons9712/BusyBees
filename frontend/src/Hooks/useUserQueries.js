import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../APIs/users"
import { useModal } from "../Context/Modal";
import { AuthData } from "../Auth/AuthWrapper";
import Selfie from "../Components/Modals/Selfie";
import authAxios from "../APIs/auth"
import { useNavigate } from "react-router-dom";

export const useGetUser = () => {
    const fetchAuthenticatedUser = async () => {
        const response = await authAxios.get("/status", {
            withCredentials: true
        });
        return response.data.user;
    }

    const {
        data: user,
        isError,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["user"],
        queryFn: fetchAuthenticatedUser,
    })

    return { user, isError, isLoading, error}
}

export const useEditUserProfile = () => {
  const queryClient = useQueryClient();
  const { showModal } = useModal();

  const fetchEditUserProfile = async ({ id, payload }) => {
    try {
      const response = await axios.put(`/${id}`, payload, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            "An error occurred while updating the users information."
        );
      } else if (error.request) {
        throw new Error(
          "No response was received when attempting to update the users information."
        );
      } else {
        throw new Error(
          "An error occurred while setting up the request to update the users information."
        );
      }
    }
  };

  const mutation = useMutation(fetchEditUserProfile, {
    onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        // queryClient.invalidateQueries(["activeBlocks"]);
        // queryClient.invalidateQueries(["allBlocks"]);
        // queryClient.invalidateQueries(["dayBlocks"]);
        // queryClient.invalidateQueries(["unassignedTask"]);

    },
  });

  return mutation;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const goTo = useNavigate(); // Move this line to the top level of the hook
  const { hideModal } = useModal(); // Assuming you have a hideModal function in your Modal context

  const fetchLogOut = async () => { // Removed the unused parameter { id }
    try {
      const response = await authAxios.get("/logout", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "An error occurred while logging the user out"
        );
      }
    }
  };

  const mutation = useMutation(fetchLogOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["activeBlocks"]);
      queryClient.invalidateQueries(["allBlocks"]);
      queryClient.invalidateQueries(["dayBlocks"]);
      queryClient.invalidateQueries(["unassignedTask"]);
      hideModal();
      goTo('/');
    },
  });

  return mutation;
};
