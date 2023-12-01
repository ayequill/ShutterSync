/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { User } from '../../utils/interfaces';
import { resetPassword } from '../auth/api-auth';
import { isAuthenticated } from '../auth/auth-helper';
import { useUser } from '../contexts/userContext';
import LoaderComponent from '../core/Loader';

import { read, update } from './api-user';

type UserNewWithNewPassword = User & { newPassword: string };

function Profile() {
  const { user, setUser } = useUser();
  const [values, setValues] = useState<UserNewWithNewPassword>({
    name: '',
    email: '',
    password: '',
    newPassword: '',
  });
  const [component, setComponent] = useState<string>('name');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loarder, setLoader] = useState<boolean>(false);

  const userId = user?._id || isAuthenticated().user._id;
  const { token } = isAuthenticated();
  const toast = useToast();

  const fetchUser = useCallback(async () => {
    const abortController = new AbortController();
    const { signal } = abortController;
    setIsLoading(true);
    await read(userId, { t: token }, signal).then((data) => {
      setUser(data);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUser = async () => {
    if (user && component !== 'password') {
      setLoader(true);
      await update(user._id, token, {
        ...values,
        email: user.email,
        name: values.name ? values.name : user.name,
      }).then((data) => {
        if (data.error) {
          // eslint-disable-next-line no-console
          console.log(data.error);
        } else {
          console.log(data);
          toast({
            title: 'Password Updated',
            // description: 'Please login with new password. Redirecting...',
            status: 'success',
            duration: 2000,
            isClosable: true,
            onCloseComplete() {
              setUser(data);
              setLoader(false);
              window.location.reload();
            },
          });
        }
      });
    } else if (user && component === 'password') {
      setLoader(true);
      await resetPassword({
        email: user.email,
        newPassword: values.newPassword,
        password: values.password,
      }).then((data) => {
        if (data.error) {
          // eslint-disable-next-line no-console
          console.log(data.error);
        } else {
          toast({
            title: data.message,
            // description: 'Please login with new password. Redirecting...',
            status: 'success',
            duration: 2000,
            isClosable: true,
            onCloseComplete() {
              setUser(data);
              setLoader(false);
              window.location.reload();
            },
          });
          // navigate('/albums');
        }
      });
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoaderComponent />;
  }

  const returnComponentTitle = () => {
    switch (component) {
      case 'name':
        return 'Change name';
      case 'email':
        return 'Change email';
      case 'password':
        return 'Change password';
      default:
        return 'Change name';
    }
  };

  return (
    <Flex
      direction={{ base: 'column-reverse', md: 'row' }}
      align="center"
      justify="space-around"
      py={{ base: 10, md: 20, lg: 40 }}
    >
      <QuickSettings componentSetter={setComponent} setValues={setValues} />
      <Box p={8} mb={4} w="full" maxW="500px" borderRadius={8} boxShadow="lg">
        <Text fontSize="2xl" mb={4}>
          {returnComponentTitle()}
        </Text>
        <FormControl>
          {component === 'name' && (
            <Input
              placeholder={user.name}
              mb={4}
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          )}
          {component === 'email' && (
            <Input
              placeholder={user.email}
              mb={4}
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          )}
          {component === 'password' && (
            <Box>
              <Input
                placeholder="Old Password"
                type="password"
                mb={4}
                id="oldPassword"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              <Input
                placeholder="New Password"
                type="password"
                id="newPassword"
                mb={4}
                value={values.newPassword}
                onChange={(e) =>
                  setValues({ ...values, newPassword: e.target.value })
                }
              />
            </Box>
          )}
          <Button
            colorScheme="blue"
            w="100%"
            fontWeight="bold"
            onClick={handleUpdateUser}
          >
            {loarder ? <Spinner /> : 'Update'}
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
}

interface QuickSettingsProps {
  componentSetter: React.Dispatch<React.SetStateAction<string>>;
  setValues: React.Dispatch<React.SetStateAction<UserNewWithNewPassword>>;
}

function QuickSettings({ componentSetter, setValues }: QuickSettingsProps) {
  const handleComponentSetter = (component: string) => {
    componentSetter(component);
    setValues((prev) => {
      const newValues: UserNewWithNewPassword = { ...prev };
      Object.keys(prev).forEach((key) => {
        if (key !== component) {
          newValues[key as keyof UserNewWithNewPassword] = '';
        }
      });
      return newValues;
    });
  };

  return (
    <VStack
      direction="column"
      align="center"
      justify="center"
      py={{ base: 10, md: 20, lg: 40 }}
      gap={10}
    >
      <Box
        cursor="pointer"
        _hover={{ transform: 'scale(1.2)', fontWeight: 'bold' }}
        onClick={() => handleComponentSetter('name')}
      >
        <Text fontSize="lg" color="blue.500">
          Change name
        </Text>
      </Box>
      <Box
        cursor="pointer"
        _hover={{ transform: 'scale(1.2)', fontWeight: 'bold' }}
        onClick={() => handleComponentSetter('email')}
      >
        <Text fontSize="lg" color="blue.500">
          Update email
        </Text>
      </Box>
      <Box
        cursor="pointer"
        _hover={{ transform: 'scale(1.2)', fontWeight: 'bold' }}
        onClick={() => handleComponentSetter('password')}
      >
        <Text fontSize="lg" color="blue.500">
          Change password
        </Text>
      </Box>
    </VStack>
  );
}

export default Profile;
