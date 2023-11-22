import { SimpleGrid } from '@chakra-ui/react';

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
    <SimpleGrid
      minChildWidth={{ base: '170px', md: '250px', lg: '260px' }}
      spacing={{ base: 6, lg: 10 }}
      px={{ base: 0, lg: 16 }}
      py={4}
    >
      {albumComponents}
    </SimpleGrid>
  );
}
