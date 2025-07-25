import axios from 'axios';
const isServer = typeof window === 'undefined';

const axiosInstance = axios.create({
  baseURL: isServer ? process.env.NEXT_SERVER_API_ORIGIN : process.env.NEXT_PUBLIC_CLIENT_API_ORIGIN,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn(`Unauthorized: ${error.response.data.message}`);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
