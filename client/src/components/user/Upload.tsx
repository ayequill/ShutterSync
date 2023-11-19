/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState } from 'react';

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

import LoaderComponent from '../core/Loader';
import useTimeout from '../hooks/useTimeOut';

import { createAlbum } from './api-albums';
import { addPhotos } from './api-photos';

function Upload() {
  const [albumName, setAlbumName] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [addedPhotos, setAddedPhotos] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const hide = () => setLoader(false);
  useTimeout(hide, 2000);

  const handleAlbumNameChange = (e: any) => {
    setAlbumName(e.target.value);
  };

  const handlePhotoChange = (e: any) => {
    // Assuming you want to get an array of selected files
    const files = Array.from(e.target.files || []) as File[];
    setSelectedPhotos(files);
  };

  const handleSubmit = () => {
    if (albumName === '') {
      setError('Please enter a valid album name');
      return;
    }
    if (selectedPhotos.length === 0) {
      setError('Please select at least one photo');
      return;
    }
    setIsLoading(true);
    createAlbum({ name: albumName }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // eslint-disable-next-line no-underscore-dangle
        addPhotos(data._id, selectedPhotos).then((photos) => {
          setAddedPhotos(photos);
          setIsLoading(false);
        });
      }
    });
  };
  console.log(addedPhotos);
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
              accept=".jpg, .jpeg, .png"
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
    </VStack>
  );
}

export default Upload;
