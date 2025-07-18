export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : process.env.NEXT_PUBLIC_API_BASE_URL + '/api';

export const ENDPOINT = {
  gettingUserProfile: `${BASE_URL}/api/user/me/profile`,
  gettingOpenedCapsules: ({
    size,
    lastCapsuleId,
  }: {
    size: number;
    lastCapsuleId: number | null;
  }) => {
    const baseUrl = `${BASE_URL}/api/capsules/opened?size=${size}`;

    if (!lastCapsuleId) return baseUrl;
    return baseUrl + '&' + `lastCapsuleId=${lastCapsuleId}`;
  },
};
