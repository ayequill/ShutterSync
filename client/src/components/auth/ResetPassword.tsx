/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import LoaderComponent from '../core/Loader';
import useTimeout from '../hooks/useTimeOut';

import { checkEmail, resetPassword } from './api-auth';

function ResetPassword(): JSX.Element {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    newPassword: '',
    error: '',
    redirect: false,
  });
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    document.title = 'Reset Password | ShutterSync';
  }, []);

  const handleInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [name]: event.target.value,
      });
    };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const hide = () => setLoader(false);
  useTimeout(hide, 1500);

  const handleSubmit = () => {
    const { password, newPassword } = values;
    const doThrowError = (password && newPassword) === '';
    if (doThrowError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    if (password !== newPassword) {
      setIsError(true);
      setValues({
        ...values,
        error: 'Passwords do not match',
      });
      return;
    }
    if (!doThrowError) {
      setIsLoading(true);
      resetPassword({
        email: values.email,
        password: values.password,
        newPassword: values.newPassword,
      }).then((data) => {
        if (data.error) {
          setIsLoading(false);
          setValues({
            ...values,
            error: data.error,
          });
        } else {
          toast({
            title: 'Password Updated',
            description: 'Please login with new password. Redirecting...',
            status: 'success',
            duration: 2000,
            isClosable: true,
            onCloseComplete() {
              setIsLoading(false);
              navigate('/signin');
            },
          });
        }
      });
    }
  };

  const emailChecker = (t: string | undefined) => {
    checkEmail(t).then((data) => {
      if (data.error) {
        console.log(data);
      }
      if (data.user) {
        setValues({
          ...values,
          email: data.user.email,
        });
      }
    });
  };

  React.useEffect(() => {
    emailChecker(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return <LoaderComponent />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <Flex as="section">
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={6}
        mx="auto"
        maxW="screen-xl"
        mt={{ base: '50px', md: '0' }}
        height={{ base: 'auto', md: '100vh' }}
        width="100%"
      >
        <VStack
          bgGradient="linear(to-l, #0575E6 0%, #02298A 84.79%, #021B79 100%)"
          width="100%"
          bgPos="center"
          bgRepeat="no-repeat"
          color="white"
          placeContent="center"
          gap={0}
          display={{ base: 'none', md: 'flex' }}
        >
          <Heading as="h1" size="xl">
            ShutterSync
          </Heading>
          <Text>Your digital photos companion</Text>
        </VStack>
        <VStack align="center" justify="center" width="100%">
          <Box width="100%">
            <Text fontSize="lg" textAlign="center">
              Please fill the form to reset password
            </Text>
          </Box>
          <VStack>
            <InputGroup flexDirection="column" gap="0.5rem">
              <FormControl isInvalid={isError} isRequired>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleInputChange('password')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="md"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup mt={4}>
                  <Input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={values.newPassword}
                    onChange={handleInputChange('newPassword')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="md"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {!values.error ? (
                  <FormHelperText>
                    {/* We&apos;ll never share your email. */}
                  </FormHelperText>
                ) : (
                  <Text color="red" fontSize="1rem" mt={4}>
                    {values.error}
                  </Text>
                )}
              </FormControl>
              <Button colorScheme="blue" onClick={handleSubmit}>
                {isLoading ? <Spinner /> : 'Reset Password'}
              </Button>
            </InputGroup>
          </VStack>
        </VStack>
      </Grid>
    </Flex>
  );
}

export default ResetPassword;
