/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import { FaEllipsis, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Album, Photo } from '../../utils/interfaces';
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
  const { user } = isAuthenticated();

  const hide = () => setLoader(false);
  useTimeout(hide, 3000);

  useEffect(() => {
    if (isAuthenticated()) {
      // eslint-disable-next-line no-underscore-dangle
      listAlbums(user._id).then((data) => {
        if (data.error) {
          // eslint-disable-next-line no-console
          console.log(data.error);
        } else {
          setAlbums(data);
        }
      });
    }
    // eslint-disable-next-line no-underscore-dangle
  }, [user._id]);

  // eslint-disable-next-line no-console
  if (loader) {
    return <LoaderComponent />;
  }
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

interface CollectionsProps {
  albums: Album[];
}

function Collections({ albums }: CollectionsProps) {
  const albumComponents = albums.map((album: Album) => (
    // eslint-disable-next-line no-underscore-dangle
    <AlbumComponent key={album._id} album={album} />
  ));
  return (
    <SimpleGrid
      minChildWidth={{ base: '120px', md: '150px', lg: '200px' }}
      spacing={4}
      px={{ base: 0, lg: 16 }}
    >
      {albumComponents}
    </SimpleGrid>
  );
}
interface AlbumProps {
  album: Album;
}

function AlbumComponent({ album }: AlbumProps) {
  const [cover, setCover] = useState<Photo>();
  const [loader, setLoader] = useState(true);
  const hide = () => setLoader(false);
  useTimeout(hide, 2000);

  useEffect(() => {
    if (album && album.photos && album?.photos?.length > 0) {
      setCover(album?.photos[0]);
    }
  }, [album, album?.photos]);

  if (loader) {
    return <LoaderComponent />;
  }
  const datePublished = album?.created_at
    ? new Date(album.created_at).toLocaleDateString()
    : '';

  return (
    <Box minH={{ base: '300px', md: '500px' }} borderRadius={16} boxShadow="sm">
      <VStack>
        <Box>
          <Image
            objectFit="cover"
            w="100%"
            minH={{ base: '220px', md: '300px' }}
            alt={cover?.name}
            src={cover?.imageUrl}
            borderRadius="lg"
            boxShadow="md"
          />
        </Box>
        <Flex justify="space-between" width="100%" align="center" gap={3}>
          <Text
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            width="100%"
            fontSize="0.8rem"
          >
            {album.name}
          </Text>
          <Icon as={FaEllipsis} />
        </Flex>
        <Flex
          fontSize="0.8rem"
          justify="space-between"
          width="100%"
          align="center"
          gap={2}
        >
          <Text>{datePublished}</Text>
          <Text>Published</Text>
        </Flex>
      </VStack>
    </Box>
  );
}

export default Dashboard;
