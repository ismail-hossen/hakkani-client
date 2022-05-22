import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = true;
  if (!user) {
        return <Navigate to="/login"></Navigate>
  }
  return children;
};

export default PrivateRoute;
