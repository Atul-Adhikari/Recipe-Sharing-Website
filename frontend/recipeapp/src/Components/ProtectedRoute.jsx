import { Navigate } from "react-router-dom";

// A component that protects routes from unauthenticated users
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
