import { Flex } from '@chakra-ui/react';

import { Album } from '../../utils/interfaces';
import { useAlbums } from '../contexts/albumContext';

import AlbumThumbnails from './AlbumThumbnails';

export default function Collections() {
  const { albums } = useAlbums();
  const albumComponents = albums.map((album: Album) => (
    // eslint-disable-next-line no-underscore-dangle
    <AlbumThumbnails key={album._id} album={album} />
  ));
  return (
    <Flex
      gap={6}
      justifyContent="center"
      alignContent="center"
      flexWrap="wrap"
      border={{ base: 'none', lg: '1px solid #e2e8f0' }}
      _dark={{ border: '1px solid #222936' }}
      borderRadius={10}
      px={{ base: 0, lg: 16 }}
      py={4}
    >
      {albumComponents}
    </Flex>
  );
}
