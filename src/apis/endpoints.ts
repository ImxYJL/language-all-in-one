export const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export const ENDPOINT = {
  login: `${BASE_URL}/login`,
  getUserProfile: `${BASE_URL}/user/me/profile`,
};
