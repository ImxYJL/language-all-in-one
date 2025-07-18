import axios from 'axios';

const isServer = typeof window === 'undefined';

const axiosInstance = axios.create({
  baseURL: isServer ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
