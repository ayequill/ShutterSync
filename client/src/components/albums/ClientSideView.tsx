/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTimeout } from 'usehooks-ts';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';

import { Album } from '../../utils/interfaces';
import { useAlbum } from '../contexts/albumContext';
import LoaderComponent from '../core/Loader';

import { checkAlbumPassword, getSingleAlbum } from './api-albums';

function ClientView() {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [cover, setCover] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { album, setAlbum } = useAlbum();

  const albumId = searchParams.get('id') as string;

  const hide = () => setLoader(false);

  useTimeout(hide, 500);

  const photos = album?.photos?.map((photo) => (
    <Box
      cursor="pointer"
      key={photo._id}
      flexShrink={0}
      width="120px"
      height="auto"
    >
      <Image
        onClick={() => setCover(photo.imageUrl)}
        src={photo.imageUrl}
        alt={photo.name}
        loading="eager"
        w="100%"
        h="100%"
      />
    </Box>
  ));

  useEffect(() => {
    setLoader(true);
    const fetchAlbum = async () => {
      try {
        await getSingleAlbum(albumId).then((data: Album) => {
          setAlbum(data);
          if (data.photos) setCover(data.photos[0].imageUrl);
        });
      } catch (e) {
        console.log(e);
      }
    };

    if (albumId) {
      fetchAlbum();
    }
  }, [albumId, setAlbum]);

  if (loader) {
    return <LoaderComponent />;
  }

  return (
    <Flex flexDir="column" justify="center" bg="blackAlpha.800" h="100vh">
      {album.photos && (
        <Box maxH="calc(100vh - 200px)" boxShadow="xl">
          <Image
            w="100%"
            h="100%"
            objectFit="contain"
            borderRadius={10}
            py={2}
            src={cover}
            alt={album.photos[0].name}
          />
        </Box>
      )}
      <HStack w="100%" h="100%" gap={1} overflowX="auto">
        {photos}
      </HStack>
      {!unlocked && album?.locked && (
        <PasswordModal albumId={albumId} setUnlocked={setUnlocked} />
      )}
    </Flex>
  );
}

interface PasswordModalProps {
  albumId: string;
  setUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
}

function PasswordModal({ albumId, setUnlocked }: PasswordModalProps) {
  const { album } = useAlbum();
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleModalClose = async () => {
    setLoader(true);
    try {
      if (album.locked) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await checkAlbumPassword(albumId, password).then((data: any) => {
          console.log(data);
          if (data.success) {
            setUnlocked(true);
            setLoader(false);
            return data;
          }
          setUnlocked(false);
          setError(true);
          setLoader(false);
          return data;
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleModalClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  console.log(error);

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen
      onClose={handleModalClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent w="95%">
        <ModalHeader>Share</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={2}>
          <Flex flexDir="column" gap={2}>
            <FormControl isInvalid={error}>
              {album?.locked && (
                <Input
                  type="password"
                  name="password"
                  aria-label="album password"
                  placeholder="Album Password"
                  onChange={(e) => handleChange(e)}
                  isDisabled={loader}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              )}
              {!error ? (
                <FormHelperText>Enter Album Password</FormHelperText>
              ) : (
                <FormErrorMessage>Incorrect Password</FormErrorMessage>
              )}
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={loader}
            colorScheme="green"
            mr={3}
            onClick={handleModalClose}
          >
            {loader ? <Spinner /> : 'View Album'}
          </Button>
          <Button
            isDisabled={loader}
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ClientView;
