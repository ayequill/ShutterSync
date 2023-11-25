import React, { ReactNode, useEffect } from 'react';

import { Box } from '@chakra-ui/react';

import { isAuthenticated } from '../auth/auth-helper';
import { useUser } from '../contexts/userContext';

import Footer from './Footer';
import Navbar from './NavBar';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { setUser } = useUser();

  useEffect(() => {
    if (isAuthenticated()) setUser(isAuthenticated().user);
  }, [setUser]);
  return (
    <Box>
      <Navbar />
      <Box as="main" minH="100vh">
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default MainLayout;
