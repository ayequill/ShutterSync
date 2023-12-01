import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import LoaderComponent from '../core/Loader';
import useTimeout from '../hooks/useTimeOut';

import { resetPasswordRequest } from './api-auth';

function ResetPasswordRequest(): JSX.Element {
  const [values, setValues] = React.useState({
    email: '',
    error: '',
    redirect: false,
  });
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [name]: event.target.value,
      });
    };
  const hide = () => setLoader(false);
  useTimeout(hide, 2000);

  const handleSubmit = () => {
    const { email } = values;
    const doThrowError = email === '';
    if (doThrowError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    if (!doThrowError) {
      setIsLoading(true);
      resetPasswordRequest(email).then((data) => {
        if (data.error) {
          setIsLoading(false);
          setValues({
            ...values,
            error: data.error,
          });
        } else {
          toast({
            title: 'Password reset request sent',
            description: 'Please check your email for further details',
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
              Please enter your email address to reset password
            </Text>
          </Box>
          <VStack>
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

export default ResetPasswordRequest;
