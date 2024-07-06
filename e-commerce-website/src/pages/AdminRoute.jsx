import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
