// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosHeaders } from 'axios';

import { User } from '../../utils/interfaces';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const create = async (user: User) => {
  try {
    const response = await axiosInstance.post('/users', user);
    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return e;
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
  params: { userId: string },
  credentials: {
    t: AxiosHeaders | string;
  },
  signal: AbortSignal
) => {
  try {
    const response = await axiosInstance.get(`/users/${params.userId}`, {
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
  params: { userId: string },
  credentials: { t: string },
  user: User
) => {
  try {
    const response = await axiosInstance.put(`/users/${params.userId}`, user, {
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
