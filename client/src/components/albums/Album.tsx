/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Flex, Image } from '@chakra-ui/react';

import { Photo } from '../../utils/interfaces';
import { isAuthenticated } from '../auth/auth-helper';
import { useAlbum } from '../contexts/albumContext';
import LoaderComponent from '../core/Loader';

import { getAlbum } from './api-albums';

export default function Album() {
  const { album, setAlbum } = useAlbum();
  const { albumId } = useParams<string>();
  const { user } = isAuthenticated();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchAlbum = useCallback(async (id: string | any) => {
    try {
      setIsLoading(true);
      await getAlbum(id, user._id).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setAlbum(data);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAlbum(albumId);
  }, []);

  if (isLoading) return <LoaderComponent />;

  const photos: Photo[] = album?.photos ? album.photos : [];

  return (
    <Box px={5}>
      <Button
        aria-label="Back to dashboard"
        leftIcon={<IoIosArrowBack />}
        onClick={() => navigate('/dashboard')}
        colorScheme="blue"
        size="md"
        my={5}
      >
        Dashboard
      </Button>
      <Flex gap={2} w="100%" flexWrap="wrap" justify="center" align="center">
        {photos.map((photo) => (
          <motion.div
            key={photo._id}
            whileHover={{ scale: 1.1 }}
            animate={{
              transform: ['scale(0)', 'scale(0.3)', 'scale(0.6)', 'scale(1.0)'],
              transition: {
                duration: 0.5,
                ease: 'linear',
              },
            }}
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Image
              // maxW={{ base: '100px', md: '200px', lg: '300px' }}
              boxSize={{ base: '100px', md: '200px', lg: '300px' }}
              fallbackSrc="https://placehold.co/600x400?text=No+Image"
              objectFit="cover"
              borderRadius="md"
              src={photo.imageUrl}
              alt={photo.name}
            />
          </motion.div>
        ))}
      </Flex>
    </Box>
  );
}
