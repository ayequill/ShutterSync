import { Navigate } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import { isAuthenticated } from '../auth/auth-helper';

function Dashboard() {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }
  return <Box />;
}

export default Dashboard;
