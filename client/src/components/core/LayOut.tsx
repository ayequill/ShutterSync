import React, { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

import Navbar from './NavBar';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
}

export default MainLayout;
