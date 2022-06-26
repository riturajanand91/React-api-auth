import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useLocation,
  Navigate,
} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const auth = useSelector((state) => state.auth.isLoggedIn);
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
export default ProtectedRoute;