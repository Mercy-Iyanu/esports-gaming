// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return !!user?.token;
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
