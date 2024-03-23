import React, { createContext, useContext, useState } from "react";
import axios from "../APIs/auth";

export const AuthContext = createContext(); // It's better to initialize context with null or a more descriptive initial value

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      // Assuming the response includes the user's name or other identifier
      setUser({ name: response.data.name, isAuthenticated: true });
      return "success"; // Or you could return something more useful here, like user data
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Propagate the error to be handled where login is called
    }
  };

  const signup = async (email, password, name) => {
    // Implement signup logic here, similar to login
  };

  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
    // You might also want to call a backend endpoint to invalidate the session
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
