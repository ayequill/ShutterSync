// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosHeaders } from 'axios';

import { User } from '../../utils/interfaces';

const KEY = import.meta.env.VITE_KEY as string;
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,

  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': KEY,
  },
});

const create = async (user: User) => {
  try {
    const response = await axiosInstance.post('/users', user);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

const list = async (signal: AbortSignal) => {
  try {
    const response = await axiosInstance.get('/users', {
      signal,
    });
    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return e;
  }
};

const read = async (
  userId: string,
  credentials: {
    t: AxiosHeaders | string;
  },
  signal: AbortSignal
) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${credentials.t}`,
      },
      signal,
    });
    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return e;
  }
};

const update = async (
  userId: string | undefined,
  token: string,
  user: unknown
) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return e;
  }
};

const deleteUser = async (
  params: { userId: string },
  credentials: { t: string }
) => {
  try {
    const response = await axiosInstance.delete(`/users/${params.userId}`, {
      headers: {
        Authorization: `Bearer ${credentials.t}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return e;
  }
};

export { create, deleteUser, list, read, update };
