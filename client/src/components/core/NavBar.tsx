import React from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { clearJWT, isAuthenticated } from '../auth/auth-helper';
import ThemeToggleButton from '../ThemeToggleButton';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    clearJWT(() => navigate('/signin', { replace: true }));
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
        <Box display={{ base: 'inline-flex', md: 'none' }} gap={3}>
          {/* <IconButton
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
            </IconButton> */}
        </Box>
        <Box
          display={{ base: 'flex', md: 'flex' }}
          justifyContent="end"
          w="full"
          id="navbar-sticky"
        >
          <MobileDrawer logout={handleLogout} />
          <HStack
            gap={2}
            fontSize="md"
            alignItems="center"
            justifyContent="center"
            display={{ base: 'none', md: 'flex' }}
          >
            <Link
              as={ReactRouterLink}
              to={!isAuthenticated() ? '/signin' : '/dashboard'}
            >
              {!isAuthenticated() ? 'Login' : 'Home'}
            </Link>
            {!isAuthenticated() ? (
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
            ) : (
              <ProfileMenu logout={handleLogout} />
            )}
            <ThemeToggleButton />
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}

interface ProfileMenuProps {
  logout: () => void;
}

function ProfileMenu({ logout }: ProfileMenuProps) {
  return (
    <Menu>
      <MenuButton as={Button} colorScheme="blue" size="sm">
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <MenuItem>Account</MenuItem>
          <MenuItem>Payments </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

function MobileDrawer({ logout }: ProfileMenuProps) {
  return (
    <Box display={{ base: 'flex', md: 'none' }} gap={3}>
      <Menu>
        <MenuButton as={Button} colorScheme="blue">
          <HamburgerIcon />
        </MenuButton>
        <MenuList>
          <MenuGroup>
            <MenuItem>
              <Link
                as={ReactRouterLink}
                to={!isAuthenticated() ? '/signin' : '/dashboard'}
                w="100%"
                onClick={isAuthenticated() ? logout : () => null}
              >
                {isAuthenticated() ? 'Logout' : 'SignIn'}
              </Link>{' '}
            </MenuItem>
            <MenuItem>
              <Link
                as={ReactRouterLink}
                to={isAuthenticated() ? '/profile' : '/signup'}
              >
                {isAuthenticated() ? 'Profile' : 'Sign Up'}
              </Link>{' '}
            </MenuItem>
            <MenuItem>
              <Link as={ReactRouterLink} to="/pricing">
                {isAuthenticated() ? 'Payments' : 'Pricing'}
              </Link>{' '}
            </MenuItem>
          </MenuGroup>
          {/* <MenuDivider /> */}
          {/* <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup> */}
        </MenuList>
      </Menu>
      <ThemeToggleButton />
    </Box>
  );
}

export default Navbar;
