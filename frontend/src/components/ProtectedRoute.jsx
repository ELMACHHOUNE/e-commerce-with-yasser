import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Get the stored role

  if (!token) {
    return <Navigate to="/" />; // If no token, redirect to login page
  }

  if (role !== 'admin') {
    return <Navigate to="/admin" />; // If the role is not admin, redirect to home
  }

  return children; // Render the children (admin dashboard) if the user is admin
};

export default ProtectedRoute;
