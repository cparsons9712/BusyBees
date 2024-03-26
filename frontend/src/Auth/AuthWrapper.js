import { createContext, useContext, useState, useEffect } from "react";
import axios from "../APIs/auth";
import { useNavigate } from "react-router-dom";
import { useModal } from "../Context/Modal";
import Loading from "../Components/Pages/Loading";

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
            console.log('UseEffect res: ', response.data);
            if (response.data.user) {
                setUser({ ...response.data.user, isAuthenticated: true });
            }
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setUser({ isAuthenticated: false });

        } finally {
          setLoading(false)
          // uncomment this section and refresh
          // to get a good look at loading screen
          // setTimeout(() => {
          //   setLoading(false);
          // }, 5000);
        }
    };

    checkAuthStatus();
  }, []);

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
      throw error;
    }
  };

  const signup = async (payload) => {
    console.log('IN AUTHWRAP SIGNUP:::')
    console.log(payload)
    try {
      const response = await axios.post(
        "/signup",
        payload,
        { withCredentials: true }
      );
      // Assuming the response includes the user's name or other identifier
      setUser({ name: response.data.name, isAuthenticated: true });
      hideModal();
      goTo("/dash");
      return "success"; // Or you could return something more useful here, like user data
    } catch (error) {
      console.error("SignUp error:", error);
      throw error;
    }
  };

  const logout = async () => {

    try {
      await axios.get(
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


// Replace your loading condition
if(loading) return <Loading />

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
