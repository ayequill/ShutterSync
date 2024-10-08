// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const KEY = import.meta.env.VITE_KEY as string;
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': KEY,
  },
});

const signin = async (user: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/signin', user, {
      withCredentials: true,
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

const signout = async () => {
  try {
    const response = await axiosInstance.get('/signout');
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

const checkEmail = async (token: string | undefined) => {
  try {
    const res = await axiosInstance.get('/verify', { params: { token } });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

const resetPassword = async (user: {
  email: string;
  password: string;
  newPassword: string;
}) => {
  try {
    const response = await axiosInstance.put('/reset', user);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

const resetPasswordRequest = async (email: string) => {
  try {
    const response = await axiosInstance.post('/reset', { email });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response) {
      return { error: e.response.data.error } as { error: string };
    }
    return { error: 'Please try again later' } as { error: string };
  }
};

export { checkEmail, resetPassword, resetPasswordRequest, signin, signout };
