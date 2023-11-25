/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { motion } from 'framer-motion';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
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
} from '@chakra-ui/react';

import { Photo } from '../../utils/interfaces';
import { isAuthenticated } from '../auth/auth-helper';
import { useAlbum } from '../contexts/albumContext';
import { useUser } from '../contexts/userContext';
import LoaderComponent from '../core/Loader';
import { deletePhoto } from '../user/api-photos';

import { getAlbum } from './api-albums';

export default function Album() {
  const { album, setAlbum } = useAlbum();
  const { albumId } = useParams<string>();
  const { user } = isAuthenticated();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [hasDelete, setHasDelete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchAlbum = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (id: string | any) => {
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
    },
    [albumId, setAlbum, user._id]
  );

  const handleMobileTap = useCallback(() => {
    setShowOverlay(!showOverlay);
  }, [showOverlay]);

  useEffect(() => {
    fetchAlbum(albumId);
  }, [hasDelete]);

  if (isLoading) return <LoaderComponent />;

  const photos: Photo[] = album?.photos ? album.photos : [];
  console.log(photos);
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
            <Box
              pos="relative"
              onClick={handleMobileTap}
              _hover={{ '.overlay': { opacity: 1 } }}
              // cursor="pointer"
            >
              <Image
                maxW={{ base: '150px', md: '200px', lg: '350px' }}
                borderRadius="md"
                src={photo.imageUrl}
                alt={photo.name}
              />
              <Flex
                align="end"
                justify="space-between"
                flexDir="column"
                position="absolute"
                // display={{ base: 'none', md: 'flex' }}
                top={0}
                left={0}
                right={0}
                bottom={3}
                className="overlay"
                display={{ base: showOverlay ? 'flex' : 'none', md: 'flex' }}
                // bg="rgba(0, 0, 0, 0.2)"
                color="white"
                opacity={0}
                borderRadius="md"
              >
                <Box mr={2}>
                  <IconButton
                    icon={<FaTimes />}
                    variant="unstyled"
                    aria-label="Delete photo"
                    colorScheme="red"
                    size="0.8rem"
                    mr={1}
                    mt={2}
                    cursor={photos.length > 0 ? 'pointer' : 'default'}
                    backdropFilter="blur(10px)"
                    onClick={() => setOpenModal(true)}
                  />
                </Box>
                <Flex>
                  {/* <Icon
                    backdropFilter="blur(10px)"
                    cursor="pointer"
                    as={FaHeart}
                    boxSize={6}
                    mr={2}
                    borderRadius={10}
                  /> */}
                  <IconButton
                    backdropFilter="blur(10px)"
                    // cursor="pointer"
                    href={photo.storageUrl}
                    download={photo.name}
                    target="_blank"
                    aria-label="Download photo"
                    as="a"
                    icon={<FaDownload />}
                    size="0.8rem"
                    variant="unstyled"
                    mr={2}
                  />
                </Flex>
                {/* <Icon as={AiOutlineDownload} boxSize={6} ml={2} /> */}
              </Flex>
            </Box>
            {openModal && (
              <DeleteModal
                isOpen={openModal}
                onClose={setOpenModal}
                photoId={photo._id}
                albumId={albumId}
                hasDelete={setHasDelete}
              />
            )}
          </motion.div>
        ))}
      </Flex>
    </Box>
  );
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  photoId: string | undefined;
  albumId: string | undefined;
  hasDelete: Dispatch<SetStateAction<boolean>>;
}

function DeleteModal({
  isOpen,
  onClose,
  photoId,
  albumId,
  hasDelete,
}: DeleteModalProps) {
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  const { user } = useUser();

  const handleDeletePhoto = useCallback(async () => {
    setLoader(true);
    try {
      if (user) {
        await deletePhoto(photoId).then((data) => {
          if (data.message) {
            hasDelete(true);
            setLoader(false);
            onClose(false);
            toast({
              title: 'Photo Deleted',
              status: 'success',
              duration: 1000,
              isClosable: true,
              onCloseComplete() {
                navigate(`/dashboard/album/${albumId}`);
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
  }, [photoId, navigate, onClose, toast, user]);

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={() => onClose(false)}
    >
      <ModalOverlay />
      <ModalContent w="95%">
        <ModalHeader>Delete Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            Are you sure you want to delete this photo?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={loader}
            colorScheme="red"
            mr={3}
            onClick={handleDeletePhoto}
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
