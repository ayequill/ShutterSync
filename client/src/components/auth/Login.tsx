import React from 'react';
import { Link as ReactRouterLink, Navigate } from 'react-router-dom';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';

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
  const handleInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [name]: event.target.value,
      });
    };

  const handleSubmit = () => {
    const { email, password } = values;
    const doThrowError = (email && password) === '';
    if (doThrowError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    if (!doThrowError) {
      signin({
        email,
        password,
      }).then((data) => {
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
  if (values.redirect) {
    return <Navigate to="/dashboard" />;
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
        height="100vh"
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
            Photo Buddy
          </Heading>
          <Text>Your digital photos companion</Text>
        </VStack>
        <VStack align="center" justify="center" width="100%">
          <Box width="100%">
            <Heading as="h2" size="lg" textAlign="center">
              Hello Again!
            </Heading>
            <Text fontSize="0.8rem" textAlign="center">
              Welcome Back to Photo Buddy. Please login to your account.
            </Text>
          </Box>
          <VStack mt={4}>
            <InputGroup flexDirection="column" gap="0.5rem">
              <FormControl isInvalid={isError} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={values.email}
                  id="email"
                  onChange={handleInputChange('email')}
                />
                <FormHelperText>
                  {!values.error
                    ? "We'll never share your email."
                    : values.error}
                </FormHelperText>
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={handleInputChange('password')}
                />
              </FormControl>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Sign in
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
            </InputGroup>
          </VStack>
        </VStack>
      </Grid>
    </Flex>
  );
}

export default Login;
