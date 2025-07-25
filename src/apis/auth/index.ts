import axios from '@/libs/axios/axios';
import { ENDPOINT } from '@/apis/endpoints';
import { LoginRequestBody } from '@/types/auth';

export const login = async ({ username, password }: LoginRequestBody) => {
  const { data } = await axios.post(ENDPOINT.login, { username, password });
  return data;
};
