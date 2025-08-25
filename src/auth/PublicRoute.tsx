// src/components/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  // If the user IS authenticated, redirect them away from the public page (e.g., to the dashboard).
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />; // Adjust the redirect path as needed
  }

  // If they are not authenticated, show the public page (SignIn, SignUp, etc.).
  return <Outlet />;
};

export default PublicRoute;
