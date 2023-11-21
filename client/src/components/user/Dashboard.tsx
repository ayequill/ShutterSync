/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { lazy, Suspense, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';

import { Album } from '../../utils/interfaces';
import { listAlbums } from '../albums/api-albums';
import { isAuthenticated } from '../auth/auth-helper';
import LoaderComponent from '../core/Loader';

const Collections = lazy(() => import('../albums/Albums'));
function Dashboard() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user } = isAuthenticated();

  const fetchAlbums = async (id: string) => {
    setLoader(true);
    if (isAuthenticated()) {
      await listAlbums(user._id)
        .then((data) => {
          if (data.error) {
            // eslint-disable-next-line no-console
            console.log(data.error);
            setLoader(false);
          } else {
            setAlbums(data);
          }
        })
        .then((_) => {
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    fetchAlbums(user._id);
  }, []);

  if (loader) return <LoaderComponent />;

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
      {albums?.length === 0 ? (
        <EmptyCollections />
      ) : (
        <Suspense fallback={<LoaderComponent />}>
          <Collections albums={albums} />
        </Suspense>
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
