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
  InputRightElement,
  Link,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

import { create } from '../user/api-user';

import { isAuthenticated } from './auth-helper';

function SignUp(): JSX.Element {
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    error: '',
    open: false,
  });
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [name]: event.target.value,
      });
    };

  const handleSubmit = () => {
    const { name, email, password } = values;
    const doThrowError = (email && password && name) === '';
    if (doThrowError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    if (!doThrowError) {
      setIsLoading(true);
      create({
        name,
        email,
        password,
      }).then((data) => {
        if (data.error) {
          setIsLoading(false);
          setValues({
            ...values,
            error: data.error,
          });
        } else {
          setValues({
            ...values,
            error: '',
            open: true,
          });
        }
      });
    }
  };
  if (values.open) {
    return <Navigate to="/signin" replace />;
  }
  if (isAuthenticated()) {
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
            Photo Buddy
          </Heading>
          <Text>Your digital photos companion</Text>
        </VStack>
        <VStack
          align="center"
          justify="center"
          width="100%"
          className="animate__animated animate__fadeInUp"
        >
          <Box width="100%" textAlign="center">
            <Heading as="h2" size="lg">
              Welcome!
            </Heading>
            <Text fontSize="0.8rem">Join ShutterSync.</Text>
          </Box>
          <VStack>
            <InputGroup flexDirection="column" gap="0.5rem">
              <FormControl isInvalid={isError} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={values.name}
                  onChange={handleInputChange('name')}
                  id="name"
                  placeholder="Enter name"
                />
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  value={values.email}
                  placeholder="Enter email"
                  onChange={handleInputChange('email')}
                />
                <FormHelperText>
                  We&apos;ll never share your email.
                </FormHelperText>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
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
                {isLoading ? <Spinner /> : 'Sign Up'}
              </Button>
              <Text>
                Already have an account?{' '}
                <Link
                  as={ReactRouterLink}
                  color="blue.500"
                  fontWeight="bold"
                  to="/signin"
                >
                  Log in
                </Link>
              </Text>
            </InputGroup>
          </VStack>
        </VStack>
      </Grid>
    </Flex>
  );
}

export default SignUp;
