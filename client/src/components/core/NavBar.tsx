import React from 'react';
import { useNavigate } from 'react-router-dom';

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
          {/* <MobileDrawer /> */}
          {/* <ThemeToggleButton /> */}
        </Box>
        <Box
          display={{ base: 'flex', md: 'flex' }}
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
            <Link href={!isAuthenticated() ? '/signin' : '/dashboard'}>
              {!isAuthenticated() ? 'Login' : 'Home'}
            </Link>
            {!isAuthenticated() ? (
              <Box
                bgColor="black"
                color="white"
                px="1rem"
                py="0.3rem"
                fontSize="sm"
                borderRadius={20}
              >
                <Link href="/signup">SignUp</Link>
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
      <MenuButton as={Button} colorScheme="blue">
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
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

// function MobileDrawer() {
//   return (
//     <Menu>
//       <MenuButton as={Button} colorScheme="blue">
//         <HamburgerIcon />
//       </MenuButton>
//       <MenuList>
//         <MenuGroup title="Profile">
//           <MenuItem>Sign in</MenuItem>
//           <MenuItem>Payments </MenuItem>
//           <MenuItem>Logout</MenuItem>
//         </MenuGroup>
//         <MenuDivider />
//         <MenuGroup title="Help">
//           <MenuItem>Docs</MenuItem>
//           <MenuItem>FAQ</MenuItem>
//         </MenuGroup>
//       </MenuList>
//     </Menu>
//   );
// }

export default Navbar;
