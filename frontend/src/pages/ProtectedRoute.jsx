import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.indexOf(role) === -1) {
    return <Navigate to="/unauthorized" />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;
