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
  Text,
  VStack,
} from '@chakra-ui/react';

import { isAuthenticated } from '../auth/auth-helper';
import ThemeToggleButton from '../ThemeToggleButton';

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
        boxShadow="sm"
        // position="fixed"
        w="100%"
        zIndex={20}
        top={0}
        left={0}
        as="header"
      >
        <Flex
          maxW="screen-xl"
          mx="auto"
          py={2}
          px={{ base: 4, md: 8 }}
          align="center"
          justify="space-between"
        >
          <Link href="/" display="flex" fontWeight="bold">
            Shutter<Text color="#0078D4">Sync</Text>
          </Link>
          <Box display={{ base: 'inline-flex', md: 'none' }}>
            <IconButton
              type="button"
              aria-label="Open main menu"
              p={2}
              w={10}
              h={10}
              fontSize="sm"
              rounded="lg"
              mr={2}
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
            <ThemeToggleButton />
          </Box>
          <Box
            display={{ base: 'none', md: 'flex' }}
            justifyContent="end"
            w="full"
            id="navbar-sticky"
          >
            <HStack
              gap={4}
              fontSize="md"
              alignItems="center"
              justifyContent="center"
            >
              <Link href="/signin">
                {!isAuthenticated() ? 'Login' : 'Home'}
              </Link>
              <Box
                bgColor="black"
                color="white"
                px="1rem"
                py="0.3rem"
                fontSize="sm"
                borderRadius={20}
              >
                <Link href="/signup">
                  {!isAuthenticated() ? 'SignUp' : 'Profile'}
                </Link>
              </Box>
              <ThemeToggleButton />
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
              <Link mt={15} href="/signin">
                Login
              </Link>
              <Box
                bgColor="blackAlpha.900"
                color="white"
                px="1rem"
                py="0.3rem"
                fontSize="sm"
                borderRadius={20}
              >
                <Link href="/signup">SignUp</Link>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
