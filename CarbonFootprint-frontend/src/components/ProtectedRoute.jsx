import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.mustResetPassword) return <Navigate to="/reset-password" replace />;
  return children;
}

export default ProtectedRoute;
