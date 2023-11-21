import React from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { clearJWT, isAuthenticated } from '../auth/auth-helper';

import ThemeToggleButton from './ThemeToggleButton';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    clearJWT(() => navigate('/', { replace: true }));
  };

  return (
    <Box
      bg="white"
      _dark={{ bg: 'gray.900', borderColor: 'gray.600' }}
      boxShadow="sm"
      w="100%"
      top={0}
      as="header"
      className="animate__animated animate__fadeInDown"
    >
      <Flex
        maxW="screen-xl"
        mx="auto"
        py={2}
        px={{ base: 4, md: 8 }}
        align="center"
        justify="space-between"
      >
        <Link as={ReactRouterLink} to="/" display="flex" fontWeight="bold">
          Shutter<Text color="#0078D4">Sync</Text>
        </Link>
        <Flex justifyContent="end" w="full" id="navbar-sticky">
          <HStack
            gap={2}
            fontSize="md"
            alignItems="center"
            justifyContent="center"
            display={{ base: 'none', lg: 'flex' }}
          >
            {!isAuthenticated() ? (
              <Flex gap={4} align="center">
                <Link as={ReactRouterLink} to="/signin">
                  SignIn
                </Link>
                <Box
                  bgColor="black"
                  _dark={{ bg: '#0078D4' }}
                  color="white"
                  px="1rem"
                  py="0.3rem"
                  fontSize="sm"
                  borderRadius={20}
                >
                  <Link as={ReactRouterLink} to="/signup">
                    SignUp
                  </Link>
                </Box>
                <ThemeToggleButton />
              </Flex>
            ) : (
              <HStack>
                <Button
                  variant="outline"
                  size="sm"
                  rounded="30px"
                  // colorScheme="blue"
                >
                  <Link as={ReactRouterLink} to="/profile">
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  rounded="30px"
                  // colorScheme="blue"
                >
                  <Link as={ReactRouterLink} to="/account">
                    Account
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  rounded="30px"
                  colorScheme="red"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <ThemeToggleButton />
              </HStack>
            )}
          </HStack>
          <MobileDrawer logout={handleLogout} />
        </Flex>
      </Flex>
    </Box>
  );
}

interface ProfileMenuProps {
  logout: () => void;
}

function MobileDrawer({ logout }: ProfileMenuProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (cb: () => void) => {
    cb();
    onClose();
  };

  return (
    <Box display={{ base: 'flex', lg: 'none' }} gap={3}>
      <Button
        fontSize="1.5rem"
        colorScheme="white"
        onClick={onOpen}
        variant="unstyled"
      >
        <HamburgerIcon />
      </Button>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex>
              {isAuthenticated() && (
                <Avatar
                  src={isAuthenticated() ? isAuthenticated().user?.name : null}
                />
              )}
              <Flex ml="3" align="center">
                {isAuthenticated() && (
                  <Text fontWeight="bold">
                    {isAuthenticated() ? isAuthenticated().user?.name : null}
                    <Badge ml="1" colorScheme="blue">
                      Pro
                    </Badge>
                  </Text>
                )}
              </Flex>
            </Flex>
          </DrawerHeader>
          <DrawerBody display="flex" flexDir="column" gap={3}>
            <Button colorScheme="blue" rounded={30} onClick={onClose}>
              <Link
                as={ReactRouterLink}
                w="100%"
                to={!isAuthenticated() ? '/signin' : '/dashboard'}
              >
                {isAuthenticated() ? 'Dashboard' : 'Login'}
              </Link>
            </Button>

            <Button colorScheme="blue" rounded={30} onClick={onClose}>
              <Link
                w="100%"
                as={ReactRouterLink}
                to={!isAuthenticated() ? '/signup' : '/account'}
              >
                {isAuthenticated() ? 'Account' : 'Signup'}
              </Link>
            </Button>
            {isAuthenticated() && (
              <Button
                colorScheme="red"
                rounded={30}
                onClick={() => handleClick(logout)}
              >
                Logout
              </Button>
            )}
          </DrawerBody>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
      <ThemeToggleButton />
    </Box>
  );
}

export default Navbar;
