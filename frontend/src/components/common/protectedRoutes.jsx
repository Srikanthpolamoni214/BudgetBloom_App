// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to access this page.");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("token");
      alert("Session expired. Please log in again.");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
