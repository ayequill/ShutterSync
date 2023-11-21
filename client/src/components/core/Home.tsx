import React from 'react';
import { FaAnglesRight } from 'react-icons/fa6';
import { Navigate, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

import Customer from '../../assets/customer.svg';
import Flow from '../../assets/flow.svg';
import Gallery from '../../assets/gallery.svg';
import HomeBG from '../../assets/home.webp';
import { isAuthenticated } from '../auth/auth-helper';
import useTimeout from '../hooks/useTimeOut';

import LoaderComponent from './Loader';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'animate.css';

function Home(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  const hide = () => setIsLoading(false);
  useTimeout(hide, 1500);

  if (isAuthenticated()) {
    navigate('/dashboard', { replace: true });
  }
  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <Box
      as="section"
      m="20px auto"
      maxW="1400px"
      px={{ base: '10px', md: '20px', lg: '40px' }}
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
          <Text
            textAlign="left"
            fontSize={{ base: '2xl', lg: '4xl' }}
            mb="10px"
            className="animate__animated animate__bounceInLeft"
            display="inline-flex"
          >
            Join Shutter<Text color="blue.500">Sync</Text>
          </Text>
          <Text
            fontSize="sm"
            className="animate__animated animate__fadeInUp"
            textShadow="lg"
          >
            ShutterSync aims to address the need for professional photographers
            to efficiently share and collaborate on their work with clients,
            enhancing client engagement and project management.
          </Text>
          <Box color="white" rounded="xl" mt="40px">
            <Button
              rightIcon={<FaAnglesRight />}
              // border="none"
              // outline="none"
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
      <SimpleGrid columns={{ base: 1, lg: 3 }} mt="50px" p={10}>
        <VStack spacing={8}>
          <Image src={Gallery} alt="Customer" width="100px" />
          <Text textAlign="center" fontSize="sm">
            Effortlessly organize and showcase your stunning portfolio with
            ShutterSync intuitive gallery management. Seamlessly upload,
            arrange, and update your work to create a visual narrative that
            captivates clients and enhances your professional image.
          </Text>
        </VStack>

        <VStack spacing={8}>
          <Image src={Customer} alt="Customer" width="100px" />
          <Text textAlign="center" fontSize="sm">
            Foster meaningful interactions with clients through
            ShutterSync&apos;s collaborative features. Invite feedback, share
            drafts, and streamline communication to ensure that every project
            unfolds with precision.
          </Text>
        </VStack>

        <VStack spacing={8}>
          <Image src={Flow} alt="Customer" width="100px" />
          <Text textAlign="center" fontSize="sm">
            From initial concept to final delivery, ShutterSync optimizes your
            project workflow. Enjoy a centralized hub for all project assets,
            streamline file sharing, and track project progress effortlessly.
            Enhance your project management capabilities, allowing you to focus
            more on what you love – capturing extraordinary moments.
          </Text>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}

export default Home;
