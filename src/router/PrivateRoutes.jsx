import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <span class="loading loading-spinner text-primary"></span>
      </div>
    ); // ou un spinner de chargement
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
