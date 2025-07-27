// src/components/UserOnlyRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext';

const UserOnlyRoute = ({ children }) => {
  const { isLoggedin, role, loading } = useContext(UserContext);

  if (loading) return <p>Checking access...</p>;
  // console.log(isLoggedin)

  if (isLoggedin && role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default UserOnlyRoute;
