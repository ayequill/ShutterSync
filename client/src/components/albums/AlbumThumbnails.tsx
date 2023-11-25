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
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Album, Photo } from '../../utils/interfaces';
import { isAuthenticated } from '../auth/auth-helper';
import { useAlbum, useAlbums } from '../contexts/albumContext';
import { useUser } from '../contexts/userContext';

import { deleteAlbum, listAlbums } from './api-albums';

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
  const { setAlbums } = useAlbums();
  const navigate = useNavigate();
  const toast = useToast();

  const { user } = useUser();

  const fetchAlbums = useCallback(
    async (id: string | undefined) => {
      await listAlbums(id).then((albums) => {
        if (albums.error) {
          // eslint-disable-next-line no-console
          console.log(albums.error);
        } else {
          setAlbums(albums);
        }
      });
    },
    [setAlbums]
  );

  const handleDeleteAlbum = useCallback(async () => {
    setLoader(true);
    try {
      if (user) {
        await deleteAlbum(albumId, user._id).then((data) => {
          if (data.message) {
            fetchAlbums(user._id);
            setLoader(false);

            onClose(false);
            toast({
              title: 'Album Deleted',
              status: 'success',
              duration: 1000,
              isClosable: true,
              onCloseComplete() {
                navigate('/dashboard');
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
  }, [albumId, fetchAlbums, navigate, onClose, toast, user]);

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={() => onClose(false)}
    >
      <ModalOverlay />
      <ModalContent w="95%">
        <ModalHeader>Delete Album</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            Are you sure you want to delete this album?
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
