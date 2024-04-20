import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../APIs/users";
import { useModal } from "../Context/Modal";
import { AuthData } from "../Auth/AuthWrapper";
import Selfie from "../Components/Modals/Selfie";
import authAxios from "../APIs/auth";
import { useNavigate } from "react-router-dom";

export const useGetUser = () => {
  const fetchAuthenticatedUser = async () => {
    console.log("ABOUT TO DO AXIOS GET USER");
    try {
      const response = await authAxios.get("/status", {
        withCredentials: true,
      });
      console.log("API response data:", response.data);
      // Ensure that we never return undefined:
      return response.data.user || null; // Return null if user data is undefined
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error; // Properly propagate errors
    }
  };

  const {
    data: user,
    isError,
    isLoading,
    error,
  } = useQuery(["user"], fetchAuthenticatedUser, {
    onError: (err) => {
      console.error("Failed to load user data:", err);
    },
  });

  return { user, isError, isLoading, error };
};

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

    },
  });

  return mutation;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const goTo = useNavigate();
  const { hideModal } = useModal();

  const fetchLogOut = async () => {
    // Removed the unused parameter { id }
    try {
      const response = await authAxios.get("/logout", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            "An error occurred while logging the user out"
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
      queryClient.clear(); // Optionally clear all queries from cache
      hideModal();
      goTo("/");
    },
  });

  return mutation;
};

export const useLogIn = () => {
  const queryClient = useQueryClient();
  const goTo = useNavigate();
  const { hideModal } = useModal();

  const fetchLogIn = async ({ email, password }) => {
    try {
      const response = await authAxios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("IN TRY: ", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "An error occurred while logging in."
        );
      } else if (error.request) {
        throw new Error("No response was received when attempting to log in.");
      } else {
        throw new Error(
          "An error occurred while setting up the request to log in."
        );
      }
    }
  };

  const mutation = useMutation(fetchLogIn, {
    onSuccess: (data) => {
      // Handle post-login success
      queryClient.invalidateQueries(["user"]);
      hideModal();
      console.log("IN on SUCCESS");
      setTimeout(() => {
        console.log("TIMES UP");
        goTo("/dash");
      }, 60);
      goTo("/dash");
    },
    onError: (error) => {
      // Handle errors, e.g., setting error messages based on response
      console.error("Login error:", error);
    },
  });

  return mutation;
};
