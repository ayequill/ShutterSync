/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';

import { listAlbums } from '../albums/api-albums';
import { isAuthenticated } from '../auth/auth-helper';
import { useAlbums } from '../contexts/albumContext';
import { useUser } from '../contexts/userContext';
import LoaderComponent from '../core/Loader';

const Collections = lazy(() => import('../albums/Albums'));
function Dashboard() {
  const { albums, setAlbums } = useAlbums();
  const { user, setUser } = useUser();
  const [loader, setLoader] = useState<boolean>(true);
  const navigate = useNavigate();

  const userID = isAuthenticated()?.user._id;

  const fetchAlbums = useCallback(
    async (id: string | undefined) => {
      setLoader(true);
      try {
        if (user) {
          const userId = userID || user._id;
          await listAlbums(userId).then((data) => {
            if (data.error) {
              // eslint-disable-next-line no-console
              console.log(data.error);
              setLoader(false);
            } else {
              setAlbums(data);
            }
          });
        }
      } finally {
        setLoader(false);
      }
    },
    [user._id]
  );

  useEffect(() => {
    fetchAlbums(user._id);
  }, [fetchAlbums, user._id]);

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
            fontSize="sm"
            fontWeight="bold"
            onClick={() => navigate('upload')}
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
          <Collections />
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
