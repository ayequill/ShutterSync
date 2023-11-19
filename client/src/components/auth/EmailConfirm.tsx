import React, { useEffect } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import LoaderComponent from '../core/Loader';
import useTimeout from '../hooks/useTimeOut';

import { checkEmail } from './api-auth';

export default function EmailConfirm() {
  const [loader, setLoader] = React.useState(true);
  const [values, setValues] = React.useState({
    confirmed: '',
    error: '',
  });
  const token = window.location.pathname.split('/')[2];
  const hide = () => setLoader(false);
  useTimeout(hide, 3000);

  useEffect(() => {
    checkEmail(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, confirmed: data.message });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return <LoaderComponent />;
  }
  return (
    <Flex
      width="100%"
      height="600px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="10px"
      flexDir="column"
    >
      <Box>
        {values.confirmed ? (
          <Text textAlign="center">
            You&apos;ve successfully confirmed your email.
            <br /> You can login in now.
          </Text>
        ) : (
          <Text textAlign="center"> {values.error} </Text>
        )}
      </Box>
    </Flex>
  );
}
