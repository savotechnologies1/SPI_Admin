import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LucideLoaderCircle } from "lucide-react";

const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <LucideLoaderCircle className="text-brand text-2xl" />
  </div>
);

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
