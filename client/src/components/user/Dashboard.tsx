/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

// import { isAuthenticated } from '../auth/auth-helper';

// import { createAlbum, listAlbums } from './api-albums';

function Dashboard() {
  // const [values, setValues] = useState('');
  const [albums, setAlbums] = useState([]);
  // const [UserOjb, setUserObj] = useState({
  //   userId: '',
  //   userToken: '',
  // });
  const navigate = useNavigate();

  // useEffect(() => {
  //   listAlbums().then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setAlbums((prev) =>
  //         data.filter((album: any) => {
  //           if (album.photos.length > 0) {
  //             prev.push(album);
  //           }
  //         })
  //       );
  //     }
  //   });

  //   // return () => {
  //   //   second;
  //   // };
  // }, []);

  // createAlbum({ }).then((data) => {
  //   console.log(data);
  // });
  return (
    <VStack>
      <Flex
        justify="space-between"
        w="100%"
        px={{ base: 2, lg: 15 }}
        py={{ base: 5, lg: 30 }}
        flexDir={{ base: 'column', lg: 'row' }}
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
    </VStack>
  );
}

function EmptyCollections() {
  return (
    <Box py={40}>
      <Text>Nothing here. Please add a new collection</Text>
    </Box>
  );
}

function Collections() {
  return <Box />;
}

export default Dashboard;
