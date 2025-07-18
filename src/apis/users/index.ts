import axios from '@/libs/axios/axios';

export type User = {
  id: string;
  name: string;
};

export async function getUserInfo(): Promise<User> {
  const { data } = await axios.get('/api/user');
  return data;
}
