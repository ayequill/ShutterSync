/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

import { isAuthenticated } from '../auth/auth-helper';
import { useUser } from '../contexts/userContext';
import LoaderComponent from '../core/Loader';
import useTimeout from '../hooks/useTimeOut';
import { addPhotos } from '../user/api-photos';

import { createAlbum } from './api-albums';

function Upload() {
  const [albumName, setAlbumName] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const userID = isAuthenticated()?.user?._id || user._id;

  const hide = () => setLoader(false);
  useTimeout(hide, 1000);

  const handleAlbumNameChange = (e: any) => {
    setAlbumName(e.target.value);
  };

  const handlePhotoChange = (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    setSelectedPhotos(files);
  };

  const handleSubmit = () => {
    if (albumName === '' || albumName === undefined) {
      setError('Please enter a valid album name');
      return;
    }
    setAlbumName(albumName.trim());

    if (selectedPhotos.length === 0) {
      setError('Please select at least one photo');
      return;
    }
    setIsLoading(true);
    // eslint-disable-next-line no-underscore-dangle
    createAlbum({ name: albumName }, userID).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // eslint-disable-next-line no-underscore-dangle
        addPhotos(data._id, userID, selectedPhotos).then((photos) => {
          console.log(photos);
          setIsLoading(false);
          navigate(`/dashboard/album/${data._id}`);
        });
      }
    });
  };
  if (loader) {
    return <LoaderComponent />;
  }

  return (
    <VStack py={10} align="center" px={30} spacing={5} justify="center">
      <Text textAlign="center" fontSize="xl" color="blue.500">
        Add new album
      </Text>
      <FormControl display="flex" justifyContent="center" alignItems="center">
        <FormLabel display={{ base: 'none', lg: 'block' }}>
          Album Name
        </FormLabel>
        <Input
          placeholder="Album Name"
          type="text"
          borderRadius="md"
          value={albumName}
          onChange={handleAlbumNameChange}
          maxW="xl"
        />
      </FormControl>

      <Text textAlign="center" fontSize="xl" color="blue.500">
        Add new photos
      </Text>

      <Container maxW="xl" centerContent>
        <Box
          borderWidth="2px"
          borderRadius="lg"
          p="6"
          borderColor="blue.500"
          textAlign="center"
        >
          <FormControl>
            <FormLabel>Select Photos</FormLabel>
            <Input
              type="file"
              accept=".jpg, .jpeg, .png, .webp"
              multiple
              onChange={handlePhotoChange}
            />
            <Text fontSize="sm" mt={2} color="gray.500">
              Select one or more photos (JPEG, JPG, PNG)
            </Text>
            {error && <Text color="red">{error}</Text>}
          </FormControl>
        </Box>
      </Container>

      <Button
        colorScheme="blue"
        mt={4}
        onClick={handleSubmit}
        isDisabled={isLoading}
      >
        {isLoading ? <Spinner /> : 'Upload Photos'}
      </Button>
      <Button
        variant="outline"
        colorScheme="blue"
        isDisabled={isLoading}
        onClick={() => navigate('/dashboard')}
      >
        Cancel
      </Button>
    </VStack>
  );
}

export default Upload;
