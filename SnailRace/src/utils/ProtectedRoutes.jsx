import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

  const ProtectedRoutes = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext); 
  const location = useLocation();

  const isAuthenticated = !!user;
  const userRole = user?.role;


  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
