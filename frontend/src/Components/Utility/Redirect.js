import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../Auth/AuthWrapper"; // Adjust the import path as necessary

export const Redirect = () => {
  const navigate = useNavigate();
  const { user } = AuthData(); // Use your AuthData hook to access the user's authentication status

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/dash"); // If the user is authenticated, redirect to the dashboard
    } else {
      navigate("/"); // If the user is not authenticated, redirect to the homepage
    }
  }, [navigate, user.isAuthenticated]); // Depend on navigate and user's authentication status

  // Optional: Render a loading indicator or return null while waiting for the redirect
  return null; // or <div>Redirecting...</div>;
};
