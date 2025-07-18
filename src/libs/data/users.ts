// src/libs/data/users.ts

// This is a placeholder for your real database client in the future
// import { db } from '@/libs/database';

// --- MOCK DATA ---
// This is now the single source of truth for your mock user data.
export const mockUser = {
  id: 1,
  name: 'test user (from mock data)',
};

// --- DATA FETCHING FUNCTION ---
export async function getUser() {
  if (process.env.NODE_ENV === 'development') {
    // In development, return the mock data
    console.log('Fetching user data: using MOCK.');
    return mockUser;
  }

  // In production, you would fetch from your real database.
  console.log('Fetching user data: using REAL database.');
  // const realUser = await db.user.findUnique({ where: { id: 1 } });
  // if (!realUser) {
  //   throw new Error('User not found');
  // }
  // return realUser;

  // For now, we'll just return a placeholder for the real thing
  // In a real app, you'd likely throw an error if the user isn't found.
  return {
    id: 1,
    name: 'Real User From DB',
  };
}