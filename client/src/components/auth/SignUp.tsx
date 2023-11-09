import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

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

function SignUp(): JSX.Element {
  const [input, setInput] = React.useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const isError = input === '';

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
                <Input type="text" value={input} onChange={handleInputChange} />
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={input}
                  onChange={handleInputChange}
                />
                <FormHelperText>
                  We&apos;ll never share your email.
                </FormHelperText>
                <FormLabel>Password</FormLabel>
                <Input type="password" />
                <FormHelperText>
                  We&apos;ll never share your password.
                </FormHelperText>
              </FormControl>
              <Button colorScheme="blue">Sign Up</Button>
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
