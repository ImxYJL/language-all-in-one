import axios from '@/libs/axios/axios';
import { ENDPOINT } from '@/apis/endpoints';
import { AppWordBundle } from '@/types/word';

export const getRandomWordApi = async () => {
  const { data } = await axios.get<AppWordBundle>(ENDPOINT.getRandomWord);
  return data;
};
