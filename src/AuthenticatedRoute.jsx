import React from 'react';
import { Navigate } from 'react-router-dom';

// This component will redirect to login if the user is not authenticated
const AuthenticatedRoute = ({ element, ...rest }) => {
  const userEmail = localStorage.getItem('userEmail');
  
  return userEmail ? element : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
