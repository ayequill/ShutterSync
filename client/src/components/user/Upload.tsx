/* eslint-disable no-console */
import React, { useState } from 'react';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

function Upload() {
  const [albumName, setAlbumName] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const handlePhotoChange = (e) => {
    // Assuming you want to get an array of selected files
    const files = Array.from(e.target.files);
    setSelectedPhotos(files);
  };

  const handleSubmit = () => {
    console.log('Album Name:', albumName);
    console.log('Selected Photos:', selectedPhotos);
  };

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
          </FormControl>
        </Box>
      </Container>

      <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
        Upload Photos
      </Button>
    </VStack>
  );
}

export default Upload;
