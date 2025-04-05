import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";

function PrivetRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ redirectTo: location.pathname }} />;
}

export default PrivetRoute;
