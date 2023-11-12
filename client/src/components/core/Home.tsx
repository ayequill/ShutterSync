import React from 'react';
import { FaAnglesRight } from 'react-icons/fa6';

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
import HomeBG from '../../assets/home.jpg';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'animate.css';

function Home(): JSX.Element {
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
        py="50px"
        // px="20px"
        alignItems="center"
        bgColor="#0078D4"
        borderRadius="50px"
        mt="20px"
        width="100%"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <VStack flexBasis="50%" alignItems="start" p="20px" color="white">
          <Text
            textAlign="left"
            fontSize={{ base: '2xl', lg: '4xl' }}
            mb="10px"
            className="animate__animated animate__bounceInLeft"
          >
            Join ShutterSync
          </Text>
          <Text fontSize="sm" className="animate__animated animate__fadeInUp">
            ShutterSync aims to address the need for professional photographers
            to efficiently share and collaborate on their work with clients,
            enhancing client engagement and project management.
          </Text>
          <Box color="white" bgColor="black" rounded="xl" mt="40px">
            <Button rightIcon={<FaAnglesRight />}>
              <Link href="/signup">Get started for free</Link>
            </Button>
          </Box>
        </VStack>
        <Flex
          flexBasis="50%"
          display={{ base: 'none', lg: 'flex' }}
          justifyContent="center"
        >
          <Image
            src={HomeBG}
            maxW="400px"
            borderRadius="50px"
            alt="ShutterSync Logo"
          />
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
