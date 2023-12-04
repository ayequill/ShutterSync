import { motion } from 'framer-motion';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
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
      position="relative"
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
                <Link
                  fontWeight="bold"
                  as={ReactRouterLink}
                  to="/signin"
                  _hover={{
                    textDecoration: 'none',
                    boxShadow: 'xl',
                    transform: 'scale(1.03)',
                  }}
                >
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
                  _hover={{ boxShadow: 'xl', transform: 'scale(1.03)' }}
                  cursor="pointer"
                >
                  <Link
                    _hover={{ textDecoration: 'none' }}
                    fontWeight="bold"
                    as={ReactRouterLink}
                    to="/signup"
                  >
                    Get Started
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
                  fontWeight="bold"
                >
                  <Link as={ReactRouterLink} to="/dashboard/profile">
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  rounded="30px"
                  isDisabled
                  // colorScheme="blue"
                >
                  <Link fontWeight="bold" as={ReactRouterLink} to="/dashboard">
                    Account
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  rounded="30px"
                  colorScheme="red"
                  onClick={handleLogout}
                  fontWeight="bold"
                >
                  Logout
                </Button>
                <ThemeToggleButton />
              </HStack>
            )}
          </HStack>
          {/* <MobileDrawer logout={handleLogout} /> */}
          <MobileDrawerL logout={handleLogout} />
        </Flex>
      </Flex>
    </Box>
  );
}

interface ProfileMenuProps {
  logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

function MobileDrawerL({ logout }: ProfileMenuProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const variants = {
    open: { opacity: 1, y: '-10px', type: 'spring' },
    closed: { opacity: 0, y: '10px' },
  };

  const handleClick = (cb: () => void) => {
    cb();
    onClose();
  };
  return (
    <Flex
      // width="100%"
      justifyContent="space-between"
      alignItems="center"
      display={{ lg: 'none' }}
      // p={1}
    >
      <motion.div
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          top: '50px',
          right: 10,
          zIndex: 99999999999000,
          display: isOpen ? 'block' : 'none',
        }}
      >
        <Flex
          display={{ base: 'flex', lg: 'none' }}
          gap={2}
          flexDir="column"
          mt={2}
          zIndex="9000"
        >
          <Button
            boxShadow="xl"
            colorScheme="blue"
            rounded={30}
            variant="outline"
            bg="white"
            _dark={{ bg: 'gray.900', color: 'white' }}
            onClick={onClose}
          >
            <Link
              as={ReactRouterLink}
              w="100%"
              to={!isAuthenticated() ? '/signin' : '/dashboard'}
            >
              {isAuthenticated() ? 'Dashboard' : 'Login'}
            </Link>
          </Button>

          <Button
            boxShadow="xl"
            colorScheme="blue"
            rounded={30}
            variant="outline"
            bg="white"
            _dark={{ bg: 'gray.900', color: 'white' }}
            onClick={onClose}
          >
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
              boxShadow="xl"
              colorScheme="red"
              rounded={30}
              variant="solid"
              onClick={() => handleClick(logout)}
              _dark={{ bg: 'red.500', color: 'white' }}
            >
              Logout
            </Button>
          )}
        </Flex>
      </motion.div>
      {isOpen ? (
        <FaTimes onClick={onClose} fontSize="30px" />
      ) : (
        <HamburgerIcon onClick={onOpen} fontSize="30px" />
      )}
      <ThemeToggleButton />
    </Flex>
  );
}

export default Navbar;
