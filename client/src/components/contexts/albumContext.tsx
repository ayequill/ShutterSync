import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Album } from '../../utils/interfaces';

interface AlbumsContextProps {
  albums: Album[];
  setAlbums: Dispatch<SetStateAction<Album[]>>;
}

const AlbumsContext = createContext<AlbumsContextProps | undefined>(undefined);

interface AlbumProviderProps {
  children: ReactNode;
}

export function AlbumsProvider({ children }: AlbumProviderProps) {
  const [albums, setAlbums] = useState<Album[]>([]);

  const contextValue = useMemo(
    () => ({ albums, setAlbums }),
    [albums, setAlbums]
  );

  return (
    <AlbumsContext.Provider value={contextValue}>
      {children}
    </AlbumsContext.Provider>
  );
}

export const useAlbums = () => {
  const context = useContext(AlbumsContext);
  if (context === undefined) {
    throw new Error('useAlbums must be used within a AlbumProvider');
  }
  return context;
};

interface AlbumContextProps {
  album: Album;
  setAlbum: Dispatch<SetStateAction<Album>>;
}

const AlbumContext = createContext<AlbumContextProps | undefined>(undefined);

export function AlbumProvider({ children }: AlbumProviderProps) {
  const [album, setAlbum] = useState<Album>({} as Album);

  const contextValue = useMemo(() => ({ album, setAlbum }), [album, setAlbum]);

  return (
    <AlbumContext.Provider value={contextValue}>
      {children}
    </AlbumContext.Provider>
  );
}

export const useAlbum = () => {
  const context = useContext(AlbumContext);
  if (context === undefined) {
    throw new Error('useAlbum must be used within a AlbumProvider');
  }
  return context;
};
