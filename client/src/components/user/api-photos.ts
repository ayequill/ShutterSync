/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const KEY = import.meta.env.VITE_KEY as string;

const axiosInstance = axios.create({
  // eslint-disable-next-line no-underscore-dangle
  baseURL: `https://api.shuttersync.live/api/users`,
  // timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': KEY,
  },
});

const addPhotos = async (albumId: string, userId: string, photos: File[]) => {
  try {
    const formData = new FormData();
    // formData.append('name', albumId.name);
    photos.forEach((photo) => {
      formData.append('photos', photo);
    });
    const response = await axiosInstance.post(
      `/${userId}/albums/${albumId}/photo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
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

const photoInstance = axios.create({
  baseURL: `https://shuttersync.live/api/photos/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': KEY,
  },
});

const deletePhoto = async (photoId: string | undefined) => {
  try {
    const response = await photoInstance.delete(`${photoId}`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

// eslint-disable-next-line import/prefer-default-export
export { addPhotos, deletePhoto };
