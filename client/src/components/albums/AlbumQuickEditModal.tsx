/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast,
} from '@chakra-ui/react';

import { useAlbums } from '../contexts/albumContext';
import { useUser } from '../contexts/userContext';

import { listAlbums, updateAlbumName } from './api-albums';

interface QuickEditModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  albumID: string | undefined;
  albumName: string;
}
function QuickEditModal({
  isOpen,
  onClose,
  albumID,
  albumName,
}: QuickEditModalProps) {
  const [loader, setLoader] = useState<boolean>(false);
  const [newAlbumName, setNewAlbumName] = useState<string>('');
  const toast = useToast();
  const { user } = useUser();
  const { setAlbums } = useAlbums();

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

  const handleAlbumNameChange = (e: any) => {
    setNewAlbumName(e.target.value);
  };

  const handleQuickEdit = useCallback(async () => {
    setLoader(true);
    try {
      if (user) {
        await updateAlbumName(albumID, user._id, { name: newAlbumName }).then(
          (data) => {
            if (data.message) {
              fetchAlbums(user._id);
              setLoader(false);
              toast({
                title: 'Album Updated',
                status: 'success',
                duration: 1000,
                isClosable: true,
                onCloseComplete() {
                  onClose(false);
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
          }
        );
      }
    } catch (e) {
      setLoader(false);
    }
  }, [albumID, fetchAlbums, newAlbumName, onClose, toast, user]);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)}>
      <ModalOverlay />
      <ModalContent width="95%">
        <ModalHeader>Quick Edit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Album Name</FormLabel>
            <Input
              value={newAlbumName}
              placeholder={albumName}
              onChange={handleAlbumNameChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={loader}
            onClick={handleQuickEdit}
            colorScheme="blue"
            mr={3}
          >
            {loader ? <Spinner /> : 'Save'}
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

export default QuickEditModal;
