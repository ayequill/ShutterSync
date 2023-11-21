/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { FaEllipsis } from 'react-icons/fa6';

import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Album, Photo } from '../../utils/interfaces';

interface CollectionsProps {
  albums: Album[];
}

export default function Collections({ albums }: CollectionsProps) {
  const albumComponents = albums.map((album: Album) => (
    // eslint-disable-next-line no-underscore-dangle
    <AlbumComponent key={album._id} album={album} />
  ));
  return (
    <SimpleGrid
      minChildWidth={{ base: '180px', md: '260px', lg: '260px' }}
      spacing={{ base: 6, lg: 10 }}
      px={{ base: 0, lg: 16 }}
      py={4}
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

  useEffect(() => {
    if (album && album.photos && album?.photos?.length > 0) {
      setCover(album?.photos[0]);
    }
  }, [album, album?.photos]);

  const datePublished = album?.created_at
    ? new Date(album.created_at).toLocaleDateString()
    : '';
  const photos = album?.photos ? album.photos : [];

  return (
    <Flex
      boxShadow="sm"
      minH={{ base: '200px', md: '500px' }}
      h="100%"
      borderRadius={10}
      border="1.5px solid #e2e8f0"
      _dark={{ border: '1.5px solid #1a202b' }}
    >
      <VStack align="center" justify="space-around">
        <SimpleGrid gridTemplateColumns="1fr .5fr" gap={1} h="100%">
          <Box>
            <Image
              objectFit="cover"
              w="100%"
              h="100%"
              alt={cover?.name}
              src={cover?.imageUrl}
              borderRadius="10px 0 0 0px"
              _hover={{ boxShadow: 'xl', transform: 'scale(1.03)' }}
              cursor={photos.length > 0 ? 'pointer' : 'default'}
              transition="transform 0.3s ease-in-out"
              className="animate__animated animate__pulse"
            />
          </Box>

          {photos.length > 0 && (
            <Flex flexDir="column" gap={1}>
              <Image
                w="100%"
                h="100%"
                src={photos[0].imageUrl}
                alt={photos[0].name}
                key={photos[0]._id}
                objectFit="cover"
                boxShadow="md"
                flexBasis="50%"
                borderRadius="0 10px 0 0px"
                _hover={{ boxShadow: 'xl', transform: 'scale(1.03)' }}
                cursor={photos.length > 0 ? 'pointer' : 'default'}
                transition="transform 0.3s ease-in-out"
              />
              <Image
                w="100%"
                h="100%"
                src={photos[1]?.imageUrl}
                alt={photos[1]?.name}
                // eslint-disable-next-line no-underscore-dangle
                key={photos[1]?._id}
                objectFit="cover"
                flexBasis="50%"
                boxShadow="md"
                _hover={{ boxShadow: 'xl', transform: 'scale(1.03)' }}
                cursor={photos.length > 0 ? 'pointer' : 'default'}
                transition="transform 0.3s ease-in-out"
              />
            </Flex>
          )}
        </SimpleGrid>
        <Flex
          justify="space-between"
          width="100%"
          align="center"
          gap={3}
          px={1.5}
        >
          <Text
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            width="100%"
            fontSize={{ base: '0.8rem', md: '1rem' }}
          >
            {album.name}
          </Text>
          <AlbumOptions />
        </Flex>
        <Flex
          fontSize="0.8rem"
          justify="space-between"
          width="100%"
          align="center"
          gap={2}
          px={1.5}
        >
          <Text>{datePublished}</Text>
          <Text color="blue.500">Published</Text>
        </Flex>
        <Flex width="100%" px={1.5}>
          <Text fontSize="sm">{album.photos?.length} photos</Text>
        </Flex>
        <Divider color="white" />
      </VStack>
    </Flex>
  );
}

function AlbumOptions() {
  return (
    <Menu>
      <MenuButton as={Button} bg="none">
        <FaEllipsis />
      </MenuButton>
      <MenuList>
        <MenuItem>Share Album</MenuItem>
        <MenuItem>Edit Album</MenuItem>
        <MenuItem>Delete Album</MenuItem>
      </MenuList>
    </Menu>
  );
}
