/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Flex, Text, VStack } from '@chakra-ui/react';

import { isAuthenticated } from '../auth/auth-helper';
import LoaderComponent from '../core/Loader';
import useTimeout from '../hooks/useTimeOut';

import { createAlbum, listAlbums } from './api-albums';

function Dashboard() {
  const [values, setValues] = useState('');
  const [albums, setAlbums] = useState([]);
  const [loader, setLoader] = useState(true);
  const [UserOjb, setUserObj] = useState({
    userId: '',
    userToken: '',
  });
  const navigate = useNavigate();

  const hide = () => setLoader(false);
  useTimeout(hide, 2000);

  useEffect(() => {
    listAlbums().then((data) => {
      if (data.error) {
        // eslint-disable-next-line no-console
        console.log(data.error);
      } else {
        setAlbums((_prev) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.filter((album: any) => {
            if (album.photos.length > 0) {
              return album;
            }
            return null;
          })
        );
      }
    });

    // return () => {
    //   second;
    // };
  }, []);

  // eslint-disable-next-line no-console
  console.log(albums);
  if (loader) {
    return <LoaderComponent />;
  }

  // createAlbum({}).then((data) => {
  //   console.log(data);
  // });
  return (
    <Container maxW="container.xl">
      <Flex
        justify="space-between"
        w="100%"
        // px={{ base: 2, lg: 15 }}
        py={{ base: 5, lg: 30 }}
        flexDir={{ base: 'column', md: 'row' }}
        align="center"
        gap={2}
      >
        <Box>
          <Text>Collections</Text>
        </Box>
        <Box>
          <Button
            colorScheme="blue"
            rightIcon={<FaPlus />}
            rounded={30}
            onClick={() => navigate('/upload')}
          >
            Create New Collection
          </Button>
        </Box>
      </Flex>
      {albums.length === 0 ? <EmptyCollections /> : <Collections />}
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

function Collections() {
  return <Box />;
}

export default Dashboard;
