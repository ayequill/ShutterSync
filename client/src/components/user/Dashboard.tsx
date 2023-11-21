/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';

import Collections from '../albums/Albums';
import { listAlbums } from '../albums/api-albums';
import { isAuthenticated } from '../auth/auth-helper';
import LoaderComponent from '../core/Loader';
import useTimeout from '../hooks/useTimeOut';

function Dashboard() {
  const [timer, setTimer] = useState(3000);
  const [albums, setAlbums] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const { user } = isAuthenticated();

  const hide = () => setLoader(false);
  useTimeout(hide, timer);

  useEffect(() => {
    if (isAuthenticated()) {
      // eslint-disable-next-line no-underscore-dangle
      listAlbums(user._id)
        .then((data) => {
          if (data.error) {
            // eslint-disable-next-line no-console
            console.log(data.error);
          } else {
            setAlbums(data);
          }
        })
        .then((_) => setTimer(1000));
    }
    // eslint-disable-next-line no-underscore-dangle
  }, [user._id]);

  // eslint-disable-next-line no-console
  if (loader) {
    return <LoaderComponent />;
  }
  return (
    <Container maxW="1980px">
      <Flex
        justify="space-between"
        w="100%"
        // px={{ base: 2, lg: 15 }}
        py={{ base: 5, lg: 30 }}
        flexDir={{ base: 'column', md: 'row' }}
        align="center"
        gap={2}
      >
        <Box>{/* <Text>Collections</Text> */}</Box>
        <Box>
          <Button
            colorScheme="white"
            rightIcon={<FaPlus />}
            rounded={30}
            fontSize="0.8rem"
            onClick={() => navigate('/upload')}
            variant="outline"
          >
            Create New Collection
          </Button>
        </Box>
      </Flex>
      {albums.length === 0 ? (
        <EmptyCollections />
      ) : (
        <Collections albums={albums} />
      )}
    </Container>
  );
}

function EmptyCollections() {
  return (
    <Box py={40} textAlign="center">
      <Text>Nothing here. Please add a new collection</Text>
    </Box>
  );
}

export default Dashboard;
