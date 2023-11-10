import React, { useState } from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  VStack,
} from '@chakra-ui/react';

import { isAuthenticated } from '../auth/auth-helper';

import Logo from '../../assets/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        bg="white"
        _dark={{ bg: 'gray.900', borderColor: 'gray.600' }}
        boxShadow="md"
        // position="fixed"
        w="100%"
        zIndex={20}
        top={0}
        left={0}
        borderBottom="1px"
        borderColor="gray.200"
        as="header"
      >
        <Flex
          maxW="screen-xl"
          mx="auto"
          p={1}
          align="center"
          justify="space-between"
        >
          <Link href="/" display="flex">
            <Image src={Logo} alt="Logo" h={8} ml={3} />
          </Link>
          <IconButton
            type="button"
            aria-label="Open main menu"
            display={{ base: 'inline-flex', md: 'none' }}
            p={2}
            w={10}
            h={10}
            // justify="center"
            fontSize="sm"
            // text="gray.500"
            rounded="lg"
            _hover={{ bg: 'gray.100' }}
            _focus={{ outline: 'none', ring: 2, ringColor: 'gray.200' }}
            _dark={{
              text: 'black.400',
              _hover: { bg: 'gray.700' },
              _focus: { ringColor: 'gray.600' },
            }}
            onClick={onToggle}
          >
            <HamburgerIcon />
          </IconButton>
          <Box
            display={{ base: 'none', md: 'flex' }}
            justifyContent="center"
            w="full"
            id="navbar-sticky"
          >
            <HStack
              p={2}
              // rounded="lg"
              fontSize="md"
              // border="1px"
              // borderColor="gray.100"
              // bg="gray.50"
              // _dark={{
              //   bg: 'gray.800',
              //   borderColor: 'gray.700',
              // }}
              spacing={{ base: 4, md: 8 }}
              alignItems="center"
              justifyContent="center"
            >
              <Link
                href="/"
                py={2}
                pl={3}
                pr={4}
                color="dark.100"
                rounded="lg"
                aria-current="page"
                bg={{ md: 'transparent' }}
                // color={{ md: 'blue.700' }}
                p={{ md: 0 }}
                _dark={{
                  color: 'blue.500',
                  bg: 'transparent',
                }}
              >
                Home
              </Link>
              <Link
                href="/about"
                py={2}
                pl={3}
                pr={4}
                color="gray.900"
                rounded="lg"
                _hover={{ bg: 'gray.100' }}
                bg={{ md: 'transparent' }}
                // color={{ md: 'blue.700' }}
                // p={{ md: 0 }}
                _dark={{
                  color: 'white',
                  bg: 'gray.700',
                  borderColor: 'gray.700',
                }}
              >
                About
              </Link>
              <Link
                href="/services"
                py={2}
                pl={3}
                pr={4}
                color="gray.900"
                rounded="lg"
                _hover={{ bg: 'gray.100' }}
                bg={{ md: 'transparent' }}
                // color={{ md: 'blue.700' }}
                // p
                // {...{ md: 0 }}
                _dark={{
                  color: 'white',
                  bg: 'gray.700',
                  borderColor: 'gray.700',
                }}
              >
                Services
              </Link>
              <Link
                href="/contact"
                py={2}
                pl={3}
                pr={4}
                color="gray.900"
                rounded="lg"
                _hover={{ bg: 'gray.100' }}
                bg={{ md: 'transparent' }}
                // color={{ md: 'blue.700' }}
                p={{ md: 0 }}
                _dark={{
                  color: 'white',
                  bg: 'gray.700',
                  borderColor: 'gray.700',
                }}
              >
                Contact
              </Link>
              <Link
                // as={ReactRouterLink}
                color="white"
                bg="blue.700"
                _hover={{ bg: 'blue.800' }}
                _focus={{ ring: 4, outline: 'none', ringColor: 'blue.300' }}
                fontWeight="medium"
                rounded="lg"
                fontSize="sm"
                px={4}
                py={2}
                textTransform="capitalize"
                href={!isAuthenticated() ? '/signin' : '/dashboard'}
                _dark={{
                  bg: 'blue.600',
                  _hover: { bg: 'blue.700' },
                  _focus: { ringColor: 'blue.800' },
                }}
              >
                {!isAuthenticated() ? 'Get started' : 'Dashboard'}
              </Link>
            </HStack>
          </Box>
        </Flex>
      </Box>
      <Drawer placement="right" isOpen={isOpen} onClose={onToggle} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4}>
              <Link
                // as={ReactRouterLink}
                color="white"
                bg="blue.700"
                _hover={{ bg: 'blue.800' }}
                _focus={{ ring: 4, outline: 'none', ringColor: 'blue.300' }}
                fontWeight="medium"
                rounded="lg"
                fontSize="sm"
                px={4}
                py={2}
                textTransform="capitalize"
                href={!isAuthenticated() ? '/signin' : '/dashboard'}
                _dark={{
                  bg: 'blue.600',
                  _hover: { bg: 'blue.700' },
                  _focus: { ringColor: 'blue.800' },
                }}
              >
                {!isAuthenticated() ? 'Get started' : 'Dashboard'}
              </Link>
              <Link href="/" fontSize="lg">
                Home
              </Link>
              <Link href="/about" fontSize="lg">
                About
              </Link>
              <Link href="/services" fontSize="lg">
                Services
              </Link>
              <Link href="/contact" fontSize="lg">
                Contact
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
