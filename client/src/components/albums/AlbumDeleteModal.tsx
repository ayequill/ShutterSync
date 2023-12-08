/* eslint-disable no-underscore-dangle */
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
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

import { useAlbums } from '../contexts/albumContext';
import { useUser } from '../contexts/userContext';

import { deleteAlbum, listAlbums } from './api-albums';

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
      isCentered
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
            variant="outline"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteModal;
