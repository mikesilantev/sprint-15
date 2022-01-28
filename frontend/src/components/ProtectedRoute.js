import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ loggedIn }) {
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;