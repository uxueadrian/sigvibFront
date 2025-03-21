import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Si no hay usuario o no es admin, redirigir al login
  if (!user || user.role !== "ROLE_ADMINISTRADOR") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
