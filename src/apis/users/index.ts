import axios from '@/libs/axios/axios';

export type User = {
  id: string;
  name: string;
};

export async function getUserInfo(): Promise<User> {
  const { data } = await axios.get('/api/user');
  return data;
}

export async function getUser(id: string) {
  // In a real app, you would fetch the user from the database here.
  // const realUser = await db.user.findUnique({ where: { id } });
  // if (!realUser) {
  //   throw new Error('User not found');
  // }
  // return realUser;

  // For now, we'll just return a placeholder for the real thing
  return {
    id,
    name: 'Real User From DB',
  };
}