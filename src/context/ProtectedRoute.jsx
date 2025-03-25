import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user || !user.token) {
    return <Navigate to="/login" replace/>;
  }

  if (roleRequerid && user.role !== requiredRole) {
    return <Navigate to="/login" replace/>; 
  }

  return children;

};

export default ProtectedRoute;

