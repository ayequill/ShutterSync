import { useState } from 'react';
import { FaEllipsis } from 'react-icons/fa6';

import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { Album } from '../../utils/interfaces';

import DeleteModal from './AlbumDeleteModal';
import QuickEditModal from './AlbumQuickEditModal';
import ShareModal from './AlbumShareModal';

interface AlbumOptionsProps {
  handleClick: () => void;
  albumId: string | undefined;
  albumName: string;
  albumData: Album;
}

function AlbumOptions({
  handleClick,
  albumId,
  albumName,
  albumData,
}: AlbumOptionsProps) {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showQuickEdit, setShowQuickEdit] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);

  return (
    <>
      <Menu>
        <MenuButton as={Button} bg="none">
          <FaEllipsis />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleClick}>View Album</MenuItem>
          <MenuItem onClick={() => setShowShare(true)}>Share Album</MenuItem>
          <MenuItem onClick={() => setShowQuickEdit(true)}>Edit Album</MenuItem>
          <MenuItem onClick={() => setShowDelete(true)}>Delete Album</MenuItem>
        </MenuList>
      </Menu>
      <DeleteModal
        isOpen={showDelete}
        onClose={setShowDelete}
        albumId={albumId}
      />
      <QuickEditModal
        isOpen={showQuickEdit}
        onClose={setShowQuickEdit}
        albumID={albumId}
        albumName={albumName}
      />
      <ShareModal
        isOpen={showShare}
        onClose={setShowShare}
        albumId={albumId}
        albumName={albumName}
        albumData={albumData}
      />
    </>
  );
}

export default AlbumOptions;
