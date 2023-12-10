/* eslint-disable no-underscore-dangle */
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FaCopy } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Switch,
  Text,
  useClipboard,
  useToast,
} from '@chakra-ui/react';

import { Album } from '../../utils/interfaces';
import { useAlbums } from '../contexts/albumContext';
import { useUser } from '../contexts/userContext';

import { listAlbums, updateAlbum } from './api-albums';

interface ShareModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  albumId: string | undefined;
  albumName: string | undefined;
  albumData: Album;
}

function ShareModal({
  isOpen,
  onClose,
  albumId,
  albumName,
  albumData,
}: ShareModalProps) {
  const [loader, setLoader] = useState<boolean>(false);
  const { setAlbums } = useAlbums();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    locked: albumData?.locked,
    password: '',
  });
  const toast = useToast();
  const { onCopy, hasCopied } = useClipboard(
    `https://shuttersync.live/albums?id=${albumId}`
  );

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

  const handleShareAlbum = useCallback(async () => {
    setLoader(true);
    try {
      if (values.locked && values.password === '') {
        toast({
          title: 'Password Required',
          description: 'Please enter a password to lock this album',
          status: 'error',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setLoader(false);
        return;
      }
      await updateAlbum(
        { password: values.password, locked: values.locked } as Album,
        albumId as string,
        user._id as string
      ).then((data) => {
        if (data.error) {
          // eslint-disable-next-line no-console
          console.log(data.error);
          setLoader(false);
        } else {
          toast({
            title: data?.locked ? 'Album Locked' : 'Album Unlocked',
            status: 'success',
            position: 'top',
            duration: 1500,
            isClosable: true,
            onCloseComplete() {
              fetchAlbums(user?._id);
              setLoader(false);
              onClose(false);
              navigate(`/dashboard`);
            },
          });
        }
      });
    } catch (e) {
      setLoader(false);
    }
  }, [
    albumId,
    fetchAlbums,
    navigate,
    onClose,
    toast,
    user._id,
    values.locked,
    values.password,
  ]);

  const handleShareValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]:
        e.target.name === 'locked' ? e.target.checked : e.target.value,
    });
  };

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: 'Copied',
        status: 'success',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    }
  }, [hasCopied, toast]);

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={() => onClose(false)}
      isCentered
    >
      <ModalOverlay />
      <ModalContent w="95%">
        <ModalHeader>Share {albumName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={2}>
          <Flex flexDir="column" gap={2}>
            <FormControl display="flex" gap="3px">
              <FormLabel fontSize="lg">Lock Album</FormLabel>
              <Switch
                isChecked={values?.locked}
                onChange={(e) => handleShareValues(e)}
                size="lg"
                name="locked"
                isDisabled={loader}
              />
            </FormControl>
            {values.locked && (
              <Input
                type="password"
                name="password"
                aria-label="album password"
                placeholder="Album Password"
                onChange={(e) => handleShareValues(e)}
                isDisabled={loader}
              />
            )}
            <Flex
              align="center"
              justify="center"
              bg="gray.100"
              px={3}
              py={1.5}
              rounded="lg"
            >
              <Text fontWeight="bold" width="100%">
                {`https://shuttersync.live/albums?id=${albumId}`}
              </Text>
              <IconButton
                size="lg"
                aria-label="copy share link"
                icon={<FaCopy />}
                onClick={onCopy}
              />
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={loader}
            colorScheme="green"
            mr={3}
            onClick={handleShareAlbum}
          >
            {loader ? <Spinner /> : 'Share'}
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

export default ShareModal;
