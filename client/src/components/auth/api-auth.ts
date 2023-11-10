// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/auth',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const signin = async (user: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/signin', user, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return e;
  }
};

const signout = async () => {
  try {
    const response = await axiosInstance.get('/signout');
    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return e;
  }
};

export { signin, signout };
