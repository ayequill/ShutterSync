import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Center, Image } from '@chakra-ui/react';

import ErrorImage from '../../assets/404.svg';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Center w="100%" flexDirection="column" py={30}>
      <Box px={3}>
        <Image maxW="300px" src={ErrorImage} alt="Error" />
      </Box>
      <Box mt={4}>
        <Button
          colorScheme="blue"
          onClick={() => navigate('/')}
          _hover={{ bg: 'blue.500' }}
        >
          Go Back
        </Button>
      </Box>
    </Center>
  );
}

export default ErrorPage;
