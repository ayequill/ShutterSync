import { motion } from 'framer-motion';
import React, { lazy, Suspense } from 'react';
import { FaAnglesRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';

import HomeBG from '../../assets/home.webp';
import { isAuthenticated } from '../auth/auth-helper';
import useTimeout from '../hooks/useTimeOut';

import LoaderComponent from './Loader';

const Features = lazy(() => import('./Features'));

function Home(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  const hide = () => setIsLoading(false);
  useTimeout(hide, 1500);

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <Box
      as="section"
      m="20px auto"
      maxW="1400px"
      px={{ base: '10px', md: '20px', lg: '40px' }}
      mb={{ base: '20px', md: '80px' }}
    >
      <Flex
        justifyContent="space-between"
        gap="10px"
        py={{ base: '50px', lg: '80px' }}
        px="10px"
        alignItems="center"
        // bgImage={bg}
        bgSize="cover"
        bgRepeat="no-repeat"
        borderRadius={{ base: '50px 10px', md: '50px' }}
        mt="20px"
        width="100%"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <VStack flexBasis="50%" alignItems="start" p="20px">
          <Flex fontSize={{ base: '2xl', lg: '4xl' }}>
            <motion.p
              style={{ textAlign: 'left', marginBottom: '10px' }}
              className="animate__animated animate__bounceInLeft"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
            >
              Join Shutter
            </motion.p>{' '}
            <Text color="blue.500">Sync</Text>
          </Flex>
          <Text
            fontSize={{ base: 'sm', lg: 'md' }}
            className="animate__animated animate__fadeInUp"
            textShadow="lg"
            lineHeight="6"
          >
            ShutterSync aims to address the need for professional photographers
            to efficiently share and collaborate on their work with clients,
            enhancing client engagement and project management.
          </Text>
          <Box color="white" rounded="xl" mt="40px">
            <Button
              rightIcon={<FaAnglesRight />}
              _hover={{ boxShadow: 'xl', transform: 'scale(1.03)' }}
              _dark={{ bg: 'blue.500' }}
              color="white"
              bg="blackAlpha.900"
              onClick={() => navigate('/signin')}
            >
              Get started for free
            </Button>
          </Box>
        </VStack>
        <Flex
          flexBasis="50%"
          display={{ base: 'none', md: 'flex' }}
          justifyContent="center"
          // transform='rotate(-12deg)'
          // pos='absolute'
          // right='-15%'
          // top='8%'
        >
          <Image src={HomeBG} alt="ShutterSync Logo" loading="lazy" p={2} />
        </Flex>
      </Flex>
      <Flex />
      <Suspense fallback={<LoaderComponent />}>
        <Features />
      </Suspense>
    </Box>
  );
}

export default Home;
