/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosHeaders } from 'axios';

import { isAuthenticated } from '../auth/auth-helper';

const KEY = import.meta.env.VITE_KEY as string;

interface Album {
  name: string;
}
const { user } = isAuthenticated();

const axiosInstance = axios.create({
  // eslint-disable-next-line no-underscore-dangle
  baseURL: `https://api.shuttersync.live/api/users/${user?._id}`,
  // timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': KEY,
  },
});

const createAlbum = async (album: Album) => {
  try {
    const response = await axiosInstance.post('/albums', album);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // eslint-disable-next-line no-console
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

const listAlbums = async () => {
  try {
    const response = await axiosInstance.get('/albums');
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

const getAlbum = async (albumId: string) => {
  try {
    const response = await axiosInstance.get(`/albums/${albumId}`);
    return response.data;
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

const updateAlbum = async (albumId: string, album: Album) => {
  try {
    const response = await axiosInstance.put(`/albums/${albumId}`, album);
    return response.data;
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

const deleteAlbum = async (albumId: string) => {
  try {
    const response = await axiosInstance.delete(`/albums/${albumId}`);
    return response.data;
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

export { createAlbum, deleteAlbum, getAlbum, listAlbums, updateAlbum };
