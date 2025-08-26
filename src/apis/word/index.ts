import axios from '@/libs/axios/axios';
import { ENDPOINT } from '@/apis/endpoints';
import { AppWordBundle } from '@/types/word';
import { isServer, withServerAuthHeaders } from '@/libs/axios/serverAuth';

export async function getRandomWordApi() {
  const headers = isServer() ? await withServerAuthHeaders() : undefined;
  const { data } = await axios.get<AppWordBundle>(ENDPOINT.getRandomWord, { headers });

  return data;
}
