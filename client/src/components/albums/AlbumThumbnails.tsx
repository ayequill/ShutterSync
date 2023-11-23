/* eslint-disable no-underscore-dangle */
import { motion } from 'framer-motion';
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Album, Photo } from '../../utils/interfaces';
import { isAuthenticated } from '../auth/auth-helper';
import { useAlbum } from '../contexts/albumContext';
import { useUser } from '../contexts/userContext';

import { deleteAlbum } from './api-albums';

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
    navigate(`/dashboard/album/${album._id}`);
  };

  /* Setting album cover by using the first pic. Will update later */
  useEffect(() => {
    if (album && album.photos && album?.photos?.length > 0) {
      setCover(album?.photos[0]);
    }
    if (isAuthenticated()) setUser(isAuthenticated()?.user);
  }, [album, album.photos, setUser]);

  const datePublished = album?.created_at
    ? new Date(album.created_at).toLocaleDateString()
    : '';
  const photos = album?.photos ? album.photos : [];

  return (
    <Flex
      justify="center"
      align="center"
      maxW={400}
      flex={{ base: '1 0 100%', md: '1 0 50%', lg: '1 0 25.33%' }}
      // w="100%"
    >
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
              gridTemplateColumns={photos.length > 0 ? '1fr .5fr' : '1fr'}
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
              <AlbumOptions
                handleClick={handleAlbumClick}
                albumId={album._id}
              />
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

interface AlbumOptionsProps {
  handleClick: () => void;
  albumId: string | undefined;
}

function AlbumOptions({ handleClick, albumId }: AlbumOptionsProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Menu>
        <MenuButton as={Button} bg="none">
          <FaEllipsis />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleClick}>View Album</MenuItem>
          <MenuItem>Share Album</MenuItem>
          <MenuItem>Edit Album</MenuItem>
          <MenuItem onClick={() => setOpenModal(true)}>Delete Album</MenuItem>
        </MenuList>
      </Menu>
      <DeleteModal
        isOpen={openModal}
        onClose={setOpenModal}
        albumId={albumId}
      />
    </>
  );
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  albumId: string | undefined;
}

function DeleteModal({ isOpen, onClose, albumId }: DeleteModalProps) {
  const [loader, setLoader] = useState<boolean>(false);
  const toast = useToast();

  const { user } = useUser();

  const handleDeleteAlbum = useCallback(async () => {
    setLoader(true);
    try {
      if (user) {
        await deleteAlbum(albumId, user._id).then((data) => {
          if (data.message) {
            setLoader(false);
            toast({
              title: 'Album Deleted',
              status: 'success',
              duration: 500,
              isClosable: true,
              onCloseComplete() {
                onClose(false);
                window.location.reload();
              },
            });
          } else {
            setLoader(false);
            toast({
              title: 'Error Occurred',
              status: 'error',
              duration: 1000,
              isClosable: true,
              onCloseComplete() {
                onClose(false);
                window.location.reload();
              },
            });
          }
        });
      }
    } catch (e) {
      setLoader(false);
    }
  }, [albumId, onClose, toast, user]);

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={() => onClose(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Album</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            Are you sure you want to delete
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={loader}
            colorScheme="red"
            mr={3}
            onClick={handleDeleteAlbum}
          >
            {loader ? <Spinner /> : 'Delete'}
          </Button>
          <Button
            isDisabled={loader}
            variant="ghost"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AlbumThumbnails;
