import React from 'react';

import { Box, Spinner } from '@chakra-ui/react';

function LoaderComponent() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="1000"
      display="flex"
      justifyContent="center"
      alignItems="center"
      _dark={{ bg: 'rgba(0,0,0,0.5)' }}
      bg="rgba(255,255,255,0.5)"
    >
      <Spinner
        size="xl"
        color="blue.500"
        thickness="5px"
        emptyColor="gray.200"
      />
    </Box>
  );
}

export default LoaderComponent;
