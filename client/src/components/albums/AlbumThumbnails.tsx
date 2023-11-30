/* eslint-disable no-underscore-dangle */
import { motion } from 'framer-motion';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Divider, Flex, Image, Spinner, Text, VStack } from '@chakra-ui/react';

import { Album, Photo } from '../../utils/interfaces';
import { isAuthenticated } from '../auth/auth-helper';
import { useAlbum } from '../contexts/albumContext';
import { useUser } from '../contexts/userContext';

const AlbumOptions = lazy(() => import('./AlbumOptions'));

interface AlbumProps {
  album: Album;
}

const AlbumThumbnails = memo(({ album }: AlbumProps) => {
  const [cover, setCover] = useState<Photo>();
  const { setAlbum } = useAlbum();
  const { setUser } = useUser();
  const navigate = useNavigate();

  /* Method to view an album */
  const handleAlbumClick = () => {
    setAlbum(album);
    navigate(`/dashboard/album/${album?._id}`);
  };

  /* Setting album cover by using the first pic. Will update later */
  useEffect(() => {
    if (album && album.photos && album?.photos?.length > 0) {
      setCover(album?.photos[0]);
    }
    if (isAuthenticated()) setUser(isAuthenticated()?.user);
  }, [album, album.photos, setUser]);

  const datePublished = album?.createdAt
    ? new Date(album.createdAt).toLocaleDateString()
    : '';
  const photos = album?.photos ? album.photos : [];

  return (
    <Flex
      justify="center"
      align="center"
      maxW={400}
      flex={{ base: '1 0 100%', md: '1 0 40%', lg: '1 0 25.33%' }}
      h="100%"
      w="100%"
    >
      <motion.div
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Flex
          boxShadow="sm"
          // minH={{ base: '200px', md: '500px' }}
          borderRadius={10}
          border="1.5px solid #e2e8f0"
          _dark={{ border: '1.5px solid #1a202b' }}
        >
          <VStack align="center" justify="space-around" width="100%">
            <Flex
              boxSize={{ base: '310px', md: '350px' }}
              borderRadius="10px 0 0 0px"
              cursor="pointer"
              transition="transform 0.3s ease-in-out"
              _hover={{ boxShadow: 'xl', transform: 'scale(1.03)' }}
              onClick={handleAlbumClick}
            >
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
                borderRadius="10px 10px 0 0px"
                _hover={{
                  boxShadow: 'xl',
                  transform: 'scale(1.03)',
                  borderRadius: '10px',
                }}
                cursor={photos.length > 0 ? 'pointer' : 'default'}
                transition="transform 0.3s ease-in-out"
                fallbackSrc="https://placehold.co/600x400?text=No+Image"
              />
            </Flex>
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
                fontWeight="bold"
              >
                {album.name}
              </Text>
              <Suspense fallback={<Spinner />}>
                <AlbumOptions
                  handleClick={handleAlbumClick}
                  albumId={album?._id}
                  albumName={album?.name}
                />
              </Suspense>
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
    </Flex>
  );
});

export default AlbumThumbnails;
