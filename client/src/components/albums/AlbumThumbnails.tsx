/* eslint-disable no-underscore-dangle */
import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { FaEllipsis } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

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
import { useAlbum } from '../contexts/albumContext';

interface AlbumProps {
  album: Album;
}

const AlbumThumbnails = memo(({ album }: AlbumProps) => {
  const [cover, setCover] = useState<Photo>();
  const { setAlbum } = useAlbum();
  const navigate = useNavigate();
  const handleAlbumClick = () => {
    setAlbum(album);
    navigate(`/dashboard/album/${album._id}`);
  };

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
    <motion.div
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Flex
        boxShadow="sm"
        minH={{ base: '200px', md: '500px' }}
        h="100%"
        borderRadius={10}
        border="1.5px solid #e2e8f0"
        _dark={{ border: '1.5px solid #1a202b' }}
      >
        <VStack align="center" justify="space-around" width="100%">
          <SimpleGrid
            gridTemplateColumns={photos.length > 1 ? '1fr .5fr' : '1fr'}
            gap={1}
            h="100%"
          >
            <Box>
              <Image
                loading="lazy"
                objectFit="cover"
                w="100%"
                h="100%"
                alt={cover?.name}
                src={
                  cover?.imageUrl ||
                  'https://placehold.co/400x400?text=No+Image'
                }
                borderRadius="10px 0 0 0px"
                _hover={{ boxShadow: 'xl', transform: 'scale(1.03)' }}
                cursor={photos.length > 0 ? 'pointer' : 'default'}
                transition="transform 0.3s ease-in-out"
                fallbackSrc="https://placehold.co/600x400?text=No+Image"
              />
            </Box>

            {photos.length > 0 && (
              <Flex flexDir="column" gap={1} key={album?._id}>
                <Image
                  loading="lazy"
                  w="100%"
                  h="100%"
                  src={photos[0].imageUrl || cover?.imageUrl}
                  alt={photos[0].name}
                  objectFit="cover"
                  boxShadow="md"
                  flexBasis="50%"
                  borderRadius="0 10px 0 0px"
                  _hover={{ boxShadow: 'xl', transform: 'scale(1.03)' }}
                  cursor={photos.length > 0 ? 'pointer' : 'default'}
                  transition="transform 0.3s ease-in-out"
                  fallbackSrc="https://placehold.co/600x400?text=No+Image"
                />
                <Image
                  loading="lazy"
                  w="100%"
                  h="100%"
                  src={photos[1]?.imageUrl || photos[0]?.imageUrl}
                  alt={photos[1]?.name}
                  // eslint-disable-next-line no-underscore-dangle
                  objectFit="cover"
                  flexBasis="50%"
                  boxShadow="md"
                  _hover={{ boxShadow: 'xl', transform: 'scale(1.03)' }}
                  cursor={photos.length > 0 ? 'pointer' : 'default'}
                  transition="transform 0.3s ease-in-out"
                  fallbackSrc="https://placehold.co/600x400?text=No+Image"
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
            <AlbumOptions handleClick={handleAlbumClick} />
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
            <Text>Published</Text>
          </Flex>
          <Flex width="100%" px={1.5}>
            <Text fontSize="sm">{album.photos?.length} photos</Text>
          </Flex>
          <Divider color="white" />
        </VStack>
      </Flex>
    </motion.div>
  );
});

function AlbumOptions({ handleClick }: { handleClick: () => void }) {
  return (
    <Menu>
      <MenuButton as={Button} bg="none">
        <FaEllipsis />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleClick}>View Album</MenuItem>
        <MenuItem>Share Album</MenuItem>
        <MenuItem>Edit Album</MenuItem>
        <MenuItem>Delete Album</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default AlbumThumbnails;
