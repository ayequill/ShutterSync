import React, { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

import Footer from './Footer';
import Navbar from './NavBar';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
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
