import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { isAuthenticated } from './auth-helper';

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  if (!isAuthenticated()) return <Navigate to="/signin" replace />;
  return children;
}

export default PrivateRoute;
