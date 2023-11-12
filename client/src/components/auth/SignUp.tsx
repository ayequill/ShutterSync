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

import { create } from '../user/api-user';

function SignUp(): JSX.Element {
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    error: '',
    open: false,
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
    const { name, email, password } = values;
    const doThrowError = (email && password && name) === '';
    if (doThrowError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    if (!doThrowError) {
      create({
        name,
        email,
        password,
      }).then((data) => {
        if (data.error) {
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
          <Box width="100%" textAlign="center">
            <Heading as="h2" size="lg">
              Welcome!
            </Heading>
            <Text fontSize="0.8rem">
              Join Photo Buddy and create your account.
            </Text>
          </Box>
          <VStack mt={4}>
            <InputGroup flexDirection="column" gap="0.5rem">
              <FormControl isInvalid={isError} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={values.name}
                  onChange={handleInputChange('name')}
                />
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  value={values.email}
                  onChange={handleInputChange('email')}
                />
                <FormHelperText>
                  We&apos;ll never share your email.
                </FormHelperText>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleInputChange('password')}
                />
                <FormHelperText>
                  We&apos;ll never share your password.
                </FormHelperText>
              </FormControl>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Sign Up
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
