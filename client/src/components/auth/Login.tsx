import React from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

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
  Link,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

import LoaderComponent from '../core/Loader';
import useTimeout from '../hooks/useTimeOut';

import { signin } from './api-auth';
import { authenticate } from './auth-helper';

function Login(): JSX.Element {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    error: '',
    redirect: false,
  });
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (values.redirect) {
      navigate('/dashboard');
    }
  }, [values.redirect, navigate]);
  const hide = () => setLoader(false);
  useTimeout(hide, 2000);

  if (loader) {
    return <LoaderComponent />;
  }
  const handleInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [name]: event.target.value,
      });
    };
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = () => {
    const { email, password } = values;
    const doThrowError = (email && password) === '';
    if (doThrowError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    if (!doThrowError) {
      setIsLoading(true);
      signin({
        email,
        password,
      }).then((data) => {
        setIsLoading(false);
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
          });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              error: '',
              redirect: true,
            });
          });
        }
      });
    }
  };

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
        <VStack
          align="center"
          justify={{ base: 'start', md: 'center' }}
          width="100%"
          py={{ base: 100, md: 0 }}
        >
          <Box width="100%">
            <Heading as="h2" size="lg" textAlign="center">
              Hello Again!
            </Heading>
            <Text fontSize="0.8rem" textAlign="center">
              Welcome Back to ShutterSync.
              <br /> Please login to your account.
            </Text>
          </Box>
          <VStack mt={4} className="animate__animated animate__fadeInUp">
            <InputGroup flexDirection="column" gap="0.5rem">
              <FormControl isInvalid={isError} isRequired>
                {/* <FormLabel>Email</FormLabel> */}
                <Input
                  type="email"
                  value={values.email}
                  id="email"
                  onChange={handleInputChange('email')}
                  placeholder="Email"
                  mb={4}
                />
                {/* <FormLabel mt={4}>Password</FormLabel> */}
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
                      size="sm"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {!values.error ? (
                  <FormHelperText>
                    We&apos;ll never share your email.
                  </FormHelperText>
                ) : (
                  <Text color="red" fontSize="1rem" mt={4}>
                    {values.error}
                  </Text>
                )}
              </FormControl>
              <Button colorScheme="blue" onClick={handleSubmit}>
                {isLoading ? <Spinner /> : 'Sign in'}
              </Button>
              <Text>
                Don&apos;t have an account?{' '}
                <Link
                  as={ReactRouterLink}
                  color="blue.500"
                  fontWeight="bold"
                  to="/signup"
                >
                  Register
                </Link>
              </Text>
              <Text>
                Forgot password?{' '}
                <Link
                  as={ReactRouterLink}
                  color="blue.500"
                  fontWeight="bold"
                  to="/reset"
                >
                  Reset
                </Link>
              </Text>
            </InputGroup>
          </VStack>
        </VStack>
      </Grid>
    </Flex>
  );
}

export default Login;
