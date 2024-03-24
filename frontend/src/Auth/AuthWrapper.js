import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../APIs/auth";
import Lottie from 'react-lottie';
import animationData from '../Media/BeesFlying.json'
import { useNavigate } from "react-router-dom";
import { useModal } from "../Context/Modal";


export const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);



export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "", isAuthenticated: false });
  const [loading, setLoading] = useState(true)
  const goTo = useNavigate();
  const { hideModal } = useModal();


  useEffect(() => {
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('/status', { withCredentials: true });
            console.log('UseEffect res: ', response.data.user);
            if (response.status === 200) {
                setUser({ ...response.data.user, isAuthenticated: true });
            }
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setUser({ isAuthenticated: false });
            goTo('/'); // Redirect to homepage on error
        } finally {
          setLoading(false);
        }
    };

    checkAuthStatus();
  }, [goTo]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      // Assuming the response includes the user's name or other identifier
      setUser({ name: response.data.name, email:response.data.email, isAuthenticated: true });
      hideModal();
      goTo("/dash");
      return "success"; // Or you could return something more useful here, like user data
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Propagate the error to be handled where login is called
    }
  };

  const signup = async (email, password, name) => {
    try {
      const response = await axios.post(
        "/signup",
        { email, password, name },
        { withCredentials: true }
      );
      // Assuming the response includes the user's name or other identifier
      setUser({ name: response.data.name, isAuthenticated: true });
      hideModal();
      goTo("/dash");
      return "success"; // Or you could return something more useful here, like user data
    } catch (error) {
      goTo('/')
      console.error("Login error:", error);

      throw error; // Propagate the error to be handled where login is called
    }
  };

  const logout = async () => {

    try {
      const response = await axios.get(
        "/logout",
        { withCredentials: true }
      );
      setUser({ name: "", email: "", isAuthenticated: false });
      hideModal();
      goTo("/");
      return "success";
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
 // Define Lottie options
 const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

// Replace your loading condition
if(loading) return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Lottie options={defaultOptions} height={400} width={400} />
  </div>
);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
