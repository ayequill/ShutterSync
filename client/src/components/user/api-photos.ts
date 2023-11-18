/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

import { isAuthenticated } from '../auth/auth-helper';

const KEY = import.meta.env.VITE_KEY as string;

interface Album {
  name: string;
}
const { user } = isAuthenticated();

const axiosInstance = axios.create({
  // eslint-disable-next-line no-underscore-dangle
  baseURL: `https://api.shuttersync.live/api/users/${user?._id}/albums`,
  // timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': KEY,
  },
});

const addPhotos = async (albumId: string, photos: File[]) => {
  try {
    const formData = new FormData();
    // formData.append('name', albumId.name);
    photos.forEach((photo) => {
      formData.append('photos', photo);
    });
    const response = await axiosInstance.post(`/${albumId}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

// const deletePhotos = async (albumId: string, photos: string[]) => {

// eslint-disable-next-line import/prefer-default-export
export { addPhotos };
