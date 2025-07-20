import axios from '@/libs/axios/axios';
import { ENDPOINT } from '@/apis/endpoints';

export const login = async (id: string) => {
  const { data } = await axios.post(ENDPOINT.login, { id });
  return data;
};
