import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  console.log("User:", user);
  console.log("Required Role:", requiredRole);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roleRequerid && user.role !== requiredRole) {
    return <Navigate to="/unauthorized"/>; 
  }

  return children;
};

export default ProtectedRoute;